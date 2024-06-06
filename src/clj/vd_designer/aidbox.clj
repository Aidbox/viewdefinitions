(ns vd-designer.aidbox
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [jsonista.core :as json]
            [lambdaisland.uri :as uri]
            [vd-designer.utils.debug :refer [?]]
            [martian.core :as martian]
            [org.httpkit.client :as http-client]
            [ring.util.http-predicates :as predicates]
            [ring.util.http-response :as http-response]
            [vd-designer.clients.portal :as portal]
            [vd-designer.repository.sso-token :as sso-token]
            [vd-designer.repository.user-server :as user-server]
            [vd-designer.web.middleware.auth :as auth-middleware]))

(defn init-project [client access-token]
  (portal/rpc:init-project client access-token))

(defn fetch-licenses [client access-token project-id]
  (portal/rpc:fetch-licenses client access-token project-id))

(defn truncate-box-url [box-url]
  (some-> box-url
          (uri/uri)
          (assoc :path "")
          uri/uri-str
          (str/split #"\?")
          first))

(defn aidbox-auth-token [box-url]
  (->> box-url
       (uri/uri)
       (uri/query-map)
       :token))

;; TODO: rework portal to have a middleware that takes care of access/refresh tokens
(defn list-user-servers [{:keys [aidbox.portal/client db]} user]
  (let [access-token
        (:sso_tokens/access_token (sso-token/get-last-by-id db (:accounts/id user)))
        projects (-> @(init-project client access-token)
                     :body
                     :result)
        licenses (->> projects
                      (mapcat
                        (fn [project]
                          (-> @(fetch-licenses client access-token (:id project))
                              :body :result)))
                      (filter :box-url)
                      (mapv (fn [license]
                              (-> license
                                  (select-keys [:name :box-url #_:product #_:status])
                                  (assoc :aidbox-auth-token (aidbox-auth-token (:box-url license))
                                         :account-id (:accounts/id user))

                                  (assoc :aidbox-auth-token (aidbox-auth-token (:box-url license))
                                         :account-id (:accounts/id user))
                                  (update :box-url truncate-box-url)
                                  (set/rename-keys {:name :server-name})))))]
    ;; TODO: store in DB full data,
    ;;       send to front only things that are needed
    ;;TODO: creating duplications!
    (user-server/create-many db licenses)
    ;; TODO: filter self-hosted, expired, product = "aidbox", status = "active"
    licenses))

(defn list-servers [{:keys [cfg] :as ctx}]
  (let [user (auth-middleware/jwt->user ctx)]
    (->> (cond->> (cfg :public-fhir-servers)
                  user
                  (concat (list-user-servers ctx user)))
         (map #(select-keys % [:box-url :server-name]))
         (http-response/ok))))

(defn public-fhir-server [public-fhir-servers box-url]
  (some->> public-fhir-servers
           (filter #(-> % :box-url (= box-url)))
           first))

(defn public-server:connect [box-url public-server]
  (let [box-response @(http-client/get
                        (str box-url "/fhir/ViewDefinition")
                        {:headers
                         (merge {"Accept"       "application/json"
                                 "Content-Type" "application/transit+json"}
                                (:headers public-server))})]
    (if (= 200 (:status box-response))
      (http-response/ok (:body box-response))
      (http-response/bad-request box-response))))

(defn user-server:connect [{:keys [db request user]}]
  (let [box-url (-> request :body-params :box-url)

        {aidbox-auth-token :user_servers/aidbox_auth_token}
        (user-server/get-by-account-id-and-box-url db (:accounts/id user) box-url)

        box-response @(http-client/get
                        (str box-url "/fhir/ViewDefinition")
                        {:headers
                         {"Cookie"       (str "aidbox-auth-token=" aidbox-auth-token ";")
                          "Accept"       "application/json"
                          "Content-Type" "application/transit+json"}})]
    (if (= 200 (:status box-response))
      (http-response/ok (:body box-response))
      (http-response/bad-request box-response))))

(defn connect [{:keys [request cfg] :as ctx}]
  (let [box-url (-> request :body-params :box-url)]
    (if-let [public-server (public-fhir-server (cfg :public-fhir-servers) box-url)]
      (public-server:connect box-url public-server)
      (auth-middleware/unauthorized-wo-token #'user-server:connect ctx))))

(defn user-server:get-vd [{:keys [db request user]}]
  (let [{:keys [box-url vd-id]} (-> request :query-params)
        {aidbox-auth-token :user_servers/aidbox_auth_token}
        (user-server/get-by-account-id-and-box-url
          db (:accounts/id user) box-url)
        box-response @(http-client/get
                        (str box-url "/fhir/ViewDefinition/" vd-id)
                        {:headers
                         {"Cookie"       (str "aidbox-auth-token=" aidbox-auth-token ";")
                          "Accept"       "application/json"
                          "Content-Type" "application/transit+json"}})]
    (if (= 200 (:status box-response))
      (http-response/ok (:body box-response))
      (http-response/bad-request box-response))))

(defn public-server:get-vd [{:keys [request]} public-server]
  (let [{:keys [box-url vd-id]} (-> request :query-params)
        box-response @(http-client/get
                        (str box-url "/fhir/ViewDefinition/" vd-id)
                        {:headers
                         (-> {"Accept"       "application/json"
                              "Content-Type" "application/transit+json"}
                             (merge (:headers public-server)))})]
    (if (= 200 (:status box-response))
      (http-response/ok (:body box-response))
      (http-response/bad-request box-response))))

(defn get-view-definition [{:keys [request cfg] :as ctx}]
  (let [public-fhir-servers (cfg :public-fhir-servers)
        {:keys [box-url]} (-> request :query-params)]
    (if-let [public-server (public-fhir-server public-fhir-servers box-url)]
      (public-server:get-vd ctx public-server)
      (auth-middleware/unauthorized-wo-token #'user-server:get-vd ctx))))

(defn eval-view-definition
  [{:keys [user db request]}]
  (let [box-url (-> request :body-params :box-url)
        view-definition (-> request :body-params :view-definition)
        aidbox-client (portal/client box-url)
        {aidbox-auth-token :user_servers/aidbox_auth_token}
        (user-server/get-by-account-id-and-box-url db (:accounts/id user) box-url)
        req {:Cookie (str "aidbox-auth-token=" aidbox-auth-token ";")
             :method 'sof/eval-view
             :params {:limit 100
                      :view  view-definition}}
        resp @(martian/response-for aidbox-client :rpc req)]

    (if (= 200 (:status resp))
      (http-response/ok (:body resp))
      (http-response/bad-request resp))))

(defn save-view-definition
  [{:keys [user db request]}]
  (let [box-url (-> request :body-params :box-url)
        view-definition (-> request :body-params :vd)
        vd-id (-> request :body-params :vd-id)
        {aidbox-auth-token :user_servers/aidbox_auth_token}
        (user-server/get-by-account-id-and-box-url db (:accounts/id user) box-url)
        request-fn (if vd-id http-client/put http-client/post)
        url (if vd-id
              (str box-url "/fhir/ViewDefinition/" vd-id)
              (str box-url "/fhir/ViewDefinition"))
        resp @(request-fn
                url
                {:headers
                 {"Cookie"       (str "aidbox-auth-token=" aidbox-auth-token ";")
                  "Accept"       "application/json"
                  "Content-Type" "application/json"}
                 :body (json/write-value-as-string view-definition)})]
    (if (predicates/success? resp)
      (http-response/ok (:body resp))
      (http-response/bad-request resp))))


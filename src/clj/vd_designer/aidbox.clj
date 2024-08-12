(ns vd-designer.aidbox
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [jsonista.core :as json]
            [lambdaisland.uri :as uri]
            [martian.core :as martian]
            [org.httpkit.client :as http-client]
            [ring.util.http-predicates :as predicates]
            [ring.util.http-response :as http-response]
            [vd-designer.clients.portal :as portal]
            [vd-designer.repository.sso-token :as sso-token]
            [vd-designer.repository.user-server :as user-server]
            [vd-designer.web.middleware.auth :as auth-middleware]))

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
(defn list-user-servers [{:keys [aidbox.portal/client db cfg]} user]
  (let [access-token
        (:sso_tokens/access_token (sso-token/get-last-by-id db (:accounts/id user)))
        projects (-> @(portal/rpc:init-project client access-token)
                     :body
                     :result)
        licenses (->> projects
                      (mapcat
                        (fn [project]
                          (->> @(portal/rpc:fetch-licenses client access-token (:id project))
                               :body :result
                               (map (fn [license]
                                      (update license
                                              :project merge
                                              {:name       (:name project)
                                               :new-license-url
                                               (format "%s/ui/portal#/project/%s/license/new"
                                                       (:aidbox.portal/url cfg)
                                                       (:id project))}))))))
                      (filter (fn [license]
                                (and (:box-url license)
                                     (= "aidbox" (:product license))
                                     (= "active" (:status license))
                                     (:expiration-days license)
                                     (> (:expiration-days license) 0))))
                      (mapv (fn [license]
                              (-> license
                                  (select-keys [:name :box-url :project])
                                  (assoc :aidbox-auth-token (aidbox-auth-token (:box-url license))
                                         :account-id (:accounts/id user))
                                  (update :box-url truncate-box-url)
                                  (set/rename-keys {:name :server-name})))))]
    ;; TODO: store in DB full data,
    ;;       send to front only things that are needed
    (when-not (empty? licenses)
      (->> licenses
           (map #(select-keys % [:box-url :account-id :server-name :aidbox-auth-token]))
           (user-server/create-many db)))

    licenses))

(defn list-servers [{:keys [cfg] :as ctx}]
  (let [user (auth-middleware/jwt->user ctx)]
    (->> (cond->> (cfg :public-fhir-servers)
                  user
                  (concat (list-user-servers ctx user)))
         (map #(select-keys % [:box-url :server-name :project]))
         (http-response/ok))))

(defn public-fhir-server [public-fhir-servers box-url]
  (some->> public-fhir-servers
           (filter #(-> % :box-url (= box-url)))
           first))

(defn hack-view-definitions-json-meta [json-view-definitions]
  (let [body (json/read-value (:body json-view-definitions) json/keyword-keys-object-mapper)
        hacked-entry
        (update body :entry
                (fn [entry]
                  (mapv
                    (fn [view-definition] (if (-> view-definition :resource :meta :createdAt)
                                            (update-in view-definition [:resource :meta] dissoc :createdAt)
                                            view-definition))
                    entry)))]
    (json/write-value-as-string hacked-entry)))

(defn hack-view-definition-json-meta [json-view-definitions]
  (let [body (json/read-value (:body json-view-definitions) json/keyword-keys-object-mapper)
        body (if (-> body :meta :createdAt)
               (update-in body [:meta] dissoc :createdAt)
               body)]
    (json/write-value-as-string body)))

(defn public-server:connect [box-url public-server]
  (let [box-response @(http-client/get
                        (str box-url "/fhir/ViewDefinition")
                        {:headers
                         (merge {"Accept"       "application/json"
                                 "Content-Type" "application/transit+json"}
                                (:headers public-server))})]
    (if (predicates/success? box-response)
      {:status 200
       :body (hack-view-definitions-json-meta box-response)
       :headers {"Content-Type" "application/json"}}
      (http-response/bad-request (:body box-response)))))

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
    (if (predicates/success? box-response)
      {:status 200
       :body (:body box-response)
       :headers {"Content-Type" "application/json"}}
      (http-response/bad-request (:body box-response)))))

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
    (if (predicates/success? box-response)
      {:status 200
       :body (hack-view-definition-json-meta box-response)
       :headers {"Content-Type" "application/json"}}
      (http-response/bad-request (:body box-response)))))

(defn public-server:get-vd [{:keys [request]} public-server]
  (let [{:keys [box-url vd-id]} (-> request :query-params)
        box-response @(http-client/get
                        (str box-url "/fhir/ViewDefinition/" vd-id)
                        {:headers
                         (-> {"Accept"       "application/json"
                              "Content-Type" "application/transit+json"}
                             (merge (:headers public-server)))})]
    (if (predicates/success? box-response)
      {:status 200
       :body (hack-view-definition-json-meta box-response)
       :headers {"Content-Type" "application/json"}}
      (http-response/bad-request (:body box-response)))))

(defn get-view-definition [{:keys [request cfg] :as ctx}]
  (let [public-fhir-servers (cfg :public-fhir-servers)
        {:keys [box-url]} (-> request :query-params)]
    (if-let [public-server (public-fhir-server public-fhir-servers box-url)]
      (public-server:get-vd ctx public-server)
      (auth-middleware/unauthorized-wo-token #'user-server:get-vd ctx))))

(defn eval-vd-user-server [{:keys [user db request]}]
  (let [box-url (-> request :body-params :box-url)
        view-definition (-> request :body-params :vd)
        aidbox-client (portal/client box-url)
        {aidbox-auth-token :user_servers/aidbox_auth_token}
        (user-server/get-by-account-id-and-box-url db (:accounts/id user) box-url)
        req {:Cookie (str "aidbox-auth-token=" aidbox-auth-token ";")
             :method 'sof/eval-view
             :params {:limit 100
                      :view  view-definition}}
        resp @(martian/response-for aidbox-client :rpc req)]
    (if (predicates/success? resp)
      {:status 200
       :body (:body resp)
       ;; 500 if json header
       :headers {}}
      (http-response/bad-request (:body resp)))))

(defn eval-vd-public-server
  [request public-server]
  (let [box-url (-> request :body-params :box-url)
        aidbox-client (portal/client box-url)
        view-definition (-> request :body-params :vd)
        req {:authorization (-> public-server :headers (get "Authorization"))
             :method        'sof/eval-view
             :params        {:limit 100
                             :view  view-definition}}
        resp @(martian/response-for aidbox-client :rpc req)]
    (if (predicates/success? resp)
      {:status 200
       :body (:body resp)
       ;; 500 if json header
       :headers {}}
      (http-response/bad-request (:body resp)))))

(defn eval-view-definition
  [{:keys [request cfg] :as ctx}]
  (when-let [box-url (-> request :body-params :box-url)]
    (if-let [public-server (public-fhir-server (cfg :public-fhir-servers) box-url)]
      (eval-vd-public-server request public-server)
      (auth-middleware/unauthorized-wo-token #'eval-vd-user-server ctx))))

(defn save-vd-user-server [{:keys [db request user]}]
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
      {:status 200
       :body (:body resp)
       :headers {"Content-Type" "application/json"}}
      (http-response/bad-request (:body resp)))))

(defn save-vd-public-server [request public-server]
  (let [box-url (-> request :body-params :box-url)
        vd-id (-> request :body-params :vd-id)
        view-definition (-> request :body-params :vd)
        request-fn (if vd-id http-client/put http-client/post)
        url (if vd-id
              (str box-url "/fhir/ViewDefinition/" vd-id)
              (str box-url "/fhir/ViewDefinition"))
        resp @(request-fn
                url
                {:headers
                 (merge {"Accept"       "application/json"
                         "Content-Type" "application/json"}
                        (:headers public-server))
                 :body (json/write-value-as-string view-definition)})]
    (if (predicates/success? resp)
      {:status 200
       :body (:body resp)
       :headers {"Content-Type" "application/json"}}
      (http-response/bad-request (:body resp)))))

(defn save-view-definition
  [{:keys [request cfg] :as ctx}]
  (when-let [box-url (-> request :body-params :box-url)]
    (if-let [public-server (public-fhir-server (cfg :public-fhir-servers) box-url)]
      (save-vd-public-server request public-server)
      (auth-middleware/unauthorized-wo-token #'save-vd-user-server ctx))))

(defn public-server:delete-vd [request public-server]
  (let [vd-id (-> request :body-params :vd-id)
        resp @(http-client/delete
                (format "%s/fhir/ViewDefinition/%s"
                        (:box-url public-server) vd-id)
                {:headers
                 (merge {"Accept"       "application/json"
                         "Content-Type" "application/json"}
                        (:headers public-server))})]
    (if (predicates/success? resp)
      {:status 204
       :body (:body resp)
       :headers {"Content-Type" "application/json"}}
      (http-response/bad-request (:body resp)))))

(defn user-server:delete-vd [{:keys [db request user]}]
  (let [{:keys [box-url vd-id]} (:body-params request)

        {aidbox-auth-token :user_servers/aidbox_auth_token}
        (user-server/get-by-account-id-and-box-url db (:accounts/id user) box-url)

        resp @(http-client/delete
                (str box-url "/fhir/ViewDefinition/" vd-id)
                {:headers
                 {"Cookie"       (str "aidbox-auth-token=" aidbox-auth-token ";")
                  "Accept"       "application/json"
                  "Content-Type" "application/json"}})]
    (if (predicates/success? resp)
      {:status 204
       :body (:body resp)
       :headers {"Content-Type" "application/json"}}
      (http-response/bad-request (:body resp)))))

(defn delete-view-definition
  [{:keys [request cfg] :as ctx}]
  (when-let [box-url (-> request :body-params :box-url)]
    (if-let [public-server (public-fhir-server (cfg :public-fhir-servers) box-url)]
      (public-server:delete-vd request public-server)
      (auth-middleware/unauthorized-wo-token #'user-server:delete-vd ctx))))

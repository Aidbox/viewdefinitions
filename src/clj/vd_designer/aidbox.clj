(ns vd-designer.aidbox
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [org.httpkit.client :as http-client]
            [lambdaisland.uri :as uri]
            [ring.util.http-response :as http-response]
            [vd-designer.utils.debug :refer [?]]
            [vd-designer.clients.portal :as portal]
            [vd-designer.repository.sso-token :as sso-token]
            [vd-designer.repository.user-server :as user-server]))

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
(defn list-servers [{:keys [aidbox.portal/client user db]}]
  (let [access-token
        (:sso_tokens/access_token (sso-token/get-last-by-id db (:accounts/id user)))
        projects (-> @(init-project client access-token)
                     :body
                     :result)
        licenses (->>  projects
                      (mapcat
                        (fn [project]
                          (-> @(fetch-licenses client access-token (:id project))
                              :body :result)))
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
    (http-response/ok licenses)))

(defn connect [{:keys [user db request]}]
  (let [box-url (-> request :body-params :box-url)
        {aidbox-auth-token :user_servers/aidbox_auth_token}
        (user-server/get-by-account-id-and-box-url
          db (:accounts/id user) box-url)
        box-response @(http-client/get
                        (str box-url "/fhir/ViewDefinition")
                        {:headers
                         {"Cookie" (str "aidbox-auth-token=" aidbox-auth-token ";")
                          "Accept" "application/json"
                          "Content-Type" "application/transit+json"}})]
    (if (= 200 (:status box-response))
      (http-response/ok (:body box-response))
      (http-response/bad-request box-response))))


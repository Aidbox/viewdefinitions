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

(defn add-aidbox-auth-token [{:keys [box-url] :as server}]
  (->> box-url
       (uri/uri)
       (uri/query-map)
       :token
       (assoc server :aidbox-auth-token)))

;; TODO: rework portal to have a middleware that takes care of access/refresh tokens
(defn list-servers [{:keys [aidbox.portal/client user db]}]
  (let [access-token
        (:sso_tokens/access_token (sso-token/get-last-by-id db (:accounts/id user)))
        projects (-> @(init-project client access-token)
                     :body
                     :result)]
    ;; TODO: filter self-hosted, expired, product = "aidbox", status = "active"
    (->> projects
         (mapcat
           (fn [project]
             (-> @(fetch-licenses client access-token (:id project))
                 :body :result)))
         ;; TODO: store in DB full data,
         ;;       send to front only things that are needed
         (mapv #(-> %
                    (select-keys [:name :box-url :product :status])
                    add-aidbox-auth-token
                    (update :box-url truncate-box-url)
                    (set/rename-keys {:name    :server-name
                                      :box-url :base-url})))
         (http-response/ok))))

(defn connect [{:keys [user db request]}]
  (let [box-url (-> request :body :box-url)
        {aidbox-auth-token :aidbox_auth_token} (user-server/get-by-account-id-and-box-url
                                                 db (:accounts/id user) box-url)
        box-response @(http-client/get (str box-url "/fhir/ViewDefinition")
                                       {:headers {"Cookie" (str "aidbox_auth_token=" aidbox-auth-token)}})]
    (http-response/ok "TODO")))

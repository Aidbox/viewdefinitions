(ns vd-designer.aidbox
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [lambdaisland.uri :as uri]
            [ring.util.http-predicates :as predicates]
            [ring.util.http-response :as http-response]
            [vd-designer.aidbox.proxy :as proxy]
            [vd-designer.clients.portal :as portal]
            [vd-designer.repository.sso-token :as sso-token]
            [vd-designer.repository.user-server :as user-server]))

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

(defn licenses-for-project [{:keys [aidbox.portal/client cfg]} access-token project]
  (->> @(portal/rpc:fetch-licenses client access-token (:id project))
       :body :result
       (mapv (fn [license]
               (update license
                       :project merge
                       {:name (:name project)
                        :new-license-url
                        (format "%s/ui/portal#/project/%s/license/new"
                                (:aidbox.portal/url cfg)
                                (:id project))})))))

(defn valid-license? [license]
  (and (:box-url license)
       (= "aidbox" (:product license))
       (= "active" (:status license))
       (:expiration-days license)
       (> (:expiration-days license) 0)))

(defn enrich-license [license account-id]
  (-> license
      (select-keys [:name :box-url :project])
      (assoc :aidbox-auth-token (aidbox-auth-token (:box-url license))
             :account-id account-id)
      (update :box-url truncate-box-url)
      (set/rename-keys {:name :server-name})))

;; TODO: rework portal to have a middleware that takes care of access/refresh tokens
(defn list-user-servers
  [{:keys [aidbox.portal/client db] :as ctx}
   account-id]
  (let [access-token (:sso_tokens/access_token (sso-token/get-last-by-id db account-id))
        projects (-> @(portal/rpc:init-project client access-token)
                     :body :result)
        licenses (->> projects
                      (mapcat #(licenses-for-project ctx access-token %))
                      (filter valid-license?)
                      (mapv #(enrich-license % account-id)))]
    (when-not (empty? licenses)
      (->> licenses
           (map #(select-keys % [:box-url :account-id :server-name :aidbox-auth-token]))
           (user-server/create-many db)))

    licenses))

(defn list-servers [{:keys [cfg user] :as ctx}]
  (->> (cond->> (cfg :public-fhir-servers)
         user
         (concat (list-user-servers ctx user)))
       (map #(select-keys % [:box-url :server-name :project]))
       (http-response/ok)))

(defn perform-proxied-request
  [proto-fn ctx & [overrides-on-success]]
  (let [box-response (proto-fn ctx)
        response-body (:body box-response)]
    (if (predicates/success? box-response)
      (merge (http-response/ok response-body) overrides-on-success)
      (http-response/bad-request response-body))))

(defn connect [ctx]
  (perform-proxied-request proxy/connect ctx))

(defn get-view-definition [ctx]
  (perform-proxied-request proxy/get-view-definition ctx))

(defn eval-view-definition [ctx]
  (perform-proxied-request proxy/eval-view-definition ctx
                           {:headers {}}))

(defn save-view-definition [ctx]
  (perform-proxied-request proxy/save-view-definition ctx))

(defn delete-view-definition [ctx]
  (perform-proxied-request proxy/delete-view-definition ctx
                           {:status 204}))

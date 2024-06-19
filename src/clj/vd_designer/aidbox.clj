(ns vd-designer.aidbox
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [lambdaisland.uri :as uri]
            [ring.util.http-predicates :as predicates]
            [ring.util.http-response :as http-response]
            [vd-designer.aidbox.proxy :as proxy]
            [vd-designer.aidbox.proxy.private :as proxy-private]
            [vd-designer.aidbox.proxy.public :as proxy-public]
            [vd-designer.clients.portal :as portal]
            [vd-designer.repository.sso-token :as sso-token]
            [vd-designer.repository.user-server :as user-server]
            [vd-designer.utils.http :refer [apply-middleware]]
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

(defn public-fhir-server [public-fhir-servers box-url]
  (some->> public-fhir-servers
           (filter #(-> % :box-url (= box-url)))
           first))

(defn perform-proxied-request
  [proto-fn
   {:keys [cfg] :as ctx}
   box-url
   & [overrides-on-success]]
  (let [public-server (public-fhir-server (:public-fhir-servers cfg) box-url)
        box-response (if public-server
                       (proto-fn (proxy-public/mk ctx public-server))
                       ;; TODO this should be done at other place...
                       (apply-middleware auth-middleware/authentication-required-middleware
                                         proto-fn
                                         (proxy-private/map->PrivateAidboxServerProxy ctx)))
        response-body (:body box-response)]
    (if (predicates/success? box-response)
      (merge (http-response/ok response-body) overrides-on-success)
      (http-response/bad-request response-body))))

(defn connect [{:keys [request] :as ctx}]
  (perform-proxied-request proxy/connect ctx
                           (-> request :body-params :box-url)))

(defn get-view-definition [{:keys [request] :as ctx}]
  (perform-proxied-request proxy/get-view-definition ctx
                           (-> request :query-params :box-url)))

(defn eval-view-definition [{:keys [request] :as ctx}]
  (perform-proxied-request proxy/eval-view-definition ctx
                           (-> request :body-params :box-url)
                           {:headers {}}))

(defn save-view-definition [{:keys [request] :as ctx}]
  (perform-proxied-request proxy/save-view-definition ctx
                           (-> request :body-params :box-url)))

(defn delete-view-definition [{:keys [request] :as ctx}]
  (perform-proxied-request proxy/delete-view-definition ctx
                           (-> request :body-params :box-url)
                           {:status 204}))

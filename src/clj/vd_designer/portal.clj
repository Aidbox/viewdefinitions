(ns vd-designer.portal
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [lambdaisland.uri :as uri]
            [ring.util.http-response :as http-response]
            [vd-designer.clients.portal :as portal]
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

(defn list-user-servers
  [{{:keys [id sso-token]}   :user
    client :aidbox.portal/client
    db     :db
    :as    ctx}]
  (let [projects (-> @(portal/rpc:init-project client sso-token)
                     :body :result)
        licenses (->> projects
                      (mapcat #(licenses-for-project ctx sso-token %))
                      (filter valid-license?)
                      (mapv #(enrich-license % id)))]
    (when-not (empty? licenses)
      (->> licenses
           (map #(select-keys % [:box-url :account-id :server-name :aidbox-auth-token]))
           (user-server/create-many db)))
    licenses))

(defn select-server-keys [servers]
  (map #(select-keys % [:box-url :server-name :project])
       servers))

(defn list-servers
  [{:keys [cfg user] :as ctx}]
  (let [public-servers (:public-fhir-servers cfg)
        portal-boxes
        (-> (if user
              (concat (list-user-servers ctx) public-servers)
              public-servers)
            select-server-keys)]
    (http-response/ok
      {:portal-boxes portal-boxes
       :custom-boxes [{:box-url "http://someurl.com" :server-name "somebox" :headers {:header1 "header1" :Authorization "Basic somebasic"}}]})))

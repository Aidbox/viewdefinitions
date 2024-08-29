(ns vd-designer.portal
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [lambdaisland.uri :as uri]
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

(defn licenses-for-project [{:keys [aidbox.portal/client]} access-token project-id]
  (->> @(portal/rpc:fetch-licenses client access-token project-id)
       :body :result
       (mapv (fn [license] (assoc license :project-id project-id)))))

(defn valid-license? [license]
  (and (:box-url license)
       (= "aidbox" (:product license))
       (= "active" (:status license))
       (:expiration-days license)
       (> (:expiration-days license) 0)))

(defn enrich-license [license account-id]
  (-> license
      (select-keys [:name :box-url :project-id])
      (assoc :aidbox-auth-token (aidbox-auth-token (:box-url license))
             :account-id account-id)
      (update :box-url truncate-box-url)
      (set/rename-keys {:name :server-name})))

(defn license-url [project cfg]
  (format "%s/ui/portal#/project/%s/license/new" (:aidbox.portal/url cfg) (:id project)))

(defn list-portal-user-servers
  [{{:keys [id sso-token]}   :user
    client :aidbox.portal/client
    db     :db
    cfg    :cfg
    :as    ctx}]
  (let [projects (-> @(portal/rpc:init-project client sso-token) :body :result)
        licenses (->> projects
                      (mapcat #(licenses-for-project ctx sso-token (:id %)))
                      (filter valid-license?)
                      (mapv #(enrich-license % id)))
        projects-with-licenses (as-> projects $
                                 (group-by :id $)
                                 (update-vals $ (fn [p]
                                                  (let [pp (first p)
                                                        project
                                                        (-> pp
                                                            (select-keys [:id :name])
                                                            (assoc :new-license-url (license-url pp cfg)))
                                                        boxes (->> (licenses-for-project ctx sso-token (:id project))
                                                                   (filter valid-license?)
                                                                   (mapv #(enrich-license % id)))]
                                                    (assoc project :boxes boxes)))))]
    (when-not (empty? licenses)
      (->> licenses
           (map #(select-keys % [:box-url :account-id :server-name :aidbox-auth-token]))
           (user-server/create-many db)))
    (vals projects-with-licenses)))

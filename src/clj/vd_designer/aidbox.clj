(ns vd-designer.aidbox
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [lambdaisland.uri :as uri]
            [jsonista.core :as json]
            [martian.core :as martian]
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
  (let [public-servers (:public-fhir-servers cfg)]
    (-> (if user
          (concat (list-user-servers ctx) public-servers)
          public-servers)
        select-server-keys
        (http-response/ok))))

(defn hack-view-definitions-meta [view-definitions]
  (update-in view-definitions
             [:body :entry]
             (fn [entry]
               (mapv
                 (fn [view-definition]
                   (if (-> view-definition :resource :meta :createdAt)
                     (update-in view-definition [:resource :meta] dissoc :createdAt)
                     view-definition))
                 entry))))

(defn hack-view-definition-meta [view-definition]
  (if (-> view-definition :body :meta :createdAt)
    (update-in view-definition [:body :meta] dissoc :createdAt)
    view-definition))

(defn connect
  [{:keys [box-url fhir-server-headers]}]
  (hack-view-definitions-meta
    @(martian/response-for (portal/client box-url)
                           :connect
                           fhir-server-headers)))

(defn get-view-definition
  [{:keys [box-url request fhir-server-headers]}]
  (let [{:keys [vd-id]} (:query-params request)]
    (hack-view-definition-meta @(martian/response-for (portal/client box-url)
                                                      :get-view-definition
                                                      (merge {:vd-id vd-id}
                                                             fhir-server-headers)))))

(defn eval-view-definition
  [{:keys [box-url request fhir-server-headers]}]
  (let [{:keys [vd]} (:body-params request)]
    @(martian/response-for (portal/client box-url)
                           :rpc
                           (merge {:method 'sof/eval-view
                                   :params {:limit 100
                                            :view  vd}}
                                  fhir-server-headers))))

(defn save-view-definition
  [{:keys [box-url request fhir-server-headers]}]
  (let [{:keys [vd vd-id]} (:body-params request)]
    @(martian/response-for (portal/client box-url)
                           (if vd-id :update-view-definition :create-view-definition)
                           (merge {:body  vd
                                   :vd-id vd-id}
                                  fhir-server-headers))))

(defn delete-view-definition
  [{:keys [box-url request fhir-server-headers]}]
  (let [{:keys [vd-id]} (:body-params request)]
    @(martian/response-for (portal/client box-url)
                           :delete-view-definition
                           (merge {:vd-id vd-id}
                                  fhir-server-headers))))

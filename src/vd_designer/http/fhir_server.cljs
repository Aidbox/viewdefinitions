(ns vd-designer.http.fhir-server
  (:require [ajax.core :as ajax]
            [lambdaisland.uri :as uri]))

(defn active-server [db]
  (let [{:keys [servers used-server-name]} (:cfg/fhir-servers db)]
    (servers used-server-name)))

(defn- with-defaults [req db]
  (merge {:headers          (-> db active-server :headers)
          :timeout          8000
          :with-credentials true
          :format (ajax/json-request-format)
          :response-format  (ajax/json-response-format {:keywords? true})
          ;; do we need this by default?
          :on-failure       [:bad-http-result]}
         req))

(defn base-url+path [db path]
  (-> db active-server :base-url
      uri/uri
      (assoc :path path)
      uri/uri-str))

(defn aidbox-rpc [db params]
  (-> {:method :post
       :uri    (base-url+path db "/rpc")
       :params params
       :format (ajax/json-request-format)}
      (with-defaults db)))

(defn get-view-definitions [db & [opts]]
  (-> {:method :get
       :uri    (base-url+path db "/ViewDefinition")}
      (with-defaults db)
      (merge opts)))

(defn get-view-definition [db vd-id]
  (-> {:method :get
       :uri    (base-url+path db (str "/ViewDefinition/" vd-id))}
      (with-defaults db)))

(defn get-metadata [db & [opts]]
  (-> {:method :get
       :uri    (base-url+path db "/metadata")}
      (with-defaults db)
      (dissoc :headers)
      (merge opts)))

(defn delete-view-definition [db vd-id]
  (-> {:method :delete
       :uri    (base-url+path db (str "/ViewDefinition/" vd-id))}
      (with-defaults db)))

(defn put-view-definition [db vd-id params]
  (-> {:method :put
       :uri    (base-url+path db (str "/ViewDefinition/" vd-id))
       :params params
       :format (ajax/json-request-format)}
      (with-defaults db)))

;; TODO: we need to POST view definition if we consider it new
;; (created by "+ ViewDefinition" button)
;; because if we POST FHIR server will check if
;; id (or even view_name) already exists
#_(defn post-view-definition [db params]
  (-> {:method :put
       :uri    (base-url+path db "/ViewDefinition/")
       :params params
       :format (ajax/json-request-format)}
      (with-defaults db)))

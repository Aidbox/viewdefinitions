(ns vd-designer.http.fhir-server
  (:require [ajax.core :as ajax]
            [lambdaisland.uri :as uri]))

(defn active-server [db]
  (let [{:keys [servers used-server-name]} (:cfg/fhir-servers db)]
    (servers used-server-name)))

(defn- with-defaults [req db]
  (merge {:headers          {:Authorization (-> db active-server :token)}
          :timeout          8000
          :with-credentials true
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

(defn get-view-definitions [db]
  (-> {:method :get
       :uri    (base-url+path db "/ViewDefinition")}
      (with-defaults db)))

(defn get-view-definition [db vd-id]
  (-> {:method :get
       :uri    (base-url+path db (str "/ViewDefinition/" vd-id))}
      (with-defaults db)))

(defn get-metadata [db]
  (-> {:method :get
       :uri    (base-url+path db "/metadata")}
      (with-defaults db)))

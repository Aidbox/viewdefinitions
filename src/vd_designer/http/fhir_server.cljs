(ns vd-designer.http.fhir-server
  (:require [ajax.core :as ajax]
            [lambdaisland.uri :as uri]))

(defn- with-defaults [req db]
  (merge {:headers          {:Authorization (-> db :fhir-server :token)}
          :timeout          8000
          :with-credentials true
          :response-format  (ajax/json-response-format {:keywords? true})
          ;; do we need this by default?
          :on-failure       [:bad-http-result]}
         req))

(defn base-url+path [db path]
  (-> db :fhir-server :base-url
      uri/uri
      (assoc :path path)
      uri/uri-str))

(defn request:rpc [db params]
  (-> {:method :post
       :uri    (base-url+path db "/rpc")
       :params params
       :format (ajax/json-request-format)}
      (with-defaults db)))

(defn request:get-view-definitions [db]
  (-> {:method :get
       :uri    (base-url+path db "/fhir/ViewDefinition")}
      (with-defaults db)))

(defn request:get-view-definition [db vd-id]
  (-> {:method :get
       :uri    (base-url+path db (str "/fhir/ViewDefinition/" vd-id))}
      (with-defaults db)))

(defn request:get-metadata [db]
  (-> {:method :get
       :uri    (base-url+path db "/fhir/metadata")}
      (with-defaults db)))

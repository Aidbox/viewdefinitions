(ns vd-designer.http.fhir-server
  (:require [ajax.core :as ajax]
            [lambdaisland.uri :as uri]))

(defn active-server [db]
  (let [{:keys [sandbox/servers used-server-name]}
        (:cfg/fhir-servers db)
        user-servers (:user/servers (:cfg/fhir-servers db))]
    (or (servers used-server-name)
        (user-servers used-server-name))))

(defn- with-defaults [req db]
  (merge {:headers          (-> db active-server :headers)
          :timeout          8000
          :with-credentials true
          :format           (ajax/json-request-format)
          :response-format  (ajax/json-response-format {:keywords? true})
          ;; do we need this by default?
          :on-failure       [:bad-http-result]}
         req))

(defn box-url+path [db path]
  (-> db active-server :box-url
      uri/uri
      (assoc :path path)
      uri/uri-str))

(defn aidbox-rpc [db params]
  (-> {:method :post
       :uri    (box-url+path db "/rpc")
       :params params
       :format (ajax/json-request-format)}
      (with-defaults db)))

(defn get-view-definitions [db & [opts]]
  (-> {:method :get
       :uri    (box-url+path db "/fhir/ViewDefinition")}
      (with-defaults db)
      (merge opts)))

(defn get-view-definitions-user-server [authentication-token {:keys [box-url]}]
  {:uri              "/api/aidbox/connect"
   :timeout          8000
   :format           (ajax/json-request-format)
   :response-format  (ajax/json-response-format
                       {:keywords? true})
   :with-credentials true
   :method           :post
   :params           {:box-url box-url}
   :headers          {:authorization (str "Bearer " authentication-token)}})

(defn get-view-definition [db vd-id]
  (-> {:method :get
       :uri    (box-url+path db (str "/fhir/ViewDefinition/" vd-id))}
      (with-defaults db)))

(defn get-view-definition-user-server [authentication-token {:keys [box-url]} vd-id]
  {:uri              "/api/aidbox/ViewDefinition"
   :timeout          8000
   :format           (ajax/json-request-format)
   :response-format  (ajax/json-response-format
                       {:keywords? true})
   :with-credentials true
   :method           :get
   :params           {:box-url box-url :vd-id vd-id}
   :headers          {:authorization (str "Bearer " authentication-token)}})

(defn get-metadata [db & [opts]]
  (-> {:method :get
       :uri    (box-url+path db "/fhir/metadata")}
      (with-defaults db)
      (dissoc :headers)
      (merge opts)))

(defn delete-view-definition [db vd-id]
  (-> {:method :delete
       :uri    (box-url+path db (str "/fhir/ViewDefinition/" vd-id))}
      (with-defaults db)))

(defn put-view-definition [db vd-id params]
  (-> {:method :put
       :uri    (box-url+path db (str "/fhir/ViewDefinition/" vd-id))
       :params params
       :format (ajax/json-request-format)}
      (with-defaults db)))

(defn post-view-definition [db params]
  (-> {:method :post
       :uri    (box-url+path db "/fhir/ViewDefinition/")
       :params params
       :format (ajax/json-request-format)}
      (with-defaults db)))

(ns vd-designer.http.fhir-server
  (:require
   [ajax.core :as ajax]
   [vd-designer.http.backend :refer [authorization-header]]))

(defn active-server [db]
  (let [{user-servers :user/servers
         used-server-name :used-server-name}
        (:cfg/fhir-servers db)
        portal-boxes (:portal-boxes user-servers)
        custom-servers (:custom-servers user-servers)]
    (when user-servers
     (or (get portal-boxes used-server-name)
         (get custom-servers used-server-name)))))

(defn get-view-definitions [authentication-token {:keys [box-url headers]}]
  {:uri              "/api/aidbox/connect"
   :timeout          8000
   :format           (ajax/json-request-format)
   :response-format  (ajax/json-response-format
                      {:keywords? true})
   :with-credentials true
   :method           :post
   :params           (cond-> {:box-url box-url} headers (assoc :headers headers))
   :headers          (authorization-header authentication-token)})

(defn get-view-definition-user-server [authentication-token {:keys [box-url]} vd-id]
  {:uri              "/api/aidbox/ViewDefinition"
   :timeout          8000
   :format           (ajax/json-request-format)
   :response-format  (ajax/json-response-format
                      {:keywords? true})
   :with-credentials true
   :method           :get
   :params           {:box-url box-url :vd-id vd-id}
   :headers          (authorization-header authentication-token)})

(defn eval-view-definition-user-server [authentication-token {:keys [box-url]} view-definition]
  {:uri              "/api/aidbox/ViewDefinition/eval"
   :timeout          8000
   :format           (ajax/json-request-format)
   :response-format  (ajax/json-response-format
                      {:keywords? true})
   :with-credentials true
   :method           :post
   :params           {:box-url box-url :vd view-definition}
   :headers          (authorization-header authentication-token)})

(defn get-metadata [{:keys [box-url]}]
 {:uri              "/api/metadata"
  :timeout          8000
  :format           (ajax/json-request-format)
  :response-format  (ajax/json-response-format {:keywords? true})
  :with-credentials false
  :method           :get
  :params           {:box-url box-url}})

(defn delete-view-definition [authentication-token {:keys [box-url]} vd-id]
  {:uri              "/api/aidbox/ViewDefinition"
   :timeout          8000
   :format           (ajax/json-request-format)
   :response-format  (ajax/json-response-format
                      {:keywords? true})
   :with-credentials true
   :method           :delete
   :params           {:box-url box-url
                      :vd-id   vd-id}
   :headers          (authorization-header authentication-token)})

(defn post-view-definition [authentication-token {:keys [box-url]} vd]
  {:uri              "/api/aidbox/ViewDefinition"
   :timeout          8000
   :format           (ajax/json-request-format)
   :response-format  (ajax/json-response-format
                      {:keywords? true})
   :with-credentials true
   :method           :post
   :params           {:box-url box-url :vd vd}
   :headers          (authorization-header authentication-token)})

(defn get-resource [authentication-token {:keys [box-url]} resource-type search-params]
  {:uri              "/api/aidbox/Resource"
   :timeout          8000
   :response-format  (ajax/json-response-format
                      {:keywords? false})
   :with-credentials true
   :method           :get
   :params           {:box-url box-url 
                      :resource-type resource-type
                      :search-params search-params}
   :headers          (authorization-header authentication-token)})
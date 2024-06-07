(ns vd-designer.http.fhir-server
  (:require [ajax.core :as ajax]
            [lambdaisland.uri :as uri]))

(defn active-server [db]
  (let [{user-servers :user/servers
         used-server-name :used-server-name}
        (:cfg/fhir-servers db)]
    (user-servers used-server-name)))

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

(defn get-view-definitions [authentication-token {:keys [box-url]}]
  {:uri              "/api/aidbox/connect"
   :timeout          8000
   :format           (ajax/json-request-format)
   :response-format  (ajax/json-response-format
                       {:keywords? true})
   :with-credentials true
   :method           :post
   :params           {:box-url box-url}
   :headers          {:authorization (str "Bearer " authentication-token)}})

;; dead code?
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

(defn eval-view-definition-user-server [authentication-token {:keys [box-url]} view-definition]
  {:uri              "/api/aidbox/ViewDefinition/eval"
   :timeout          8000
   :format           (ajax/json-request-format)
   :response-format  (ajax/json-response-format
                       {:keywords? true})
   :with-credentials true
   :method           :post
   :params           {:box-url box-url :vd view-definition}
   :headers          {:authorization (str "Bearer " authentication-token)}})

(defn get-metadata [db]
  (-> {:method :get
       :uri    (box-url+path db "/fhir/metadata")}
      (with-defaults db)
      (dissoc :headers)))

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
   :headers          {:authorization (str "Bearer " authentication-token)}})

(defn post-view-definition [authentication-token {:keys [box-url]} vd]
  {:uri              "/api/aidbox/ViewDefinition"
   :timeout          8000
   :format           (ajax/json-request-format)
   :response-format  (ajax/json-response-format
                       {:keywords? true})
   :with-credentials true
   :method           :post
   :params           {:box-url box-url :vd vd}
   :headers          {:authorization (str "Bearer " authentication-token)}})

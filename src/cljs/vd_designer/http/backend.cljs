(ns vd-designer.http.backend
  (:require [ajax.core :as ajax]))

(defn authorization-header [authentication-token]
  {:authorization (when authentication-token
                    (str "Bearer " authentication-token))})

(defn request:list-server [authentication-token]
  {:uri              "/api/aidbox/servers"
   :timeout          8000
   :format           (ajax/json-request-format)
   :response-format  (ajax/json-response-format {:keywords? true})
   :with-credentials true
   :method           :get
   :headers          (authorization-header authentication-token)})

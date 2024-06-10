(ns vd-designer.http.backend
  (:require [ajax.core :as ajax]))

(defn request:list-server [authentication-token]
  {:uri              "/api/aidbox/servers"
   :timeout          8000
   :format           (ajax/json-request-format)
   :response-format  (ajax/json-response-format {:keywords? true})
   :with-credentials true
   :method           :get
   :headers          {:authorization (str "Bearer " authentication-token)}})

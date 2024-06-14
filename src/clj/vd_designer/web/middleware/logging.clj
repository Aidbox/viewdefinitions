(ns vd-designer.web.middleware.logging
  (:require [taoensso.telemere :as t]))

(defn logging-middleware []
  {:name ::logging
   :wrap (fn [handler]
           (fn [{:keys [request] :as req}]
             (let [startedAt (System/currentTimeMillis)
                   response  (handler req)]
               (t/log! {:level :info
                        :data  {:uri     (:uri            request)
                                :method  (:request-method request)
                                :status  (:status         response)
                                :latency (- (System/currentTimeMillis) startedAt)}}
                       "HTTP request")
               (t/log! {:level :debug
                        :data  {:path-params  (:path-params request)
                                :query-params (:query-params request)}}
                       "HTTP request parameters")
               response)))})

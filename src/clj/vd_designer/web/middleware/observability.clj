(ns vd-designer.web.middleware.observability
  (:require [iapetos.core :as prometheus]
            [taoensso.telemere :as t]
            [vd-designer.monitoring :as monitoring]))

(defn observability-middleware []
  {:name ::observability
   :wrap (fn [handler]
           (fn [{:keys [request] :as req}]
             (let [startedAt (System/currentTimeMillis)
                   response  (handler req)

                   latency   (-> (System/currentTimeMillis)
                                 (- startedAt)
                                 (/ 1000)
                                 double)
                   labels    {:method      (:request-method request)
                              :route-name  (-> request :reitit.core/match :template)
                              :status-code (:status         response)}]
               (prometheus/observe monitoring/registry
                                   :http/duration-seconds
                                   labels
                                   latency)
               (t/log! {:level :info
                        :data  (assoc labels :latency latency)}
                       "HTTP request")
               (t/log! {:level :debug
                        :data  {:path-params  (:path-params request)
                                :query-params (:query-params request)}}
                       "HTTP request parameters")
               response)))})

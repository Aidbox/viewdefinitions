(ns vd-designer.clients.interceptors
  (:require [iapetos.core :as prometheus]
            [taoensso.telemere :as t]
            [vd-designer.monitoring :as monitoring]))

(defn observability [^String client-name]
  {:name  ::observability
   :enter (fn [ctx]
            (assoc ctx ::start-time (System/currentTimeMillis)))

   :leave (fn [ctx]
            (let [latency (-> (System/currentTimeMillis)
                              (- (::start-time ctx))
                              (/ 1000)
                              double)
                  base-route (-> ctx :handler :route-name)
                  route-name (if (= base-route :rpc)
                               (->> ctx :params :method str (keyword (name base-route)))
                               base-route)
                  labels  {:client      client-name
                           :method      (-> ctx :request :method)
                           :route-name  route-name
                           :status-code (-> ctx :response :status)}]
              (prometheus/observe monitoring/registry
                                  :client/duration-seconds
                                  labels
                                  latency)
              (t/log! {:level :info
                       :data  (assoc labels :latency latency)}
                      "HTTP request")
              (t/log! {:level :debug
                       :data  {:params (:params ctx)}}
                      "HTTP request parameters"))
            ctx)})

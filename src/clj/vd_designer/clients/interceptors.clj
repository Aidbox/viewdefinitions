(ns vd-designer.clients.interceptors
  (:require [iapetos.core :as prometheus]
            [ring.util.http-predicates :as predicates]
            [taoensso.telemere :as t]
            [vd-designer.monitoring :as monitoring]))

(defn log-request [{:keys [response params]} labels latency]
  (let [error    (when (or (predicates/client-error? response)
                           (predicates/server-error? response))
                   (get-in response [:body :message]))
        log-data (-> labels
                     (assoc :latency latency)
                     (assoc :error error))]
    (t/log! {:level :info
             :data  log-data}
            "HTTP request")
    (t/log! {:level :debug
             :data  {:params params}}
            "HTTP request parameters")))

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
                               (->> ctx :params :method name (keyword (name base-route)))
                               base-route)
                  labels  {:client      client-name
                           :method      (-> ctx :request :method)
                           :route-name  route-name
                           :status-code (-> ctx :response :status)}]
              (prometheus/observe monitoring/registry
                                  :client/duration-seconds
                                  labels
                                  latency)
              (log-request ctx labels latency))
            ctx)})

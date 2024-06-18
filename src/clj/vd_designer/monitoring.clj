(ns vd-designer.monitoring
  (:require [iapetos.core :as prometheus]))

(def default-buckets
  "The default Histogram buckets. These are tailored to measure the response time
   (in seconds) of a network service."
  [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10])

(defonce registry
  (-> (prometheus/collector-registry "vd-designer")
      (prometheus/register
       ;; Database
       (prometheus/histogram :db/duration-seconds
                             {:description "DB queries latencies in seconds."
                              :labels      [:ns]
                              :buckets     default-buckets})
       (prometheus/gauge     :db/active-connections
                             {:description "DB active connections."
                              :labels      [:ns]})

       ;; HTTP
       (prometheus/histogram :http/duration-seconds
                             {:description "HTTP requests latencies in seconds."
                              :labels      [:method :route-name :status-code]
                              :buckets     default-buckets})

       ;; Clients
       (prometheus/histogram :client/duration-seconds
                             {:description "External client requests latencies in seconds."
                              :labels      [:client :method :route-name :status-code]
                              :buckets     default-buckets}))))

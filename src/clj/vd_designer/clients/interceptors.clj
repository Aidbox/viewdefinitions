(ns vd-designer.clients.interceptors
  (:require [taoensso.telemere :as t]))

(defn logging [^String client-name]
  {:name  ::logging
   :enter (fn [ctx]
            (assoc ctx ::start-time (System/currentTimeMillis)))

   :leave (fn [ctx]
            (t/log! {:level :info
                     :data  {:client  client-name
                             :route   (-> ctx :handler  :route-name)
                             :method  (-> ctx :request  :method)
                             :status  (-> ctx :response :status)
                             :latency (- (System/currentTimeMillis) (::start-time ctx))}}
                    "HTTP request")
            (t/log! {:level :debug
                     :data  {:params (:params ctx)}}
                    "HTTP request parameters")
            ctx)})

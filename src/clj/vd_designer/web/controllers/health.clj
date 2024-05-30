(ns vd-designer.web.controllers.health
  (:require [ring.util.http-response :as http-response])
  (:import (java.lang.management ManagementFactory)
           (java.util Date)))

(defn check [_req]
  (http-response/ok
    {:time     (-> (System/currentTimeMillis)
                   (Date.)
                   (str))
     :up-since (-> (ManagementFactory/getRuntimeMXBean)
                   (.getStartTime)
                   (Date.)
                   (str))}))

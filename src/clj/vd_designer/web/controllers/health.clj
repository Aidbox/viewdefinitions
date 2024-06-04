(ns vd-designer.web.controllers.health
  (:require [clojure.java.io :as io]
            [ring.util.http-response :as http-response]
            [clojure.string :as str])
  (:import (java.lang.management ManagementFactory)
           (java.util Date)))

(defn check [_req]
  (http-response/ok
   {:version  (-> (io/resource "version") slurp str/trim-newline str/trim)
    :time     (-> (System/currentTimeMillis)
                  (Date.)
                  (str))
    :up-since (-> (ManagementFactory/getRuntimeMXBean)
                  (.getStartTime)
                  (Date.)
                  (str))}))

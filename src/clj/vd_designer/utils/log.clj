(ns vd-designer.utils.log
  (:require [clojure.string :as str]))

(defn- log [severity msg & msgs]
  (println
   (str (java.util.Date.) " " severity ": " msg " " (str/join " " msgs))))

(defn info [msg & msgs]
  (log "INFO" msg msgs))

(defn warn [msg & msgs]
  (log "WARN" msg msgs))

(defn error [msg & msgs]
  (log "ERROR" msg msgs))

(defn debug [msg & msgs]
  (log "DEBUG" msg msgs))

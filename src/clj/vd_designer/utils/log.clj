(ns vd-designer.utils.log
  (:require [clojure.string :as str]))

(defn info [msg & msgs]
  (println
   (str (java.util.Date.) " INFO: " msg " " (str/join " " msgs))))

(defn debug [msg & msgs]
  (println
   (str (java.util.Date.) " DEBUG: " msg " " (str/join " " msgs))))

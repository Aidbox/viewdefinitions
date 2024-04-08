(ns vd-designer.utils.string
  (:require [clojure.string :as str]))

(defn parse-kw
  "Converts string to keyword, if it starts with `:`."
  [s]
  (cond-> s
          (str/starts-with? s ":")
          (-> (subs 1) keyword)))

(defn parse-path
  "Parses string to value path."
  [path-str]
  (->> (str/split path-str " ")
       (mapv parse-kw)))

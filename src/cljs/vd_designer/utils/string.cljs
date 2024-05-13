(ns vd-designer.utils.string
  (:require [clojure.string :as str]
            [goog.string :as gstring]
            [goog.string.format]))

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

(defn format [& args]
  (apply gstring/format args))

(defn capitalize
  "In contrast to str/capitalize, doesn't convert the rest to lower case."
  [s]
  (when s
    (str (-> s first str/upper-case)
         (subs s 1))))

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

(defn tail-head-intersection [^String s1, ^String s2]
  (if (or (str/blank? s1)
          (str/blank? s2))
    0
    (let [lesser-len (min (count s1) (count s2))]
      (if (= 0 lesser-len)
        0
        (loop [pretender "", i 0]
          (if (> i lesser-len)
            (count pretender)
            (let [tail-subs (subs s1 (-> (count s1) (- i) dec))
                  head-subs (subs s2 0 (inc i))
                  new-pretender (if (= tail-subs head-subs)
                                  tail-subs
                                  pretender)]
              (recur new-pretender (inc i)))))))))
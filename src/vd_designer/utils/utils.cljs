(ns vd-designer.utils.utils)

(defn vector-starts-with [v pattern]
  (->> v
       (take (count pattern))
       (= pattern)))
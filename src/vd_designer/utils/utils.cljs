(ns vd-designer.utils.utils)

(defn vector-starts-with [v pattern]
  (->> v
       (take (count pattern))
       (= pattern)))

(defn remove-by-index [v elem]
  (into (subvec v 0 elem)
        (subvec v (inc elem))))

(defn insert-at [coll index elem]
  (-> (subvec coll 0 index)
      (conj elem)
      (into (subvec coll index))))

(defn insert-after [coll index elem]
  (-> (subvec coll 0 (inc index))
      (conj elem)
      (into (subvec coll (inc index)))))

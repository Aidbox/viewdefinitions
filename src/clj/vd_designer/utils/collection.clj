(ns vd-designer.utils.collection)

(defn conj-if-new [coll x]
  (cond-> coll
    (not-any? #{x} coll) (conj x)))

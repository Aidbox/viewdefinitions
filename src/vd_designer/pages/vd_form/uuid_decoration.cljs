(ns vd-designer.pages.vd-form.uuid-decoration
  (:require [clojure.walk :refer [postwalk]]))

(defn generate-uuid-key []
  ;; (keyword (str (random-uuid)))
  (str (random-uuid)))

(defn- decorate-form [form]
  (cond-> form
    (map? form)
    (assoc :tree/key (generate-uuid-key))))

(defn- remove-form-decoration [form]
  (cond-> form
    (map? form)
    (dissoc :tree/key)))

(defn decorate [vd]
  (postwalk decorate-form vd))

(defn remove-decoration [vd]
  (postwalk remove-form-decoration vd))


(defn- find-index [pred coll]
  (first (keep-indexed (fn [idx x]
                         (when (pred x)
                           idx))
                       coll)))

(defn uuid->idx [initial-path form]
  (reduce (fn [path step]
            (if (keyword? step)
              (conj path step)
              (let [sub-form (get-in form path)]
                (conj path (find-index #(= step (:tree/key %)) sub-form)))))
          []
          initial-path))

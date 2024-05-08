(ns vd-designer.pages.vd-form.form.normalization)

(defn- normalize-column [acc node]
  (cond
    (:select acc)
    (update acc :select #(into [{:column (:column node)}] %))

    (:unionAll node)
    (assoc acc :select [{:column (:column node)}])

    :else
    (assoc acc :column (:column node))))

(declare normalize-vd)

(defn- normalize-union [acc node]
  (let [normalized-union (normalize-vd (:unionAll node))]
    (if (:select acc)
      (update acc :select conj {:unionAll normalized-union})
      (assoc acc :unionAll normalized-union))))

(defn- normalize-foreach [acc node]
  (let [forEachKey (first (or (find node :forEach)
                              (find node :forEachOrNull)))]
    (if (:select acc)
      (assoc acc forEachKey (forEachKey node))
      (-> {}
          (assoc forEachKey (forEachKey node))
          (assoc :select (if (empty? acc)
                           []
                           [acc]))))))

(defn- normalize-node [node]
  (cond-> {}
    (:select node)
    (assoc :select (normalize-vd (:select node)))

    (:column node)
    (normalize-column node)

    (:unionAll node)
    (normalize-union node)

    (or (:forEach node) (:forEachOrNull node))
    (normalize-foreach node)))

(defn normalize-vd [nodes]
  (mapv normalize-node nodes))

(ns vd-designer.pages.form.form.tree
  (:require [clojure.set :as set]
            [vd-designer.components.tree :as tree-component]
            [vd-designer.pages.form.components :as form-components]
            [vd-designer.pages.form.fhir-schema :as fhir-schema]
            [vd-designer.pages.form.form.uuid-decoration :as uuid-decor]
            [vd-designer.pages.form.model :as m]
            [vd-designer.pages.form.form.nodes.nodes :as nodes]

            [vd-designer.pages.form.form.nodes.constants]
            [vd-designer.pages.form.form.nodes.where]
            [vd-designer.pages.form.form.nodes.select]
            [vd-designer.pages.form.form.nodes.column]
            [vd-designer.pages.form.form.nodes.unionall]
            [vd-designer.pages.form.form.nodes.foreach]))

(defn vd-tree [{value-path :value-path :as ctx} vd]
  [(tree-component/tree-leaf [:name]     [form-components/name-input value-path])
   (tree-component/tree-leaf [:resource] [form-components/resource-input value-path])

   (nodes/render-node (fhir-schema/add-value-path ctx :constant)
                (update (select-keys vd [:constant]) :constant (fnil identity [])))

   (nodes/render-node (fhir-schema/add-value-path ctx :where)
                (update (select-keys vd [:where]) :where (fnil identity [])))

   (nodes/render-node (fhir-schema/add-value-path ctx :select) (select-keys vd [:select]))])

;; Drag-n-Drop

(defn immovable? [node-key]
  (or (m/tree-root-keys node-key)
      (not-empty (set/intersection #{:add :path}
                                   (set node-key)))
      (= :select (peek node-key))))

(defn draggable? [node-key]
  (not (immovable? node-key)))

(defn pointless-drag? [vd path-from path-to]
  (let [path-from* (uuid-decor/uuid->idx path-from vd)
        path-to* (uuid-decor/uuid->idx path-to vd)]
    (or
      ;; element with index 0 is dragged into the head of its own parent
     (and (-> path-from* peek (= 0))
          (-> path-from* pop (= path-to*)))
      ;; element is already there
     (= (peek path-from*)
        (inc (peek path-to*))))))

(defn drop-allowed?
  ([drag-key drop-key]
   (drop-allowed? nil drag-key drop-key 0))

  ([vd drag-key drop-key drop-position]
   (and
    (not (pointless-drag? vd drag-key drop-key))
    (or (and (-> drag-key first (= :where))
             (-> drop-key first (= :where)))

        (and (-> drag-key first (= :constant))
             (-> drop-key first (= :constant)))

         ;; columns in one level
        (and (-> drag-key pop peek (= :column))
             (or (-> drop-key peek (= :column))
                 (-> drop-key pop peek (= :column))))

        (and
         (= drop-position 1)
         (-> drag-key peek #{:column :forEach :forEachOrNull :unionAll})
         (-> drop-key peek #{:column :forEach :forEachOrNull :unionAll}))

        (and
         (= drop-position 0)
         (-> drag-key peek #{:column :forEach :forEachOrNull :unionAll})
         (-> drop-key peek #{:select :unionAll}))))))

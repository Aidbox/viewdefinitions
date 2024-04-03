(ns vd-designer.pages.vd-form.form
  (:require [re-frame.core :refer [subscribe]]
            [vd-designer.components.icon :as icon]
            [vd-designer.components.input :refer [input]]
            [vd-designer.components.tag :as tag]
            [vd-designer.components.tree :refer [tree tree-item]]
            [vd-designer.pages.vd-form.components :refer [add-element-button
                                                          add-select-button
                                                          base-node-row
                                                          change-select-value
                                                          delete-button
                                                          fhir-path-input
                                                          name-input
                                                          nested-input-row
                                                          resource-input]]
            [vd-designer.pages.vd-form.fhir-schema :refer [add-value-path
                                                           create-render-context
                                                           drop-value-path
                                                           mapv-indexed]]
            [vd-designer.pages.vd-form.model :as m]))

;;;; Tree

;; Leafs

(defn- general-leaf [ctx icon name-key name value-key value deletable?]
  [nested-input-row
   [icon]
   (if (nil? name-key)
     name
     [input {:value       name
             :placeholder "name"
             :style       {:font-style "normal"}
             :onChange    #(change-select-value ctx name-key %)}])
   [fhir-path-input ctx value-key value deletable?]])

(defn constant-leaf [ctx {:keys [name valueString]}]
  [general-leaf ctx icon/constant :name name :valueString valueString true])

(defn where-leaf [ctx {:keys [path]}]
  [general-leaf ctx icon/where nil "expression" :path path true])

(defn column-leaf [ctx {:keys [name path]}]
  [general-leaf ctx icon/column :name name :path path true])

(defn foreach-expr-leaf [ctx key path]
  [general-leaf ctx icon/expression nil "expression" key path false])

;; Nodes

(declare select->node)

(defn- general-flat-node [ctx label tag items leaf deletable?]
  (let [key (str label "-" (:value-path ctx))]
    (js/console.debug (str "node " label " items: " items))
    (tree-item key
               (if deletable?
                 [base-node-row [tag] [delete-button (drop-value-path ctx)]]
                 [tag])
               (conj (mapv-indexed (fn [idx item]
                                     (let [ctx (add-value-path ctx idx)]
                                       (tree-item (:value-path ctx) (leaf ctx item)))) items)
                     (tree-item (str "add-" label "-" key)
                                [add-element-button label ctx])))))

(defn constant-node [ctx items]
  (general-flat-node ctx "constant" tag/constant items constant-leaf false))

(defn where-node [ctx items]
  (general-flat-node ctx "where" tag/where items where-leaf false))

(defn column-node [ctx items]
  (general-flat-node ctx "column" tag/column items column-leaf true))



(defn- general-nested-node [ctx label tag items deletable?]
  (let [key (str label "-" (:value-path ctx))]
    (js/console.debug (str "node " label " items: " items))
    (tree-item key
               (if deletable?
                 [base-node-row [tag] [delete-button (drop-value-path ctx)]]
                 [tag])
               (conj (mapv-indexed #(select->node (add-value-path ctx %1) %2) items)
                     (tree-item (str "add-" label "-" key) [add-select-button ctx])))))

(defn select-node [ctx items]
  (general-nested-node ctx "select" tag/select items false))

(defn union-all-node [ctx items]
  (general-nested-node ctx "union-all" tag/union-all items true))

(defn node-foreach [kind ctx path {:keys [select]}]
  (let [key (str kind "-" (:value-path ctx))
        ctx (drop-value-path ctx)]
    (js/console.debug (str kind " path " path))
    (js/console.debug (str kind " select " select))
    (tree-item key
               [base-node-row [tag/foreach kind] [delete-button ctx]]
               [(tree-item (str (:value-path ctx) "-path")
                           (foreach-expr-leaf ctx kind path))
                (select-node (add-value-path ctx :select) select)])))

(defn select->node [ctx element]
  (js/console.debug (str "select->node (ctx): " (:value-path ctx)))
  (js/console.debug (str "select->node: " element))
  (let [key (key (first element))]
    ((case key
       :column        column-node
       :forEach       (partial node-foreach :forEach)
       :forEachOrNull (partial node-foreach :forEachOrNull)
       :unionAll      union-all-node
       :select        select-node)
     (add-value-path ctx key)
     (key element)
     element)))


;;;; Form

(defn form []
  (let [vd-form @(subscribe [::m/current-vd])
        ctx (create-render-context)]
    [:div
     [tree
      :onSelect (fn [selected-keys info] (js/console.log "selected" selected-keys info))
      :defaultExpandAll true
      :treeData [(tree-item "name"     (name-input vd-form))
                 (tree-item "resource" (resource-input vd-form))

                 (constant-node (add-value-path ctx :constant) (:constant vd-form))
                 (where-node    (add-value-path ctx :where)    (:where    vd-form))
                 (select-node   (add-value-path ctx :select)   (:select   vd-form))]]]))

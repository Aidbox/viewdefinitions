(ns vd-designer.pages.vd-form.form
  (:require [antd :refer [Spin]]
            [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.components.icon :as icon]
            [vd-designer.components.input :refer [input]]
            [vd-designer.components.tag :as tag]
            [vd-designer.components.tree :refer [tree tree-leaf tree-node]]
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
                                                           drop-value-path]]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.pages.vd-form.controller :as c]))

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

(defn foreach-expr-leaf [ctx value-key path]
  [general-leaf ctx icon/expression nil "expression" value-key path false])

;; Nodes

(declare select->node)

(defn- general-flat-node [kind ctx tag items leaf deletable?]
  (let [node-key (:value-path ctx)]
    (js/console.debug (str "(node key)["   (name kind) "]: " node-key))
    (js/console.debug (str "(node items)[" (name kind) "]: " items))
    (tree-node node-key
               (if deletable?
                 [base-node-row [tag] [delete-button (drop-value-path ctx) [kind]]]
                 [tag])
               (conj (mapv (fn [item]
                             (let [ctx (add-value-path ctx (:tree/key item))]
                               (tree-leaf (:value-path ctx) (leaf ctx item))))
                           items)
                     (tree-leaf (conj node-key :add)
                                [add-element-button (name kind) ctx])))))

(defn constant-node [ctx items]
  (general-flat-node :constant ctx tag/constant items constant-leaf false))

(defn where-node [ctx items]
  (general-flat-node :where ctx tag/where items where-leaf false))

(defn column-node [ctx items]
  (general-flat-node :column ctx tag/column items column-leaf true))



(defn- general-nested-node [kind ctx tag items deletable?]
  (let [node-key (:value-path ctx)]
    (js/console.debug (str "(node key)["   (name kind) "]: " node-key))
    (js/console.debug (str "(node items)[" (name kind) "]: " items))
    (tree-node node-key
               (if deletable?
                 [base-node-row [tag] [delete-button (drop-value-path ctx) [kind]]]
                 [tag])
               (conj (mapv (fn [item]
                             (select->node (add-value-path ctx (:tree/key item)) item))
                           items)
                     (tree-leaf (conj node-key :add) [add-select-button ctx])))))

(defn select-node [ctx items]
  (general-nested-node :select ctx tag/select items false))

(defn union-all-node [ctx items]
  (general-nested-node :unionAll ctx tag/union-all items true))

(defn node-foreach [kind ctx path {:keys [select]}]
  (let [node-key (:value-path ctx)
        ctx (drop-value-path ctx)]
    (js/console.debug (str "(node key)["   (name kind) "]: " node-key))
    (js/console.debug (str "(node path)["  (name kind) "]: " path))
    (js/console.debug (str "(node items)[" (name kind) "]: " select))
    (tree-node node-key
               [base-node-row [tag/foreach kind] [delete-button ctx [kind :select]]]
               [(tree-leaf (conj (:value-path ctx) :path)
                           (foreach-expr-leaf ctx kind path))
                (select-node (add-value-path ctx :select) select)])))

(defn determine-key
  "Expects an element of normalized view definition"
  [element]
  (cond
    (->> element keys (some #{:forEach}))
    :forEach

    (->> element keys (some #{:forEachOrNull}))
    :forEachOrNull

    :else
    (first (keys element))))

(defn select->node [ctx element]
  (js/console.debug (str "{select->node}(ctx): " (:value-path ctx)))
  (js/console.debug (str "{select->node}(element): " element))
  (let [key (determine-key element)]
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
        ctx (create-render-context)
        expanded-keys @(subscribe [::m/current-tree-expanded-nodes])]
    (if vd-form
      [tree
       :onExpand #(dispatch [::c/update-tree-expanded-nodes (js->clj %)])
       :expandedKeys expanded-keys
       :treeData [(tree-leaf [:name]     (name-input vd-form))
                  (tree-leaf [:resource] (resource-input vd-form))

                  (constant-node (add-value-path ctx :constant) (:constant vd-form))
                  (where-node    (add-value-path ctx :where)    (:where    vd-form))
                  (select-node   (add-value-path ctx :select)   (:select   vd-form))]]
      [:> Spin {:size :large}])))

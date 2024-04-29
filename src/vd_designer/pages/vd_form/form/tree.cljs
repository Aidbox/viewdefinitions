(ns vd-designer.pages.vd-form.form.tree
  (:require
   [antd :refer [Flex Space]]
   [clojure.set :as set]
   [clojure.string :as str]
   [re-frame.core :refer [dispatch subscribe]]
   [vd-designer.components.icon :as icon]
   [vd-designer.components.input :refer [input]]
   [vd-designer.components.tree :refer [tree-leaf tree-node]]
   [vd-designer.pages.vd-form.components :refer [add-element-button
                                                 add-select-button
                                                 base-input-row base-node-row
                                                 change-input-value
                                                 delete-button fhir-path-input
                                                 name-input resource-input
                                                 tree-tag]]
   [vd-designer.pages.vd-form.controller :as form-controller]
   [vd-designer.pages.vd-form.fhir-schema :refer [add-value-path
                                                  drop-value-path
                                                  get-constant-type]]
   [vd-designer.pages.vd-form.form.settings :refer [column-settings
                                                    constant-settings
                                                    where-settings]]
   [vd-designer.pages.vd-form.form.uuid-decoration :as uuid-decor]
   [vd-designer.pages.vd-form.model :as m]
   [vd-designer.utils.event :as u]))

;; Leafs

(defn- general-leaf [ctx props]
  (let [{:keys [icon name-key name value-key value deletable? settings-form placeholder input-type]}
        props]
    [base-input-row ctx
     [:> Flex {:gap   8
               :align :center
               :style {:width "100%"}}
      [icon]
      (if (nil? name-key)
        name
        (let [errors? @(subscribe [::m/empty-inputs?])]
          [input {:value       name
                  :placeholder "name"
                  :classNames {:input
                               (if (and (str/blank? name) errors?)
                                 "default-input red-input"
                                 "default-input")}
                  :style       {:font-style "normal"}
                  :onMouseEnter #(dispatch [::form-controller/change-draggable-node false])
                  :onMouseLeave #(dispatch [::form-controller/change-draggable-node true])
                  :onChange    #(change-input-value ctx name-key (u/target-value %))}]))]
     [fhir-path-input ctx value-key value deletable? settings-form placeholder input-type]]))

(defn column-leaf [ctx {:keys [name path]}]
  [general-leaf ctx
   {:icon          icon/column
    :name-key      :name
    :name          name
    :value-key     :path
    :value         path
    :settings-form column-settings
    :deletable?    true}])

(defn constant-type->input-type [constant-type]
  (case constant-type
    (:valueDecimal
     :valueInteger
     :valueInteger64
     :valuePositiveInt
     :valueUnsignedInt) :number

    :valueBoolean        :boolean
    :text))

(defn constant-leaf [ctx {:keys [name] :as item}]
  (let [current-type (keyword (get-constant-type item))]
    [general-leaf ctx
     {:icon          icon/constant
      :name-key      :name
      :name          name
      :value-key     current-type
      :value         (current-type item)
      :placeholder   "constant"
      :settings-form constant-settings
      :input-type    (constant-type->input-type current-type)
      :deletable?    true}]))

(defn where-leaf [ctx {:keys [path]}]
  [general-leaf ctx
   {:icon          icon/where
    :name          "expression"
    :value-key     :path
    :value         path
    :settings-form where-settings
    :deletable?    true}])

(defn foreach-expr-leaf [ctx value-key path]
  [general-leaf ctx
   {:icon          icon/expression
    :name          "expression"
    :value-key     value-key
    :value         path
    :deletable?    false}])

;; Nodes

(declare select->node)

(defn- node-deletable? [kind]
  (case kind
    :select        false
    :column        true
    :unionAll      true
    :forEach       true
    :forEachOrNull true
    :constant      false
    :where         false))

(defn render-column-names [node-key]
  (let [expanded-nodes @(subscribe [::m/current-tree-expanded-nodes])
        column-closed? (not (expanded-nodes node-key))
        column-names (when column-closed? (mapv :name @(subscribe [::m/children node-key])))]
    [:span.cut-text (str/join ", " column-names)]))

(defn- general-node [kind ctx render-children]
  (let [node-key (:value-path ctx)
        tag      (tree-tag kind)
        column? (= :column kind)]
    (tree-node node-key
               (cond-> [base-node-row node-key
                        [:> Space {:align :center :style {:height "30px"}}
                         tag
                         (when column?
                           [render-column-names node-key])]]
                 (node-deletable? kind) (conj [delete-button (drop-value-path ctx)]))
               (render-children node-key))))

(defn- flat-node [kind generate-leaf ctx items]
  (general-node kind ctx
                (fn [node-key]
                  (conj (mapv (fn [item]
                                (let [ctx (add-value-path ctx (:tree/key item))]
                                  (tree-leaf (:value-path ctx) (generate-leaf ctx item))))
                              items)
                        (tree-leaf (conj node-key :add)
                                   [add-element-button (name kind) ctx])))))

(defn- nested-node [kind ctx items]
  (general-node kind ctx
                (fn [node-key]
                  (conj (mapv (fn [item]
                                (select->node (add-value-path ctx (:tree/key item)) item))
                              items)
                        (tree-leaf (conj node-key :add) [add-select-button ctx])))))

  ;; TODO: try to generalize as other node types
(defn node-foreach [kind ctx path {:keys [select]}]
  (general-node kind ctx
                (fn [_node-key]
                  (let [ctx (drop-value-path ctx)]
                    [(tree-leaf (conj (:value-path ctx) :path)
                                (foreach-expr-leaf ctx kind path))
                     (nested-node :select (add-value-path ctx :select) select)]))))

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

(defn- select->node [ctx element]
  (js/console.debug (str "{select->node}(ctx): " (:value-path ctx)))
  (js/console.debug (str "{select->node}(element): " element))
  (let [key (determine-key element)]
    ((case key
       :column        (partial flat-node    :column column-leaf)
       :forEach       (partial node-foreach :forEach)
       :forEachOrNull (partial node-foreach :forEachOrNull)
       :unionAll      (partial nested-node  :unionAll)
       :select        (partial nested-node  :select))
     (add-value-path ctx key)
     (key element)
     element)))


(defn vd-tree [ctx vd]
  [(tree-leaf [:name]     (name-input     ctx vd))
   (tree-leaf [:resource] (resource-input ctx vd))

   (flat-node   :constant constant-leaf
                (add-value-path ctx :constant) (:constant vd))
   (flat-node   :where    where-leaf
                (add-value-path ctx :where)    (:where    vd))
   (nested-node :select
                (add-value-path ctx :select)   (:select   vd))])

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

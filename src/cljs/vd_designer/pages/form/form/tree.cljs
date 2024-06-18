(ns vd-designer.pages.form.form.tree
  (:require [antd :refer [Flex Space]]
            [clojure.set :as set]
            [clojure.string :as str]
            [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.components.icon :as icon]
            [vd-designer.components.input :refer [input]]
            [vd-designer.components.tree :refer [tree-leaf tree-node]]
            [vd-designer.pages.form.components :refer [add-element-button
                                                       add-select-button
                                                       add-vd-item
                                                       base-input-row
                                                       base-node-row
                                                       change-input-value
                                                       convert-foreach
                                                       delete-button
                                                       name-input render-input
                                                       resource-input tree-tag]]
            [vd-designer.pages.form.controller :as form-controller]
            [vd-designer.pages.form.fhir-schema :refer [add-fhirpath
                                                        add-value-path
                                                        drop-value-path
                                                        get-constant-type]]
            [vd-designer.pages.form.form.settings :refer [column-settings
                                                          constant-settings
                                                          where-settings]]
            [vd-designer.pages.form.form.uuid-decoration :as uuid-decor]
            [vd-designer.pages.form.model :as m]
            [vd-designer.utils.event :as u]))

;; Leafs

(defn- general-leaf [{value-path :value-path :as ctx}
                     {:keys [icon name-key name value-key value input-type deletable? settings-form placeholder on-shift-enter] :as props}]
  (let [node-focus-id @(subscribe [::m/node-focus])]
    [base-input-row value-path
     [:> Flex {:gap   8
               :align :center
               :style {:width "100%"}}
      [icon]
      (if (nil? name-key)
        name
        (let [errors? @(subscribe [::m/empty-inputs?])]
          [input {:defaultValue name
                  :autoFocus    (= node-focus-id (last value-path))
                  :onBlur       (fn [e]
                                  (mapv
                                   (fn [one]
                                     (.setAttribute one "draggable" true))
                                   (array-seq (.querySelectorAll js/document ".ant-tree-treenode-draggable")))
                                  (change-input-value value-path name-key (u/target-value e))
                                  (dispatch [::form-controller/set-focus-node nil]))
                  :onFocus      (fn [_]
                                  (mapv
                                   (fn [one]
                                     (.setAttribute one "draggable" false))
                                   (array-seq (.querySelectorAll js/document ".ant-tree-treenode-draggable"))))
                  :onKeyDown    (fn [event]
                                  (when (and (= "Enter" (.-key event))
                                             (.-shiftKey event))
                                    (on-shift-enter event)))
                  :placeholder  "name"
                  :classNames   {:input (if (and (str/blank? name) errors?)
                                          "default-input red-input"
                                          "default-input")}
                  :style        {:font-style "normal"}}]))]
     [render-input ctx input-type placeholder value-key value deletable? settings-form props]]))

(defn column-leaf [{value-path :value-path :as ctx} {:keys [name path]} & {:keys [on-shift-enter] :as opts}]
  (let [node-focus-id @(subscribe [::m/node-focus])]
    [base-input-row value-path
     [:> Flex {:gap   8
               :align :center
               :style {:width "100%"}}
      [icon/column]
      (let [errors? @(subscribe [::m/empty-inputs?])]
        [input {:defaultValue name
                :placeholder "name"
                :value name
                :autoFocus (= node-focus-id (last value-path))
                :onBlur #(do
                           (mapv
                            (fn [one]
                              (.setAttribute one "draggable" true))
                            (array-seq (.querySelectorAll js/document ".ant-tree-treenode-draggable")))
                           (dispatch [::form-controller/set-focus-node nil])
                           (dispatch [::form-controller/eval-view-definition-data]))
                :onFocus
                (fn [_]
                  (mapv
                   (fn [one]
                     (.setAttribute one "draggable" false))
                   (array-seq (.querySelectorAll js/document ".ant-tree-treenode-draggable"))))

                :classNames {:input
                             (if (and (str/blank? name) errors?)
                               "default-input red-input"
                               "default-input")}
                :style       {:font-style "normal"}
                :onKeyDown (fn [event]
                             (when (and (= "Enter" (.-key event))
                                        (.-shiftKey event))
                               (on-shift-enter event)))
                :onChange    #(change-input-value value-path :name (u/target-value %))}])]
     [render-input ctx :fhirpath "path" :path path true column-settings opts]]))

(defn- constant-type->input-type [constant-type]
  (case constant-type
    (:valueDecimal
     :valueInteger
     :valueInteger64
     :valuePositiveInt
     :valueUnsignedInt) :number

    :valueBoolean       :boolean
    :text))

(defn constant-leaf [ctx {:keys [name] :as item} & {:as opts}]
  (let [current-type (keyword (get-constant-type item))]
    [general-leaf ctx
     (merge
      {:icon          icon/constant
       :name-key      :name
       :name          name
       :value-key     current-type
       :value         (get item current-type "")
       :placeholder   "constant"
       :settings-form constant-settings
       :input-type    (constant-type->input-type current-type)
       :deletable?    true}
      opts)]))

(defn where-leaf [ctx {:keys [path]} & {:as opts}]
  (let [node-focus-id @(subscribe [::m/node-focus])
        input-opts (assoc opts :autoFocus (= node-focus-id (last (:value-path ctx))))]
    [:> Flex {:gap   8
              :align :center
              :style {:width "100%"}}
     [icon/where]
     [render-input ctx :fhirpath "expression" :path path true where-settings input-opts]]))

(defn foreach-expr-leaf [ctx value-key path & {:as opts}]
  [:> Flex {:gap   8
            :align :center
            :style {:width "100%"}}
   [icon/expression]
   [render-input ctx :fhirpath "expression" value-key path false nil opts]])

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
        ;; somehow this caused page crash
        column-closed? (when (set? expanded-nodes) (not (expanded-nodes node-key)))
        column-names (when column-closed? (mapv :name @(subscribe [::m/children node-key])))]
    [:span.cut-text (str/join ", " column-names)]))

(defn- general-node [kind {value-path :value-path} render-children]
  (tree-node value-path
             (cond-> [base-node-row value-path
                      [:> Space {:align :center :style {:height "30px"}}
                       [tree-tag kind]
                       (when (= :column kind)
                         [render-column-names value-path])]]

               (or (= :forEach       kind)
                   (= :forEachOrNull kind))
               (conj [convert-foreach value-path kind])

               (node-deletable? kind)
               (conj [delete-button (pop value-path)]))
             (render-children value-path)))

(defn- flat-node [kind generate-leaf {value-path :value-path :as ctx} items]
  (let [add-new (fn [_] (add-vd-item value-path kind true))]
    (general-node kind ctx
                  (fn [node-key]
                    (conj (mapv (fn [item]
                                  (let [ctx (add-value-path ctx (:tree/key item))]
                                    (tree-leaf (:value-path ctx)
                                               [generate-leaf ctx item {:on-shift-enter add-new}])))
                                items)
                          (tree-leaf (conj node-key :add)
                                     [add-element-button (name kind) value-path]))))))

(defn- nested-node [kind {value-path :value-path :as ctx} items]
  (general-node kind ctx
                (fn [node-key]
                  (conj (mapv (fn [item]
                                (select->node (add-value-path ctx (:tree/key item)) item))
                              items)
                        (tree-leaf (conj node-key :add) [add-select-button value-path])))))

;; TODO: try to generalize as other node types
(defn node-foreach [kind ctx path {:keys [select]}]
  (let [node-focus-id @(subscribe [::m/node-focus])]
    (general-node kind ctx
                  (fn [_node-key]
                    (let [{value-path :value-path :as ctx} (drop-value-path ctx)]
                      [(tree-leaf (conj value-path :path)
                                  [foreach-expr-leaf ctx kind path
                                   {:autoFocus (= node-focus-id (last value-path))}])
                       (nested-node :select
                                    (-> (add-value-path ctx :select)
                                        (add-fhirpath path))
                                    select)])))))

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
  (let [key (determine-key element)
        element-part (key element)
        ctx (add-value-path ctx key)]
    (case key
      :column (flat-node :column column-leaf ctx element-part)

      :forEach (node-foreach :forEach ctx element-part element)

      :forEachOrNull (node-foreach :forEachOrNull ctx element-part element)

      :unionAll (nested-node :unionAll ctx element-part)

      :select (nested-node :select ctx element-part))))

(defn vd-tree [{value-path :value-path :as ctx} vd]
  [(tree-leaf [:name]     [name-input value-path])
   (tree-leaf [:resource] [resource-input value-path])

   (flat-node :constant constant-leaf (add-value-path ctx :constant) (:constant vd))
   (flat-node :where where-leaf (add-value-path ctx :where) (:where vd))
   (nested-node :select (add-value-path ctx :select) (:select vd))])

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

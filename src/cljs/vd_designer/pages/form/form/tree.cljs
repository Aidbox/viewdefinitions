(ns vd-designer.pages.form.form.tree
  (:require [antd :refer [Flex Space]]
            [clojure.set :as set]
            [clojure.string :as str]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.components.icon :as icon]
            [vd-designer.components.input :as input-component]
            [vd-designer.components.tree :as tree-component]
            [vd-designer.pages.form.components :as form-components]
            [vd-designer.pages.form.controller :as form-controller]
            [vd-designer.pages.form.fhir-schema :as fhir-schema]
            [vd-designer.pages.form.form.settings :as form-settings]
            [vd-designer.pages.form.form.uuid-decoration :as uuid-decor]
            [vd-designer.pages.form.model :as m]
            [vd-designer.utils.event :as u]))

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

;; Leafs

(defmulti render-node (fn [_ node] (determine-key node)))

(defn render-column-names [node-key]
  (let [expanded-nodes @(subscribe [::m/current-tree-expanded-nodes])
        ;; somehow this caused page crash
        column-closed? (when (set? expanded-nodes) (not (expanded-nodes node-key)))
        column-names (when column-closed? (mapv :name @(subscribe [::m/children node-key])))]
    [:span.cut-text (str/join ", " column-names)]))

(defn column-row [{:keys [value-path] :as ctx} {:keys [name path]}]
  (let [node-focus-id @(subscribe [::m/node-focus])]
    [:> Flex {:gap   8
              :align :center
              :style {:width "100%"}}
     [icon/column]
     [form-components/column-name-input {:input-id name
                                         :autoFocus (= node-focus-id (last value-path))
                                         :placeholder "name"}]
     [form-components/render-input {:input-id path
                                    :name-input-id name
                                    :autoFocus (= node-focus-id (last value-path))
                                    :placeholder "fhirpath"
                                    :fhirpath-prefix (:fhirpath-ctx ctx)}]
     [form-components/settings-popover value-path
      {:placement :right
       :content   (r/as-element [form-settings/column-settings value-path])}]
     [form-components/delete-button value-path]]))

(defn render-column-rows [{:keys [value-path] :as ctx} column-rows]
  (let [add-new (fn [_] (form-components/add-vd-item value-path :column true))]
    (mapv
     (fn [item]
       (let [ctx (fhir-schema/add-value-path ctx (:tree/key item))]
         (tree-component/tree-leaf (:value-path ctx)
                                   [column-row ctx item {:on-shift-enter add-new}])))
     column-rows)))

(defmethod render-node :column
  [{:keys [value-path] :as ctx} {column-rows :column}]
  (tree-component/tree-node
   value-path
   [form-components/title-node-row
    {:id value-path
     :start [[form-components/tree-tag :column]
             [render-column-names value-path]]
     :end [[form-components/delete-button (pop value-path)]]}]
   #_[base-node-row value-path
      [:> Space {:align :center :style {:height "30px"}}
       [tree-tag :column]
       [render-column-names value-path]]
      [delete-button (pop value-path)]]
   (conj
    (render-column-rows ctx column-rows)
    (tree-component/tree-leaf (conj value-path :add)
                              [form-components/add-element-button "column" value-path]))))

(defn foreach-expr-leaf [{:keys [value-path]} path]
  (let [node-focus-id @(subscribe [::m/node-focus])]
    [:> Flex {:gap   8
              :align :center
              :style {:width "100%"}}
     [icon/expression]
     [form-components/render-input
      {:input-id path
       :placeholder "expression"
       :autoFocus (= node-focus-id (last value-path))}]]))

(defmethod render-node :forEach
  [{:keys [value-path] :as ctx} {path :forEach :as node}]
  (tree-component/tree-node value-path
                            [form-components/title-node-row
                             {:id value-path
                              :start-children [[form-components/tree-tag :forEach]]
                              :end-children [[form-components/convert-foreach value-path :forEach]
                                             [form-components/delete-button (pop value-path)]]}]
                            (let [{value-path :value-path :as ctx} (fhir-schema/drop-value-path ctx)]
                              [(tree-component/tree-leaf (conj value-path :path)
                                                         [foreach-expr-leaf ctx path])
                               (render-node (-> (fhir-schema/add-value-path ctx :select)
                                                (fhir-schema/add-fhirpath path))
                                            (select-keys node [:select]))])))

(defn render-inner-nodes [ctx nodes]
  (mapv
   (fn [node]
     (render-node (fhir-schema/add-value-path ctx (:tree/key node)) node))
   nodes))

(defn render-add-select-button [{:keys [value-path]}]
  (tree-component/tree-leaf (conj value-path :add)
                            [form-components/add-select-button value-path]))

(defmethod render-node :select
  [{:keys [value-path] :as ctx} {inner-nodes :select}]
  (tree-component/tree-node value-path
                            [form-components/base-node-row value-path
                             [form-components/tree-tag :select]]
                            (conj
                             (render-inner-nodes ctx inner-nodes)
                             (render-add-select-button ctx))))

(defmethod render-node :unionAll
  [{:keys [value-path] :as ctx} {inner-nodes :select}]
  (tree-component/tree-node value-path
                            [form-components/base-node-row value-path
                             [form-components/tree-tag :unionAll]
                             [form-components/delete-button (pop value-path)]]
                            (conj
                             (render-inner-nodes ctx inner-nodes)
                             (render-add-select-button ctx))))

(defn- general-leaf [{value-path :value-path :as ctx}
                     {:keys [icon name-key name value-key value deletable? settings-form placeholder on-shift-enter] :as props}]
  (let [node-focus-id @(subscribe [::m/node-focus])]
    [form-components/base-input-row value-path
     [:> Flex {:gap   8
               :align :center
               :style {:width "100%"}}
      [icon]
      (if (nil? name-key)
        name
        (let [errors? @(subscribe [::m/empty-inputs?])]
          [input-component/input {:defaultValue name
                                  :autoFocus (= node-focus-id (last value-path))
                                  :onBlur (fn [e]
                                            (mapv
                                             (fn [one]
                                               (.setAttribute one "draggable" true))
                                             (array-seq (.querySelectorAll js/document ".ant-tree-treenode-draggable")))
                                            (form-components/change-input-value value-path name-key (u/target-value e))
                                            (dispatch [::form-controller/set-focus-node nil]))
                                  :onFocus
                                  (fn [_]
                                    (mapv
                                     (fn [one]
                                       (.setAttribute one "draggable" false))
                                     (array-seq (.querySelectorAll js/document ".ant-tree-treenode-draggable"))))
                                  :onKeyDown (fn [event]
                                               (when (and (= "Enter" (.-key event))
                                                          (.-shiftKey event))
                                                 (on-shift-enter event)))
                                  :placeholder "name"
                                  :classNames {:input
                                               (if (and (str/blank? name) errors?)
                                                 "default-input red-input"
                                                 "default-input")}
                                  :style       {:font-style "normal"}}]))]
     [form-components/text-input ctx value-key value deletable? settings-form placeholder props]]))

(defn constant-type->input-type [constant-type]
  (case constant-type
    (:valueDecimal
     :valueInteger
     :valueInteger64
     :valuePositiveInt
     :valueUnsignedInt) :number

    :valueBoolean        :boolean
    :text))

(defn constant-leaf [ctx {:keys [name] :as item} & {:as opts}]
  (let [current-type (keyword (fhir-schema/get-constant-type item))]
    [general-leaf ctx
     (merge
      {:icon          icon/constant
       :name-key      :name
       :name          name
       :value-key     current-type
       :value         (get item current-type "")
       :placeholder   "constant"
       :settings-form form-settings/constant-settings
       :input-type    (constant-type->input-type current-type)
       :deletable?    true}
      opts)]))

(defn where-leaf [ctx {:keys [path]} & {:as opts}]
  (let [node-focus-id @(subscribe [::m/node-focus])]
    [:> Flex {:gap   8
              :align :center
              :style {:width "100%"}}
     [icon/where]
     [form-components/fhir-path-input
      ctx
      :path
      path
      true
      form-settings/where-settings
      "expression"
      (assoc opts :autoFocus (= node-focus-id (last (:value-path ctx))))]]))

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

(defn- general-node [kind {value-path :value-path} render-children]
  (tree-component/tree-node
   value-path
   (cond-> [form-components/base-node-row value-path
            [:> Space {:align :center :style {:height "30px"}}
             [form-components/tree-tag kind]
             (when (= :column kind)
               [render-column-names value-path])]]

     (or (= :forEach       kind)
         (= :forEachOrNull kind))
     (conj [form-components/convert-foreach value-path kind])

     (node-deletable? kind)
     (conj [form-components/delete-button (pop value-path)]))
   (render-children value-path)))

(defn- flat-node [kind generate-leaf {value-path :value-path :as ctx} items]
  (let [add-new (fn [_] (form-components/add-vd-item value-path kind true))]
    (general-node kind ctx
                  (fn [node-key]
                    (conj (mapv (fn [item]
                                  (let [ctx (fhir-schema/add-value-path ctx (:tree/key item))]
                                    (tree-component/tree-leaf (:value-path ctx)
                                                              [generate-leaf ctx item {:on-shift-enter add-new}])))
                                items)
                          (tree-component/tree-leaf (conj node-key :add)
                                                    [form-components/add-element-button (name kind) value-path]))))))

(defn- nested-node [kind {value-path :value-path :as ctx} items]
  (general-node kind ctx
                (fn [node-key]
                  (conj (mapv (fn [item]
                                (select->node (fhir-schema/add-value-path ctx (:tree/key item)) item))
                              items)
                        (tree-component/tree-leaf (conj node-key :add) [form-components/add-select-button value-path])))))

;; TODO: try to generalize as other node types
(defn node-foreach [kind ctx path {:keys [select]}]
  (println 'node-foreach path)
  (let [node-focus-id @(subscribe [::m/node-focus])]
    (general-node kind ctx
                  (fn [_node-key]
                    (let [{value-path :value-path :as ctx} (fhir-schema/drop-value-path ctx)]
                      [(tree-component/tree-leaf (conj value-path :path)
                                                 [foreach-expr-leaf ctx kind path
                                                  {:autoFocus (= node-focus-id (last value-path))}])
                       (nested-node :select
                                    (-> (fhir-schema/add-value-path ctx :select)
                                        (fhir-schema/add-fhirpath path))
                                    select)])))))

(defn- select->node [ctx element]
  (let [key (determine-key element)
        element-part (key element)
        ctx (fhir-schema/add-value-path ctx key)]
    (println 'sele element-part)
    (case key
      :column (flat-node :column column-row ctx element-part)

      :forEach (node-foreach :forEach ctx element-part element)

      :forEachOrNull (node-foreach :forEachOrNull ctx element-part element)

      :unionAll (nested-node :unionAll ctx element-part)

      :select (nested-node :select ctx element-part))))

(defn vd-tree [{value-path :value-path :as ctx} vd]
  (println 'vd vd)
  [(tree-component/tree-leaf [:name]     [form-components/name-input value-path])
   (tree-component/tree-leaf [:resource] [form-components/resource-input value-path])

   (flat-node :constant constant-leaf (fhir-schema/add-value-path ctx :constant) (:constant vd))
   (flat-node :where where-leaf (fhir-schema/add-value-path ctx :where) (:where vd))
   (render-node (fhir-schema/add-value-path ctx :select) (select-keys vd [:select]))])

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

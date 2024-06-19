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

(defn get-column-names [node-path]
  (let [columns @(subscribe [::m/children node-path])
        tree-inputs @(subscribe [::m/tree-inputs])
        column-refs (mapv :name columns)]
    (->> column-refs
         (mapv #(get tree-inputs %))
         (mapv :value))))

(defn render-column-names [node-path]
  (let [expanded-nodes @(subscribe [::m/current-tree-expanded-nodes])
        ;; somehow this caused page crash
        column-closed? (when (set? expanded-nodes) (not (expanded-nodes node-path)))
        column-names (when column-closed? (get-column-names (conj node-path :column)))]
    [:span.cut-text (str/join ", " column-names)]))

(defn column-row [{:keys [value-path] :as ctx} {:keys [name path]} & {:keys [on-shift-enter]}]
  (let [node-focus-id @(subscribe [::m/node-focus])]
    [:> Flex {:gap   8
              :align :center
              :style {:width "100%"
                      :padding-right 16}}
     [icon/column]
     [form-components/column-name-input {:input-id name
                                         :autoFocus (= node-focus-id (last value-path))
                                         :placeholder "name"
                                         :handlers {:on-shift-enter on-shift-enter}}]
     [form-components/render-input {:input-id path
                                    :name-input-id name
                                    :autoFocus (= node-focus-id (last value-path))
                                    :placeholder "path"
                                    :fhirpath-prefix (:fhirpath-ctx ctx)
                                    :handlers {:on-shift-enter on-shift-enter}}]
     [form-components/settings-popover value-path
      {:placement :right
       :content   (r/as-element [form-settings/column-settings value-path])}]
     [form-components/delete-button value-path]]))

;; TODO: use this
(defn- constant-type->input-type [constant-type]
  (case constant-type
    (:valueDecimal
     :valueInteger
     :valueInteger64
     :valuePositiveInt
     :valueUnsignedInt) :number

    :valueBoolean       :boolean
    :text))

(defn constant-row [{:keys [value-path]} {:keys [name] :as item}]
  (let [node-focus-id @(subscribe [::m/node-focus])
        constant-type (fhir-schema/get-constant-type item)]
    [:> Flex {:gap   8
              :align :center
              :style {:width "100%"
                      :padding-right 16}}
     [icon/constant]
     [form-components/string-input {:input-id name
                                    :autoFocus (= node-focus-id (last value-path))
                                    :placeholder "name"}]
     [form-components/render-input {:input-id  (get item constant-type)
                                    :placeholder "constant"}]
     [form-components/settings-popover value-path
      {:placement :right
       :content   (r/as-element [form-settings/constant-settings value-path])}]
     [form-components/delete-button value-path]]))

(defn where-row [{:keys [value-path]} {:keys [path]}]
  (let [node-focus-id @(subscribe [::m/node-focus])]
    [:> Flex {:gap   8
              :align :center
              :style {:width "100%"
                      :padding-right 10}}
     [icon/where]
     [form-components/render-input {:input-id path
                                    :autoFocus (= node-focus-id (last value-path))
                                    :placeholder "path"}]
     [form-components/settings-popover value-path
      {:placement :right
       :content   (r/as-element [form-settings/where-settings value-path])}]
     [form-components/delete-button value-path]]))

(defn render-column-rows [ctx column-rows]
  (let [ctx (fhir-schema/add-value-path ctx :column)
        add-new (fn [_] (form-components/add-vd-leaf (:value-path ctx) :column))]
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
     :end [[form-components/delete-button value-path]]}]
   (conj
    (render-column-rows ctx column-rows)
    (tree-component/tree-leaf
     (conj value-path :add)
     [form-components/add-element-button
      (conj value-path :column)
      :column]))))

(defmethod render-node :constant
  [{:keys [value-path] :as ctx} {constant-rows :constant}]
  (tree-component/tree-node
   value-path
   [form-components/title-node-row
    {:id value-path
     :start [[form-components/tree-tag :constant]]}]
   (conj
    (mapv
      (fn [item]
        (let [ctx (fhir-schema/add-value-path ctx (:tree/key item))]
          (tree-component/tree-leaf (:value-path ctx)
                                    [constant-row ctx item])))
      constant-rows)
    (tree-component/tree-leaf
     (conj value-path :add)
     [form-components/add-element-button
      value-path
      :constant]))))

(defmethod render-node :where
  [{:keys [value-path] :as ctx} {where-rows :where}]
  (tree-component/tree-node
   value-path
   [form-components/title-node-row
    {:id value-path
     :start [[form-components/tree-tag :where]]
     :end []}]
   (conj
    (mapv
      (fn [item]
        (let [ctx (fhir-schema/add-value-path ctx (:tree/key item))]
          (tree-component/tree-leaf (:value-path ctx)
                                    [where-row ctx item])))
      where-rows)
    (tree-component/tree-leaf
     (conj value-path :add)
     [form-components/add-element-button
      value-path
      :where]))))

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
                              :start [[form-components/tree-tag :forEach]]
                              :end [[form-components/convert-foreach value-path :forEach]
                                    [form-components/delete-button value-path]]}]
                            (let [{value-path :value-path :as ctx} (fhir-schema/drop-value-path ctx)]
                              [(tree-component/tree-leaf (conj value-path :path)
                                                         [foreach-expr-leaf ctx path])
                               (render-node (-> ctx
                                                (fhir-schema/add-value-path (:tree/key node))
                                                (fhir-schema/add-value-path :select)
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
  [ctx {inner-nodes :unionAll}]
  (let [{:keys [value-path] :as ctx} (fhir-schema/add-value-path ctx :unionAll)]
    (tree-component/tree-node value-path
                              [form-components/base-node-row value-path
                               [form-components/tree-tag :unionAll]
                               [form-components/delete-button value-path]]
                              (conj
                               (render-inner-nodes ctx inner-nodes)
                               (render-add-select-button ctx)))))

(defn vd-tree [{value-path :value-path :as ctx} vd]
  [(tree-component/tree-leaf [:name]     [form-components/name-input value-path])
   (tree-component/tree-leaf [:resource] [form-components/resource-input value-path])

   (render-node (fhir-schema/add-value-path ctx :constant)
                (update (select-keys vd [:constant]) :constant (fnil identity [])))

   (render-node (fhir-schema/add-value-path ctx :where)
                (update (select-keys vd [:where]) :where (fnil identity [])))
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

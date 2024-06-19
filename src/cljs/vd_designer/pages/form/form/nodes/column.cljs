(ns vd-designer.pages.form.form.nodes.column
  (:require [antd :refer [Flex]]
            [re-frame.core :refer [subscribe]]
            [vd-designer.components.icon :as icon]
            [vd-designer.components.tree :as tree-component]
            [reagent.core :as r]
            [clojure.string :as str]
            [vd-designer.pages.form.components :as form-components]
            [vd-designer.pages.form.fhir-schema :as fhir-schema]
            [vd-designer.pages.form.model :as m]
            [vd-designer.pages.form.form.settings :as form-settings]
            [vd-designer.pages.form.form.nodes.nodes :as nodes]))

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

(defn render-column-rows [ctx column-rows]
  (let [ctx (fhir-schema/add-value-path ctx :column)
        add-new (fn [_] (form-components/add-vd-leaf (:value-path ctx) :column))]
    (mapv
     (fn [item]
       (let [ctx (fhir-schema/add-value-path ctx (:tree/key item))]
         (tree-component/tree-leaf (:value-path ctx)
                                   [column-row ctx item {:on-shift-enter add-new}])))
     column-rows)))

(defmethod nodes/render-node :column
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



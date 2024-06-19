(ns vd-designer.pages.form.form.nodes.where
  (:require [antd :refer [Flex]]
            [re-frame.core :refer [subscribe]]
            [vd-designer.components.icon :as icon]
            [vd-designer.components.tree :as tree-component]
            [vd-designer.pages.form.components :as form-components]
            [vd-designer.pages.form.fhir-schema :as fhir-schema]
            [vd-designer.pages.form.model :as m]
            [reagent.core :as r]
            [vd-designer.pages.form.form.settings :as form-settings]
            [vd-designer.pages.form.form.nodes.nodes :as nodes]))


(defn where-row [{:keys [value-path]} {:keys [path]} {:keys [on-shift-enter]}]
  (let [node-focus-id @(subscribe [::m/node-focus])]
    [:> Flex {:gap   8
              :align :center
              :style {:width "100%"
                      :padding-right 10}}
     [icon/where]
     [form-components/render-input {:input-id path
                                    :autoFocus (= node-focus-id (last value-path))
                                    :placeholder "expression"
                                    :handlers {:on-shift-enter on-shift-enter}}]
     [form-components/settings-popover value-path
      {:placement :right
       :content   (r/as-element [form-settings/where-settings value-path])}]
     [form-components/delete-button value-path]]))

(defn render-where-rows [{:keys [value-path] :as ctx} where-rows]
  (mapv
   (fn [item]
     (let [ctx* (fhir-schema/add-value-path ctx (:tree/key item))]
       (tree-component/tree-leaf
        (:value-path ctx*)
        [where-row ctx* item {:on-shift-enter
                              #(form-components/add-vd-leaf value-path :where)}])))
   where-rows))

(defmethod nodes/render-node :where
  [{:keys [value-path] :as ctx} {where-rows :where}]
  (tree-component/tree-node
   value-path
   [form-components/title-node-row
    {:id    value-path
     :start [[form-components/tree-tag :where]]
     :end   []}]
   (conj
     (render-where-rows ctx where-rows)
     (tree-component/tree-leaf
       (conj value-path :add)
       [form-components/add-element-button
        value-path
        :where]))))



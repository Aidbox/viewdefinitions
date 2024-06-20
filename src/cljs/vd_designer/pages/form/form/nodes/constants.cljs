(ns vd-designer.pages.form.form.nodes.constants
  (:require [antd :refer [Flex]]
            [reagent.core :as r]
            [vd-designer.components.icon :as icon]
            [vd-designer.components.tree :as tree-component]
            [vd-designer.pages.form.components :as form-components]
            [vd-designer.pages.form.fhir-schema :as fhir-schema]
            [vd-designer.pages.form.form.settings :as form-settings]
            [vd-designer.pages.form.form.nodes.nodes :as nodes]))

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

(defn constant-row [{:keys [value-path]} {:keys [name] :as item} {:keys [on-shift-enter]}]
  (let [constant-type (fhir-schema/get-constant-type item)]
    [:> Flex {:gap   8
              :align :center
              :style {:width "100%"
                      :padding-right 16}}
     [icon/constant]
     [form-components/render-input {:input-id name
                                    :handlers {:on-shift-enter on-shift-enter}
                                    :placeholder "name"}]
     [form-components/render-input {:input-id  (get item constant-type)
                                    :placeholder "constant"
                                    :handlers {:on-shift-enter on-shift-enter}}]
     [form-components/settings-popover value-path
      {:placement :right
       :content   (r/as-element [form-settings/constant-settings value-path])}]
     [form-components/delete-button value-path]]))

(defn render-constant-rows [{:keys [value-path] :as ctx} constant-rows]
  (mapv
    (fn [item]
      (let [ctx* (fhir-schema/add-value-path ctx (:tree/key item))]
        (tree-component/tree-leaf
          (:value-path ctx*)
          [constant-row ctx* item
           {:on-shift-enter
            #(form-components/add-vd-leaf value-path :constant)}])))
    constant-rows))

(defmethod nodes/render-node :constant
  [{:keys [value-path] :as ctx} {constant-rows :constant}]
  (tree-component/tree-node
   value-path
   [form-components/title-node-row
    {:id value-path
     :start [[form-components/tree-tag :constant]]}]
   (conj
     (render-constant-rows ctx constant-rows)
     (tree-component/tree-leaf
       (conj value-path :add)
       [form-components/add-element-button
        value-path
        :constant]))))

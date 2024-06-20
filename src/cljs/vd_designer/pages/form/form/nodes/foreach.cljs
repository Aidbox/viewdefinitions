(ns vd-designer.pages.form.form.nodes.foreach
  (:require [antd :refer [Flex]]
            [re-frame.core :refer [subscribe]]
            [vd-designer.components.icon :as icon]
            [vd-designer.components.tree :as tree-component]
            [vd-designer.pages.form.components :as form-components]
            [vd-designer.pages.form.fhir-schema :as fhir-schema]
            [vd-designer.pages.form.model :as m]
            [vd-designer.pages.form.form.nodes.nodes :as nodes]))

(defn foreach-expr-leaf [{:keys [value-path]} path]
  [:> Flex {:gap   8
            :align :center
            :style {:width "100%"}}
   [icon/expression]
   [form-components/render-input
    {:input-id path
     :placeholder "expression"}]])

(defmethod nodes/render-node :forEach
  [{:keys [value-path] :as ctx} node]

  (let [[foreach-type path] (or (find node :forEach)
                                (find node :forEachOrNull))]
    (tree-component/tree-node
      value-path
      [form-components/title-node-row
       {:id value-path
        :start [[form-components/tree-tag foreach-type]]
        :end [[form-components/convert-foreach value-path foreach-type]
              [form-components/delete-button value-path]]}]
      (let [{value-path :value-path :as ctx} (fhir-schema/drop-value-path ctx)]
        [(tree-component/tree-leaf (conj value-path :path)
                                   [foreach-expr-leaf ctx path])
         (nodes/render-node (-> ctx
                               (fhir-schema/add-value-path (:tree/key node))
                               (fhir-schema/add-value-path :select)
                               (fhir-schema/add-fhirpath path))
                           (select-keys node [:select]))]))))

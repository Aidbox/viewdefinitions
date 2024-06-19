(ns vd-designer.pages.form.form.nodes.unionall
  (:require [vd-designer.components.tree :as tree-component]
            [vd-designer.pages.form.components :as form-components]
            [vd-designer.pages.form.fhir-schema :as fhir-schema]
            [vd-designer.pages.form.form.nodes.nodes :as nodes]))

(defmethod nodes/render-node :unionAll
  [ctx {inner-nodes :unionAll}]
  (let [{:keys [value-path] :as ctx} (fhir-schema/add-value-path ctx :unionAll)]
    (tree-component/tree-node value-path
                              [form-components/base-node-row value-path
                               [form-components/tree-tag :unionAll]
                               [form-components/delete-button value-path]]
                              (conj
                               (nodes/render-inner-nodes ctx inner-nodes)
                               (nodes/render-add-select-button ctx)))))

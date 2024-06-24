(ns vd-designer.pages.form.form.nodes.select
  (:require [vd-designer.components.tree :as tree-component]
            [vd-designer.pages.form.components :as form-components]
            [vd-designer.pages.form.form.nodes.nodes :as nodes]))

(defmethod nodes/render-node :select
  [{:keys [value-path] :as ctx} {inner-nodes :select}]
  (tree-component/tree-node value-path
                            [form-components/base-node-row value-path
                             [form-components/tree-tag :select]]
                            (conj
                             (nodes/render-inner-nodes ctx inner-nodes)
                             (nodes/render-add-select-button ctx))))

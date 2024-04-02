(ns vd-designer.pages.vd-form.view
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Col Row]]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.components.button :as button]
            [vd-designer.components.monaco-editor :as monaco]
            [vd-designer.components.table :refer [table]]
            [vd-designer.components.tabs :refer [tab-item tabs]]
            [vd-designer.components.tree :refer [tree tree-item]]
            [vd-designer.pages.vd-form.components :refer [constant-node
                                                          name-input
                                                          resource-input
                                                          select-node
                                                          where-node]]
            [vd-designer.pages.vd-form.fhir-schema :refer [add-value-path
                                                           create-render-context]]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.routes :as routes]
            [vd-designer.utils.yaml :as yaml]))

(defn form []
  (let [vd-form @(subscribe [::m/current-vd])
        ctx (create-render-context)]
    [:div
     [tree
      :onSelect (fn [selected-keys info] (js/console.log "selected" selected-keys info))
      :defaultExpandAll true
      :treeData [(tree-item "name"     (name-input vd-form))
                 (tree-item "resource" (resource-input vd-form))

                 (constant-node (add-value-path ctx :constant) (:constant vd-form))
                 (where-node    (add-value-path ctx :where)    (:where    vd-form))
                 (select-node   (add-value-path ctx :select)   (:select   vd-form))]]]))

(defn editor []
  (let [current-vd @(subscribe [::m/current-vd])]
    [:div
     {:style {:height "600px" :width "100%"}}
     [monaco/monaco {:id "vd-yaml"
                     :value (yaml/edn->yaml current-vd)
                     :schemas []
                     #_#_:onChange (fn [value & _] (dispatch [::c/set-schema value]))
                     #_#_:onValidate (fn [markers] (dispatch [::c/set-monaco-markers (js->clj markers)]))}]]))

(defn viewdefinition-view []
  (let [resources @(subscribe [::m/view-definition-data])]
    [:> Row {:gutter 32}
     [:> Col {:span 12}
      [button/button "Run" {:onClick #(dispatch [::c/eval-view-definition-data])}]
      [tabs {:items [(tab-item {:key      "form"
                                :label    "Form"
                                :children [form]
                                :icon     (r/create-element icons/EditOutlined)})
                     (tab-item {:key      "yaml"
                                :label    "YAML"
                                :children [editor]
                                :icon     (r/create-element icons/CodeOutlined)})]}]]
     [:> Col {:span 12}
      [table (:data resources)]]]))

(defmethod routes/pages ::c/main [] [viewdefinition-view])

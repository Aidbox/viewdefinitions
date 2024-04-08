(ns vd-designer.pages.vd-form.view
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Col Row]]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.components.alert :refer [alert]]
            [vd-designer.components.button :as button]
            [vd-designer.components.table :refer [table]]
            [vd-designer.components.tabs :refer [tab-item tabs]]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.editor :refer [editor]]
            [vd-designer.pages.vd-form.form :refer [form]]
            [vd-designer.pages.vd-form.model :as m]))

(defn viewdefinition-view []
  (let [resources @(subscribe [::m/view-definition-data])
        error @(subscribe [::m/current-vd-error])]
    [:> Row {:gutter 32}
     [:> Col {:span 12}
      (if-not (nil? error)
        [alert :type :error :message error]
        [:> Row
         [button/button "Run" {:onClick #(dispatch [::c/eval-view-definition-data])}]
         [button/button "Save" {:onClick #(dispatch [::c/save-view-definition])}]])

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


(ns vd-designer.pages.vd-form.view
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Col Row]]
            [react-resizable-panels :refer [Panel PanelGroup PanelResizeHandle]]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.components.alert :refer [alert]]
            [vd-designer.components.button :as button]
            [vd-designer.components.table :refer [table]]
            [vd-designer.components.tabs :refer [tab-item tabs]]
            [vd-designer.components.heading :refer [h1]]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.editor :refer [editor]]
            [vd-designer.pages.vd-form.form :refer [form]]
            [vd-designer.pages.vd-form.model :as m]))

(defn viewdefinition-view []
  (let [resources @(subscribe [::m/view-definition-data])
        error @(subscribe [::m/current-vd-error])]
    [:> PanelGroup {:direction "horizontal"
                    :style {:gutter 32
                            :flex 1
                            :display "flex"
                            :flex-direction "row"
                            :flex-flow "row"
                            :overflow "hidden"}}
     [:> Panel
      {:minSize 25
       :style {:display "flex"}}
      [:div {:style {:flex 1
                     :flow-grow 1
                     :flex-shrink 0
                     :flex-basis "0%"
                     :flex-direction "column"
                     :display "flex"
                     :override "hidden"
                     :min-width "400px"}}
       [h1 "ViewDefinition"]
       (if-not (nil? error)
         [alert :type :error :message error]
         [:> Row
          [button/button "Run" {:onClick #(dispatch [::c/eval-view-definition-data])
                                :style {:max-width "80px"}}]
          [button/button "Save" {:onClick #(dispatch [::c/save-view-definition])
                                 :style {:max-width "80px"}}]])
       [tabs {:items [(tab-item {:key      "form"
                                 :label    "Form"
                                 :children [form]
                                 :icon     (r/create-element icons/EditOutlined)})
                      (tab-item {:key      "yaml"
                                 :label    "YAML"
                                 :children [editor]
                                 :icon     (r/create-element icons/CodeOutlined)})]}]]]
     [:> PanelResizeHandle {:style {:border-right "solid"
                                    :border-right-color "#F0F0F0"
                                    :border-width "1px"}}]
     [:> Panel
      {:minSize 20}
      [h1 "Results"
       :style {:margin-left "16px"}]
      [table (:data resources)
       {:scroll {:y 1000
                 :x true}}]]]))

#_(defn viewdefinition-view []
  (let [resources @(subscribe [::m/view-definition-data])
        error @(subscribe [::m/current-vd-error])]
    [:> PanelGroup
     {:direction "horizontal"
      :style {:gutter 32
              :flex 1
              :display "flex"
              :flex-direction "row"
              :flex-flow "row"
              :overflow "hidden"}}
     [:> Panel
      {:minSize 25
       :style {:display "flex"}}
      [:div  {:style {:flex 1
                      :flow-grow 1
                      :flex-shrink 0
                      :flex-basis "0%"
                      :flex-direction "column"
                      :display "flex"
                      :override "hidden"
                      :min-width "400px"}}
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
       [:> PanelResizeHandle {:style {:border-right "solid"
                                      :border-right-color "#F0F0F0"
                                      :border-width "1px"}}]
       [:> Panel
        {:minSize 20}
        [:> Col {:span 12}
         [table (:data resources)
          {:scroll {:y 1000
                    :x true}}]]]]]]))

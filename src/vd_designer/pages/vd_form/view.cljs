(ns vd-designer.pages.vd-form.view
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Row Popover]]
            [react-resizable-panels :refer [Panel PanelGroup PanelResizeHandle]]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.components.alert :refer [alert]]
            [vd-designer.components.button :as button]
            [vd-designer.components.table :refer [table]]
            [vd-designer.components.tabs :refer [tab-item tabs]]
            [vd-designer.components.heading :refer [h1]]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.sql :refer [sql]]
            [vd-designer.pages.vd-form.editor :refer [editor]]
            [vd-designer.pages.vd-form.form :as form]
            [vd-designer.pages.vd-form.model :as m]))

(defn viewdefinition-view []
  (let [resources @(subscribe [::m/view-definition-data])
        error @(subscribe [::m/current-vd-error])
        opened-id @(subscribe [::m/settings-opened-id])
        button-id "root-vd-settings"
        current-vd @(subscribe [::m/current-vd])]
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
       [:> Row {:align "middle"}
        [h1 "ViewDefinition"]
        [:> Popover {:trigger :click
                     :open (= button-id opened-id)
                     :placement :right
                     :content (r/as-element [form/view-definition-popup-form])}
         [button/icon ""
          icons/SettingOutlined
          {:onClick (fn [_e] (dispatch [::c/toggle-settings-opened-id button-id]))
           :style {:border :none}
           :id button-id}]]]

       (when error
         [alert :type :error :message error])
       [tabs {:items [(tab-item {:key      "form"
                                 :label    "Form"
                                 :children [form/form]
                                 :icon     (r/create-element icons/EditOutlined)})
                      (tab-item {:key      "code"
                                 :label    "Code"
                                 :disabled (nil? current-vd)
                                 :children [editor]
                                 :icon     (r/create-element icons/CodeOutlined)})
                      (tab-item {:key      "sql"
                                 :label    "SQL"
                                 :children [sql]
                                 :disabled (nil? resources)
                                 :icon     (r/create-element icons/HddOutlined)})]
              :tabBarExtraContent {:right (r/as-element
                                           [:div {:style {:display :flex
                                                          :flex-direction :row
                                                          :gap "8px"
                                                          :margin-right "8px"}}
                                            [button/button "Run" {:onClick #(dispatch [::c/eval-view-definition-data])
                                                                  :icon (r/create-element icons/PlayCircleOutlined)
                                                                  :loading @(subscribe [::m/eval-loading])
                                                                  :style {:max-width "80px"}}]
                                            [button/button "Save" {:onClick #(dispatch [::c/save-view-definition])
                                                                   :icon (r/create-element icons/SaveOutlined)
                                                                   :loading @(subscribe [::m/save-loading])
                                                                   :style {:max-width "80px"}}]])}}]]]
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

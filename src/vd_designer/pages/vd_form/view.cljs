(ns vd-designer.pages.vd-form.view
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Flex Row Space]]
            [re-frame.core :refer [dispatch subscribe]]
            [react-resizable-panels :refer [Panel PanelGroup PanelResizeHandle]]
            [reagent.core :as r]
            [vd-designer.components.alert :refer [alert]]
            [vd-designer.components.button :as button]
            [vd-designer.components.heading :refer [h1]]
            [vd-designer.components.table :refer [table]]
            [vd-designer.components.tabs :refer [tab-item tabs]]
            [vd-designer.pages.vd-form.components :refer [toggle-popover]]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.editor :refer [editor]]
            [vd-designer.pages.vd-form.form :refer [form root-settings-modal]]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.pages.vd-form.sql :refer [sql]]))

(defn viewdefinition-view []
  (let [resources @(subscribe [::m/view-definition-data])
        error @(subscribe [::m/current-vd-error])
        opened-id @(subscribe [::m/settings-opened-id])
        button-id "root-vd-settings"
        current-vd @(subscribe [::m/current-vd])]
    [:> PanelGroup {:direction "horizontal"
                    :style {:gutter         32
                            :flex           1
                            :display        "flex"
                            :flex-direction "row"
                            :flex-flow      "row"
                            :overflow       "hidden"}}
     [:> Panel
      {:minSize 25
       :style   {:display "flex"}}
      [:> Flex {:vertical true
                :flex     "1 0 0%"
                :style    {:override  "hidden"
                           :min-width "400px"}}
       [:> Row {:align "middle"}
        [:> Space
         [h1 "ViewDefinition"]
         [button/icon ""
          icons/SettingOutlined
          {:onClick #(toggle-popover nil button-id)
           :style   {:border :none}
           :id      button-id}]]
        [root-settings-modal {:open (= button-id opened-id)}]]

       (when error
         [alert :type :error :message error])

       [tabs {:items [(tab-item {:key      "form"
                                 :label    "Form"
                                 :children [form]
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
                                           [:> Flex {:gap 9
                                                     :style {:margin-right "8px"}}
                                            [button/button "Run" {:onClick #(dispatch [::c/eval-view-definition-data])
                                                                  :icon    (r/create-element icons/PlayCircleOutlined)
                                                                  :loading @(subscribe [::m/eval-loading])
                                                                  :style   {:max-width "80px"}}]
                                            [button/button "Save" {:onClick #(dispatch [::c/save-view-definition])
                                                                   :icon    (r/create-element icons/SaveOutlined)
                                                                   :loading @(subscribe [::m/save-loading])
                                                                   :style   {:max-width "80px"}}]])}}]]]
     [:> PanelResizeHandle {:style {:border-right       "solid"
                                    :border-right-color "#F0F0F0"
                                    :border-width       "1px"}}]
     [:> Panel {:minSize 20}
      [h1 "Results" :style {:margin-left "20px"}]
      [table (:data resources)
       {:scroll {:y 1000
                 :x true}}]]]))

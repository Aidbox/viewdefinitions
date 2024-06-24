(ns vd-designer.pages.form.view
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Button Flex Row Space Tooltip Typography Empty]]
            [medley.core :as medley]
            [re-frame.core :refer [dispatch subscribe]]
            [react-resizable-panels :refer [Panel PanelGroup PanelResizeHandle]]
            [reagent.core :as r]
            [vd-designer.pages.form.resource-tab.view :as resource-tab]
            [vd-designer.auth.model :as auth-model]
            [vd-designer.auth.view :refer [auth-required]]
            [vd-designer.components.alert :refer [alert]]
            [vd-designer.components.button :as button]
            [vd-designer.components.table :refer [table]]
            [vd-designer.components.tabs :refer [tab-item tabs]]
            [vd-designer.pages.form.components :refer [toggle-popover]]
            [vd-designer.pages.lists.settings.model :as settings-model]
            [vd-designer.pages.form.controller :as c]
            [vd-designer.pages.form.editor :refer [editor]]
            [vd-designer.pages.form.form :refer [form]]
            [vd-designer.pages.form.form.settings :as form]
            [vd-designer.pages.form.model :as m]
            [vd-designer.pages.form.sql :refer [sql]]))

(defn- save-vd-button [authorized?]
  (let [sandbox? @(subscribe [::settings-model/sandbox?])
        button (fn [overrides]
                 [:> Button
                  (medley/deep-merge
                   {:class "mobile-icon-button"
                    :icon  (r/create-element icons/SaveOutlined)}
                   overrides)
                  "Save"])]
    (cond
      sandbox?

      [:> Tooltip
       {:placement       "bottom"
        :mouseEnterDelay 0.5
        :title           "Save is not allowed in Sandbox"}
       (button {:disabled true})]

      authorized?
      (button {:id "vd_save"
               :onClick #(dispatch [::c/save-view-definition])
               :loading @(subscribe [::m/save-loading])})
      :else
      [auth-required (button {})])))

(defn render-table [resources sandbox? server-url]
  [table (vec (remove empty? (:data resources)))
   {:class  "vd-table"
    :pagination {:hideOnSinglePage true}
    :locale {:emptyText
             (r/as-element
               [:> Empty
                {:description
                 (r/as-element
                   [:div
                    [:> Typography.Paragraph {:level 1 :type "secondary"}
                     "No data."
                     (when-not sandbox?
                       [:<> " See: "
                        [:> Typography.Link
                         {:target "_blank"
                          :href (m/import-synthetic-data-notebook-url server-url)}
                         "Import synthetic data to Aidbox."]])]])}])}
    :scroll {:y 1000
             :x true}}])


(def button-id "root-vd-settings")

(defn viewdefinition-view []
  (let [resources @(subscribe [::m/view-definition-data])
        error @(subscribe [::m/current-vd-error])
        opened-id @(subscribe [::m/settings-opened-id])
        current-vd-nil? @(subscribe [::m/current-vd-nil?])
        authorized? @(subscribe [::auth-model/authorized?])
        server-url @(subscribe [::settings-model/current-server-url])
        sandbox? @(subscribe [::settings-model/sandbox?])]
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
       [:> Row
        [:> Space {:align :start}
         [:> Typography.Title {:level 1 :style {:margin-top 0}} "ViewDefinition"]
         [button/icon ""
          icons/SettingOutlined
          {:onClick #(toggle-popover nil button-id)
           :style   {:border :none}
           :id      button-id}]]
        [form/root-settings {:open (= button-id opened-id)}]]

       (when error
         [alert :type :error :message error])

       [tabs {:animated true
              :items [(tab-item {:key      "form"
                                 :label    "Form"
                                 :children [form]
                                 :icon     (r/create-element icons/EditOutlined)})
                      (tab-item {:key      "code"
                                 :label    "Code"
                                 :disabled current-vd-nil?
                                 :children [editor]
                                 :icon     (r/create-element icons/CodeOutlined)})
                      (tab-item {:key      "sql"
                                 :label    "SQL"
                                 :children [sql]
                                 :disabled (nil? resources)
                                 :icon     (r/create-element icons/HddOutlined)})]
              :tabBarExtraContent {:right (r/as-element
                                            [:> Flex {:gap 8
                                                      :style {:margin-right "8px"}}
                                             [:> Tooltip
                                              {:placement       "bottom"
                                               :mouseEnterDelay 0.5
                                               :title           "Ctrl+Enter"}
                                              [:> Button {:id      "vd_run"
                                                          :class   "mobile-icon-button"
                                                          :onClick #(dispatch [::c/eval-view-definition-data])
                                                          :icon    (r/create-element icons/PlayCircleOutlined)
                                                          :loading @(subscribe [::m/eval-loading])}
                                               "Run"]]
                                             [save-vd-button authorized?]])}}]]]
     [:> PanelResizeHandle {:style {:border-right       "solid"
                                    :border-right-color "#F0F0F0"
                                    :border-width       "1px"}}]
     [:> Panel {:minSize 55
                :display "flex"}
      [:> Flex
       {:vertical true
        :flex     "1 0 0%"
        :style    {:override  "hidden"
                   :margin-left "20px"
                   :min-width "400px"}}
       [:> Typography.Title {:level 1 :style {:margin-top 0}} "Results"]
       [tabs {:animated true
              :items [(tab-item {:key      "table"
                                 :label    "Table"
                                 :children [render-table resources sandbox? server-url]
                                 :icon     (r/create-element icons/EditOutlined)})
                      (tab-item {:key      "resource"
                                 :label    "Resource"
                                 :children [resource-tab/resource-tab]
                                 :icon     (r/create-element icons/CodeOutlined)})]}]]]]))

(ns vd-designer.pages.components.breadcrumbs
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Breadcrumb Flex]]
            [re-frame.core :refer [subscribe]]
            [reagent.core :as r]
            [vd-designer.pages.lists.settings.model :as settings-model]))

(def div-style {:style {:display :flex
                        :gap "4px"
                        :align-items :center}})

(defn crumbs [props]
  [:> Flex
   {:justify :space-between}
   [:> Breadcrumb {:items (:breadcrumbs props)}]
   (if-let [used-server-name @(subscribe [::settings-model/used-server-name])]
     [:div div-style
      (r/create-element icons/ApiOutlined)
      [:label used-server-name]]
     [:div div-style
      (r/create-element icons/DisconnectOutlined )
      [:label "not connected"]])])

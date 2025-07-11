(ns vd-designer.pages.components.breadcrumbs
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Breadcrumb Flex]]
            [re-frame.core :refer [subscribe]]
            [reagent.core :as r]
            [vd-designer.pages.lists.settings.model :as settings-model]))

(defn crumbs [props]
  [:> Flex
   {:justify :space-between
    :style   {:margin-bottom "16px"}}
   [:> Breadcrumb {:items (:breadcrumbs props)}]
   [:> Flex {:gap   "4px"
             :align :center}
    (if-let [chosen-server (:server-name @(subscribe [::settings-model/chosen-server]))]
      [:<>
       (r/create-element icons/ApiOutlined)
       [:label chosen-server]]
      [:<>
       (r/create-element icons/DisconnectOutlined)
       [:label "not connected"]])]])

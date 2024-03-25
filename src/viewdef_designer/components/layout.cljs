(ns viewdef-designer.components.layout
  (:require [antd :refer [Breadcrumb Layout Menu]]))

(defn layout
  "Base layout for pages, first argument is props, second - content.
   Example of props:
     { :collapsed ..,
       :on-collapse ..,
       :on-menu-click ..,
       :menu-active-key ..,
       :menu ..,
       :breadcrumbs .. }
   "
  [props content]
  (fn [props content]
    [:> Layout {:style {:minHeight "100vh"}}
     [:> Layout.Sider
      {:collapsible true
       :collapsed (:collapsed props)
       :onCollapse (:on-collapse props)}

      [:div {:class "demo-logo-vertical"}]
      [:> Menu {:theme "dark"
                :mode "inline"
                :defaultSelectedKeys [(:menu-active-key props)]
                :onClick (fn [e] ((:on-menu-click props) (keyword (.-key e))))
                :items (:menu props)}]]
     [:> Layout
      [:> Layout.Content {:style {:background "#fff"}}
       [:> Breadcrumb
        {:items (:breadcrumbs props)
         :style {:margin "16px"}}]

       [:div {:style {:padding 24}} content]]]]))

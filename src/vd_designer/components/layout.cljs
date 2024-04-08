(ns vd-designer.components.layout
  (:require [antd :refer [Breadcrumb ConfigProvider Flex Layout Menu Col]]))

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
  [:> Layout {:hasSider true
              :height "100%"}
   [:> Layout.Sider
    {:theme       "light"
     :width 72
     :style {:overflow "auto"
             :height "100vh"
             :position "fixed"
             :left 0
             :top 0
             :bottom 0
             :border-right-style "solid"
             :border-right-width "1px"
             :border-right-color "#EEEEEE"}
     :collapsible false}

    [:> Flex {:style {:justify-content "center" :padding 20}}
     [:img {:src "/img/hs-logo.webp" :style {:width 40}}]]
    [:> ConfigProvider {:theme {:components {:Menu {:itemSelectedBg    "#E6F7FF"
                                                    :itemSelectedColor "#1890FF"
                                                    :itemBorderRadius  0
                                                    :itemMarginInline  0
                                                    :itemMarginBlock   0
                                                    :iconSize 24
                                                    :itemHeight 64
                                                    :lineWidth 0}
                                             ;; :Button {:textHoverBg "#FAFAFA"}

                                             }}}
     [:> Menu {:mode                "inline"
               :selectedKeys [(:menu-active-key props)]
               :onClick             (fn [e] ((:on-menu-click props) (keyword (.-key e))))
               :items               (:menu props)}]]]
   [:> Layout {:style {:marginLeft 72
                       :height "100%"}}
    [:> Flex {:vertical true
              :style {:background "#fff"
                      :height "100%"}}
      [:> Breadcrumb
       {:items (:breadcrumbs props)
        :style {:margin "16px"}}]

      [:div {:style {:padding 24
                     :padding-bottom 0
                     :flex 1
                     :flow-grow 1
                     :flex-shrink 0
                     :flex-basis "0%"
                     :display "flex"
                     :flex-direction "column"
                     :overflow "hidden"}} content]]]])

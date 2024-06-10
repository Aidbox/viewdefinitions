(ns vd-designer.pages.layout
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Card ConfigProvider Flex Layout Menu Tooltip Row Col Button Typography]]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.auth.controller :as auth-controller]
            [vd-designer.auth.model :as auth-model]
            [vd-designer.auth.view :refer [auth-required]]
            [vd-designer.components.button :as button]))

(def theme
  {:token  {:colorPrimary "#ea4a35"
            :colorInfo    "#ea4a35"
            :fontFamily   "Inter"
            :borderRadius 4}
   :cssVar true})

(defn- use-desktop []
  [:> Card {:class    "mobile-only"
            :title    (r/as-element [:> Flex {:align "center"
                                              :gap   20}
                                     [:img {:src   "/img/hs-logo.webp"
                                            :style {:width 40}}]
                                     "ViewDefinition Designer"])
            :bordered false}
   [:p "ViewDefinition Designer is only available on desktop and screens ≥ 768px."]
   [:p "Please use a desktop browser or a resize your window."]])

(defn- logo []
  [:a {:href  "/"
       :style {:margin-top 20
               :align-self "center"}}
   [:img {:src   "/img/hs-logo.webp"
          :style {:width 40}}]])

(defn- menu [props]
  [:> ConfigProvider {:theme {:components {:Menu {:itemBorderRadius  0
                                                  :itemMarginInline  0
                                                  :itemMarginBlock   0
                                                  :iconSize          24
                                                  :itemHeight        64
                                                  :lineWidth         0}}}}
   [:> Menu {:mode         "inline"
             :selectedKeys [(:menu-active-key props)]
             :onClick      (fn [e] ((:on-menu-click props) (keyword (.-key e))))
             :items        (:menu props)}]])

(defn- authorization [authorized?]
  (if authorized?
    [:> Tooltip {:title "Sign out"}
     [:> Flex {:justify "center"
               :style   {:margin-bottom 20}}
      (button/icon "" icons/LogoutOutlined
                   {:onClick #(dispatch [::auth-controller/sign-out])
                    :type    "dashed"
                    :size    "large"})]]
    [:> Tooltip {:title "Sign In"}
     [:> Flex {:justify "center"
               :style   {:margin-bottom 20}}
      [auth-required
       (button/icon "" icons/LoginOutlined {:size "large"})]]]))

(defn layout
  "Base layout for all pages"
  [props children]
  [:> ConfigProvider {:theme theme}
   (let [authorized? @(subscribe [::auth-model/authorized?])]
     [:<>
      (use-desktop)
      [:div {:class "desktop-only"}
       [:> Layout {:hasSider true
                   :height   "100%"}
        [:> Layout.Sider
         {:theme       "light"
          :width       72
          :style       {:overflow           "auto"
                        :height             "100vh"
                        :position           "fixed"
                        :left               0
                        :top                0
                        :bottom             0
                        :border-right-style "solid"
                        :border-right-width "1px"
                        :border-right-color "#EEEEEE"}
          :collapsible false}
         [:> Flex {:vertical true
                   :style    {:height "100vh"}
                   :gap      20}
          (logo)
          (menu props)
          [:div {:style {:flex 1}}]
          (authorization authorized?)]]
        children]]])])

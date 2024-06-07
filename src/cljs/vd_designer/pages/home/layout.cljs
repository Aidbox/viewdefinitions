(ns vd-designer.pages.home.layout
  (:require [antd :refer [ConfigProvider Layout Typography]]))

(def col-sizes
  {:xxl  16
   :xl   18
   :lg   22
   :md   24})

(def theme
  {:token  {:fontSize         16
            :fontSizeHeading2 24
            :fontSizeHeading3 18
            :fontSizeHeading4 16}
   :cssVar true})

(defn layout [_props children]
  [:> ConfigProvider {:theme theme}
   [:> Layout {:style {:marginLeft 72
                       :background "#fff"
                       :height     "100%"}}
    [:> Layout.Content
     children
     [:> Layout.Footer {:style {:margin-top "112px"
                                :background "#F4F8FB"}}
      [:> Typography.Link {:style  {:color "gray"}
                           :href   "https://health-samurai.io/"
                           :target "_blank"}
       "© Health Samurai Inc."]]]]])

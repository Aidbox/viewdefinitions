(ns vd-designer.pages.form.layout
  (:require [antd :refer [Col ConfigProvider Flex Layout Row]]
            [vd-designer.pages.components.banner :as banner]
            [vd-designer.pages.components.breadcrumbs :as crumbs]))

(def col-sizes
  {:xxl  14
   :xl   16
   :lg   22
   :md   24})

(def theme
  {:token  {:fontSizeHeading1   28
            :lineHeightHeading1 1
            :fontSizeHeading2   22
            :lineHeightHeading2 1
            :fontSizeHeading3   18
            :lineHeightHeading3 1
            :fontSizeHeading4   16}
   :cssVar true})

(defn layout [props children]
  [:> ConfigProvider {:theme theme}
   [:> Layout {:style {:marginLeft 72
                       :background "#fff"
                       :height     "100%"}}
    [banner/sign-in]
    [:> Flex {:vertical true
              :gap      16
              :style    {:height "100%"
                         :margin "16px 32px"}}
     [:> Layout.Content
      [:> Row
       [:> Col col-sizes [crumbs/crumbs props]]]
      children]]]])

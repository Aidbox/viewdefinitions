(ns vd-designer.pages.form.layout
  (:require [antd :refer [Breadcrumb ConfigProvider Flex Layout]]))

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
    [:> Flex {:vertical true
              :gap      16
              :style    {:height "100%"
                         :margin "16px 32px"}}
     [:> Breadcrumb {:items (:breadcrumbs props)}]
     [:> Layout.Content children]]]])

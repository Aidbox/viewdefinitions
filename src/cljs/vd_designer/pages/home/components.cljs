(ns vd-designer.pages.home.components
  (:require ["antd" :refer [Card Flex]]))

(defn feature-card [title body]
  [:> Card {:title  title
            :styles {:header {:border-bottom "none"}
                     :body   {:padding-top 0}}
            :style  {:height "100%"}}
   body])

(defn feature-action-card [title action]
  [:> Card {:title    title
            :bordered false
            :styles   {:header {:border-bottom "none"}
                       :body   {:padding-top 0}}
            :style    {:height          "100%"
                       :display         "flex"
                       :flex-direction  "column"
                       :justify-content "center"
                       :align-items     "flex-start"
                       :box-shadow      "none"}}
   action])

(defn banner-card [title body]
  [:> Card {:title  title
            :styles {:header {:border-bottom "none"}
                     :body   {:padding-top 0}}
            :style  {:padding    "16px"
                     :margin     "24px 0"
                     :background "#F4F8FB"}}
   [:> Flex {:justify "space-between"}
    [:div {:style {:width "420px"}} body]
    [:img {:src "/img/polygons.svg"
           :style {:margin-top "-36px"}}]]])

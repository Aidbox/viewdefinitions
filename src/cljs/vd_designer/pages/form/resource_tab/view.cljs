(ns vd-designer.pages.form.resource-tab.view
  (:require [antd :refer [Flex Input Typography Empty Spin]]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.components.button :as button]
            [vd-designer.components.monaco-editor :refer [monaco]]
            [vd-designer.components.switch :as switch]
            [vd-designer.pages.form.controller :as c]
            [vd-designer.pages.form.model :as m]
            [vd-designer.utils.event :as u]))

(defn resource-search-request []
  (let [resource-search-request @(subscribe [::m/resource-search-request])]
    [:> Input
     {:style {:margin-right "4px"}
      :default-value resource-search-request
      :onKeyUp  (fn [e]
                  (when (= "Enter" (u/pressed-key e))
                    (dispatch [::c/search-resource])))
      :on-change (fn [e] (dispatch [::c/set-resource-search-request (u/target-value e)]))}]))

(defn empty-widget [text]
  [:> Empty
   {:style {:position :relative
            :top "50%"}
    :description
    (r/as-element
     [:div
      [:> Typography.Paragraph
       {:level 1
        :type  "secondary"}
       text]])}])

(defn loading-widget []
  (let [loading @(subscribe [::m/resource-loading?])]
    [:div
     {:class (if loading "visible" "hidden")
      :style {:position :absolute
              :height "100%"
              :width "100%"
              :background "#FFFFFF"
              :z-index 1000}}
     [:> Spin {:style {:position :absolute
                       :top "50%"
                       :left "50%"}}]]))

(defn editor [resource]
  (let [lang @(subscribe [::m/resource-language])
        formatted-resource (c/format-code resource lang)]
    [:div {:style {:width "100%"
                   :height "100%"}}
     [monaco {:id "vd-yaml"
              :height "100%"
              :readOnly true
              :language (when lang (name lang))
              :value formatted-resource}]
     [:> Flex {:style    {:position :absolute
                          :top      "55px"
                          :right    "24px"
                          :z-index  1000}
               :vertical true
               :align    :end
               :gap      8}
      [switch/json<->yaml
       :defaultChecked (= lang :language/json)
       :onChange #(dispatch [::c/change-resource-language
                             (if % :language/json :language/yaml)])]
      [button/copy formatted-resource]]]))

(defn search-widget []
  [:div {:style {:height "35px"
                 :display :flex
                 :flex-direction :row
                 :align-items :center
                 :gap "8px"}}
   [:span  {:style {:flex "3 0 auto"}}
    "Search request"]
   [resource-search-request]])

(defn resource []
  (let [resource @(subscribe [::m/resource-value])]
    [:div {:style {:display :flex
                   :flex-direction :column
                   :overflow :hidden
                   :height "100%"
                   :gap "8px"}}
     [search-widget]
     [:div {:style {:height "calc(100% - 42px)"
                    :padding-right "8px"}}
      [loading-widget]
      (cond
        (nil? resource)
        [empty-widget "Error"]


        (and (coll? resource) (empty? resource))
        [empty-widget "No data"]

        :else
        [editor resource])]]))
(ns viewdef-designer.pages.main.view
  (:require [re-frame.core :refer [dispatch reg-event-fx subscribe]]
            [suitkin.core :as ui]
            [suitkin.utils :as su]
            [viewdef-designer.components.table :as table]
            [viewdef-designer.pages.main.components.resource-select :refer [resource-select]]
            [viewdef-designer.pages.main.controller :as c]
            [viewdef-designer.pages.main.model :as model]
            [viewdef-designer.routes :as routes])
  (:require-macros
   [stylo.core :refer [c]]))

(def label-component-style
  (c {:color "#7972D3"
      :font-family "Inter"
      :margin-left "1px"
      :padding-left "12px"
      :padding-right "12px"
      :padding-top "4px"
      :padding-bottom "4px"
      :font-size   "14px"
      :font-weight "400"
      :line-height "20px"
      :margin-bottom "6px"}
     [:bg "#7972D31A"] :border-none [:rounded :md]))

(defn form []
  [:div
   {:class (c :w-max-sm)}
   [ui/input {:id          "view-def-name"
              :s/invalid? false
              :placeholder "ViewDefinition1"
              :on-change   (fn [e] (dispatch [::c/select-view-definition-name (su/target-value e)]))}]
   [resource-select]
   [:div
    [:label {:class label-component-style} "CONSTANTS"]]
   [:div
    [:label {:class label-component-style} "WHERE"]]
   [:div
    [:label {:class label-component-style} "SELECT"]]])

(reg-event-fx
 ::go-to-vd-page
 (fn [_ [_]]
   {::routes/navigate :vd}))

(defn header []
  [ui/button
   {:s/use "tertiary"
    :on-click (fn [_e] (dispatch [::go-to-vd-page]))}
   "ViewDefinitions /"])

(defn main-view []
  (let [patients @(subscribe [::model/patients])]
    [:div
     [header]
     [:div {:class (c :grid :grid-flow-col [:gap 5]
                      {:grid-template-columns "40% 60%"}
                      [:m 5])}
      [form]
      [table/table patients]]]))

(defmethod routes/pages :main-page [] [main-view])

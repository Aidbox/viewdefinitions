(ns vd-designer.pages.vd-form.view
  (:require [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.routes :as routes]
            [vd-designer.utils.event :as u]
            [antd :refer [Col Row]]
            [vd-designer.components.table :refer [derive-columns table]]
            [vd-designer.pages.vd-form.model :as model]))

(def label-component-style
  {:color "#7972D3"
   :font-family "Inter"
   :margin-left "1px"
   :padding-left "12px"
   :padding-right "12px"
   :padding-top "4px"
   :padding-bottom "4px"
   :font-size   "14px"
   :font-weight "400"
   :line-height "20px"
   :margin-bottom "6px"
   :bg "#7972D31A"
   :border-none true
   :rounded true})

(defn form []
  [:div
   [:div
    [:input {:id          "view-def-name"
             :s/invalid?  false
             :placeholder "ViewDefinition1"
             :on-change (fn [e] (dispatch [::c/select-view-definition-name (u/target-value e)]))}]
    [:button {:on-click (fn [e] (dispatch [::c/eval-view-definition]))}
     "Run"]]

   [:div
    [:div
     [:label {:class label-component-style} "RESOURCE"]]
    "Not found"]
   [:div
    [:label {:class label-component-style} "CONSTANT"]]
   [:div
    [:label {:class label-component-style} "WHERE"]]
   [:div
    [:label {:class label-component-style} "SELECT"]]])

(defn header []
  (let [vd-id @(subscribe [::model/chosen-vd-name])]
    [:h1 vd-id]))

(defn viewdefinition-view []
  (let [resources @(subscribe [::model/view-definition-data])
        data (:data resources)
        columns (derive-columns data)]
    [:div
     [header]
     [:> Row
      [:>  Col {:span 12} [form]]
      [:>  Col {:span 12} [table {:loading false :columns columns :dataSource data}]]]]))

(defmethod routes/pages ::c/main [] [viewdefinition-view])

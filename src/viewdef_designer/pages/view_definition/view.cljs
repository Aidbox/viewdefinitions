(ns viewdef-designer.pages.view-definition.view
  (:require [re-frame.core :refer [dispatch reg-event-fx subscribe reg-sub]]
            [viewdef-designer.pages.view-definition.http :as http]
            [viewdef-designer.pages.view-definition.components.resource-select :refer [resource-select]]
            [viewdef-designer.pages.view-definition.controller :as c]
            [viewdef-designer.pages.view-definition.model :as model]
            [viewdef-designer.routes :as routes]
            [viewdef-designer.utils.event :as u]))

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
             :on-change   (fn [e] (dispatch [::c/select-view-definition-name (u/target-value e)]))}]
    [:button {:on-click (fn [e] (dispatch [::http/eval-view-definition]))}
     "Run"]]

   [:div
    [:div
     [:label {:class label-component-style} "RESOURCE"]]
    [resource-select]]
   [:div
    [:label {:class label-component-style} "CONSTANT"]]
   [:div
    [:label {:class label-component-style} "WHERE"]]
   [:div
    [:label {:class label-component-style} "SELECT"]]])

(reg-sub
 ::chosen-vd-name
 (fn [db _]
   (:vd-name db)))

(defn header []
  (let [vd-id @(subscribe [::chosen-vd-name])]
    [:button
     {:on-click (fn [_e] (dispatch [::routes/navigate :viewdef-designer.pages.view-definitions.controller/main]))}
     (str "ViewDefinitions/" vd-id)]))

(defn viewdefinition-view []
  (let [resources @(subscribe [::model/view-definition-data])]
    [:div
     [header]
     [:div
      [form]
      #_[table/table (:data resources)]]]))

(defmethod routes/pages ::c/main [] [viewdefinition-view])

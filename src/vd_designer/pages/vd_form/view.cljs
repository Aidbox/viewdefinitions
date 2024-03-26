(ns vd-designer.pages.vd-form.view
  (:require [antd :refer [Col Row]]
            [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.components.collapse :refer [collapse create-collapse-item]]
            [vd-designer.components.dropdown :as dropdown]
            [vd-designer.components.select :refer [select]]
            [vd-designer.components.table :refer [derive-columns table]]
            [vd-designer.components.tag :as tag]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.model :as model]
            [vd-designer.routes :as routes]
            [vd-designer.utils.event :as u]))

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
     [tag/resource]
     [select {:options @(subscribe [::model/get-all-supported-resources])
              :value @(subscribe [::model/get-selected-resource])
              :on-select #(dispatch [::c/select-resource %])}]]]

   [collapse [(create-collapse-item [tag/constant]
                                    [:p "text"])
              (create-collapse-item [tag/where]
                                    [:p "text"])
              (create-collapse-item [tag/select]
                                    [:p "text"])]]

   [dropdown/new-select (fn [e] (js/console.log "Click on menu item." e))]])

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

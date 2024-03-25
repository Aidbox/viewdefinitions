(ns viewdef-designer.pages.view-definitions.view
  (:require [day8.re-frame.http-fx]
            [re-frame.core :refer [dispatch dispatch-sync subscribe]]
            [viewdef-designer.pages.view-definitions.controller :as c]
            [viewdef-designer.pages.view-definitions.model :as model]
            [viewdef-designer.routes :as routes]))

(defn viewdefinition-list-view []
  (let [view-defs @(subscribe [::model/view-defs])]
    [:div
     [:h1 {} "View Definitions"]
     (for [v view-defs]
       (let [id (-> v :resource :id)
             nm (-> v :resource :name)]
         ^{:key id}
         [:div
          [:button
           {:s/use "tertiary"
            :on-click
            (fn [_e]
              (dispatch-sync [::routes/navigate :viewdef-designer.pages.view-definition.controller/main])
              (dispatch-sync [::choose-vd nm]))}
           (str (or nm id) " " (-> v :resource :resource) " " (-> v :resource :meta :lastUpdated))]
          [:button
           {:on-click
            (fn [_e]
              (dispatch [::c/delete-view-definition id]))}
           "Delete"]]))
     [:button {:on-click (fn [e] (dispatch [::c/add-view-definition]))} "+"]]))

(defmethod routes/pages ::c/main [] [viewdefinition-list-view])

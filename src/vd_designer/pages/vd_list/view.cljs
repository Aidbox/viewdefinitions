(ns vd-designer.pages.vd-list.view
  (:require
   [re-frame.core :refer [subscribe dispatch]]
   [vd-designer.pages.vd-list.model :as m]
   [vd-designer.pages.vd-list.controller :as c]
   [vd-designer.routes :as routes]))

(defn viewdefinition-list-view []
  (let [view-defs @(subscribe [::m/view-defs])]
    [:div
     [:h1 "View Definitions"]
     (for [v view-defs]
       (let [id (-> v :resource :id)
             nm (-> v :resource :name)]
         ^{:key id}
         [:div
          [:button
           {:on-click
            (fn [_e]
              (dispatch [::routes/navigate [:vd-designer.pages.vd-form.controller/main :id id]]))}
           (str (or nm id) " " (-> v :resource :resource) " " (-> v :resource :meta :lastUpdated))]
          [:button
           {:on-click
            (fn [_e]
              (dispatch [::c/delete-view-definition id]))}
           "Delete"]]))
     [:button {:on-click (fn [e] (dispatch [::c/add-view-definition]))} "+"]]))

(defmethod routes/pages ::c/main [] [viewdefinition-list-view])
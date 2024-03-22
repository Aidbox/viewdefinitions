(ns viewdef-designer.pages.view-definitions.view
  (:require
   [re-frame.core :refer [subscribe dispatch reg-event-fx reg-event-db reg-sub
                          dispatch-sync]]
   [viewdef-designer.pages.view-definitions.controller :as c]
   [day8.re-frame.http-fx]
   [viewdef-designer.routes :as routes]))

(reg-sub
 ::view-defs
 (fn [db _]
   (:view-definitions db)))

(reg-event-db
 ::choose-vd
 (fn [db [_ vd-id]]
   (assoc db :vd-name vd-id)))

(defn viewdefinition-list-view []
  (let [view-defs @(subscribe [::view-defs])]
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

(ns vd-designer.pages.vd-list.view
  (:require [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.components.list :refer [data-list]]
            [vd-designer.pages.vd-list.controller :as c]
            [vd-designer.pages.vd-list.model :as m]
            [vd-designer.routes :as routes]))

(defn viewdefinition-list-view []
  [:div
   [:h1 "View Definitions"]
   [data-list {:loading   @(subscribe [::m/is-view-defs-loading])
               :data      @(subscribe [::m/view-defs])
               :item      {:actions         [(fn [id] [:a {:onClick #(dispatch [::c/delete-view-definition id])} "delete"])]
                           :get-data-key    #(:id (:resource %))
                           :get-title       #(:name (:resource %))
                           :get-description #(:description (:resource %))
                           :get-label       #(:resource (:resource %))
                           :on-click        #(dispatch [::routes/navigate [:vd-designer.pages.vd-form.controller/main %]])}
               :load-more nil}]

   [:button {:on-click (fn [e] (dispatch [::c/add-view-definition]))} "+"]])

(defmethod routes/pages ::c/main [] [viewdefinition-list-view])

(ns vd-designer.pages.vd-list.view
  (:require [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.components.list :refer [vd-data-list]]
            [vd-designer.pages.vd-list.controller :as c]
            [vd-designer.pages.vd-list.model :as m]
            [vd-designer.routes :as routes]))

(defn viewdefinition-list-view []
  [:div
   [:h1 "View Definitions"]
   [vd-data-list
    #(dispatch [::routes/navigate [:vd-designer.pages.vd-form.controller/main %]])
    [(fn [id] [:a {:onClick #(dispatch [::c/delete-view-definition id])} "delete"])]

    :loading    @(subscribe [::m/view-defs-loading?])
    :dataSource @(subscribe [::m/view-defs])]

   [:button {:on-click (fn [e] (dispatch [::c/add-view-definition]))} "+"]])

(defmethod routes/pages ::c/main [] [viewdefinition-list-view])

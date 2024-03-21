(ns viewdef-designer.pages.view-definitions.view
  (:require
   [re-frame.core :refer [subscribe dispatch reg-event-fx]]
   [viewdef-designer.pages.view-definitions.model :as model]
   [viewdef-designer.pages.view-definitions.controller :as c]
   [suitkin.core :as ui]
   [suitkin.utils :as su]
   [viewdef-designer.routes :as routes])
  (:require-macros
   [stylo.core :refer [c]]))

(reg-event-fx
 ::go-to-main-page
 (fn [_ [_]]
   {::routes/navigate :main}))

(defn vd-view []
  [:div
   [ui/button {:on-click #(dispatch [::go-to-main-page])} "Go back"]
   [:div "vd-view"]])

(defmethod routes/pages :vd-page [] [vd-view])

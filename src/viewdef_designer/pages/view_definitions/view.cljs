(ns viewdef-designer.pages.view-definitions.view
  (:require
   [re-frame.core :refer [subscribe dispatch reg-event-fx reg-event-db reg-sub
                          dispatch-sync]]
   [viewdef-designer.pages.view-definitions.model :as model]
   [viewdef-designer.pages.view-definitions.controller :as c]
   [suitkin.core :as ui]
   [suitkin.utils :as su]
   [day8.re-frame.http-fx]
   [ajax.core :as ajax]
   [viewdef-designer.routes :as routes])
  (:require-macros
   [stylo.core :refer [c]]))

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
   [ui/h1 {} "View Definitions"]
   (for [v (:entry view-defs)]
     (let [id (-> v :resource :id)
           nm (-> v :resource :name)]
      ^{:key id}
      [:div
       [ui/button
        {:s/use "tertiary"
         :on-click
         (fn [_e]
          (dispatch-sync [:viewdef-designer.routes/navigate :viewdef-designer.pages.view-definition.controller/main])
          (dispatch-sync [::choose-vd nm]))}
        (str (or nm id))]
       [:div
        (str (:resource v))]]))]))

(defmethod routes/pages ::c/main [] [viewdefinition-list-view])

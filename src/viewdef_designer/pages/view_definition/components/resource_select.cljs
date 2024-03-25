(ns viewdef-designer.pages.view-definition.components.resource-select
  (:require
   [re-frame.core :refer [dispatch reg-event-db reg-sub subscribe]]))

(defn resource-select []
  (fn []
    [:div]
    #_[single-dropdown
       :filter-box? true
       :auto-complete? true
       :placeholder "ResourceType"
       :choices @(subscribe [::supported-resources])
       :model @(subscribe [::selected-resource])
       :on-change #(dispatch [::select-resource %])]))

(reg-sub
 ::supported-resources
 (fn [db [_]]
   (map #(hash-map :id % :label %) (get db :resources))))

(reg-sub
 ::selected-resource
 (fn [db [_]]
   (get db :resource)))

(reg-event-db
 ::select-resource
 (fn [db [_ input]]
   (assoc db :resource input)))

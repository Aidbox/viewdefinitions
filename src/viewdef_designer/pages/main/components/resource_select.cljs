(ns viewdef-designer.pages.main.components.resource-select
  (:require [re-com.core :refer [single-dropdown]]
            [re-frame.core :refer [dispatch reg-event-db reg-sub subscribe]])
  (:require-macros [stylo.core :refer [c]]))

(defn resource-select []
 (fn []
  [single-dropdown
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

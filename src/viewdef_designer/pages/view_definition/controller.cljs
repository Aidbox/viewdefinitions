(ns viewdef-designer.pages.view-definition.controller
  (:require
    [clojure.string :as str]
    [re-frame.core :refer [reg-event-fx reg-event-db]]))

(def identifier ::main)

(reg-event-fx
 identifier
 (fn [{db :db} [_ phase]]
   {:db db}
   #_{:fx (cond-> []
            (= :init phase)
            (conj [:dispatch [::load-view-definition]])
            (= :deinit phase)
            (conj [:dispatch [::deinit]]))}))

(reg-event-db
 ::select-view-definition-name
 (fn [db [_ vd-name]]
   (assoc-in db [:current :vd-name] vd-name)))

(reg-event-db
 ::select-resource
 (fn [db [_ input]]
   (assoc db :resource input)))



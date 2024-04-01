(ns vd-designer.pages.settings.controller
  (:require
    [re-frame.core :refer [reg-event-db reg-event-fx]]))

(def identifier ::main)

(reg-event-fx
  identifier
  (fn [{db :db} [_ _phase]]
    {:db db}))

(reg-event-db
  ::update-fhir-server-input
  (fn [db [_ path new-val]]
    (assoc-in db [:fhir-server path] new-val)))

(reg-event-db
  ::start-edit
  (fn [db [_]]
    (assoc db :edit-server true)))

(reg-event-db
  ::cancel-edit
  (fn [db [_]]
    (assoc db :edit-server false)))

(ns viewdef-designer.pages.fhir-server-config.controller
  (:require
    [re-frame.core :refer [reg-event-fx reg-event-db]]))

(def identifier ::main)

(reg-event-fx
  identifier
  (fn [{db :db} [_ phase]]
    {:db db}))

(reg-event-fx
  ::reset-fhir-server-config
  (fn [{db :db} [_ server-name url token]]
    (println server-name url token)
    ;; TODO: - try to connect
    ;; TODO: - save to local storage if connected successfully
    ;; TODO: - save to backend if connected successfully
    {:db db}))

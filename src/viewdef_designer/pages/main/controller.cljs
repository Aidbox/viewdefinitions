(ns viewdef-designer.pages.main.controller
  (:require
    [re-frame.core :refer [reg-event-fx reg-event-db]]))


{:patients []
 :current {:name "vd"}
 }

(reg-event-db
 ::select-view-definition-name
 (fn [db [_ vd-name]]
   (assoc-in db [:current :vd-name] vd-name)))

(reg-event-db
 ::select-resource
 (fn [db [_ resource]]
   (assoc-in db [:current :resource] resource)))

(reg-event-db
 ::select-constants
 (fn [db [_ constants]]
   (assoc-in db [:current :constants] constants)))



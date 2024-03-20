(ns viewdef-designer.pages.main.controller
  (:require
    [clojure.string :as str]
    [re-frame.core :refer [reg-event-fx reg-event-db]]))


(reg-event-db
 ::select-view-definition-name
 (fn [db [_ vd-name]]
   (assoc-in db [:current :vd-name] vd-name)))

(reg-event-db
 ::select-resource
 (fn [db [_ input]]
   (assoc db :resource input)))



(ns vd-designer.pages.home.controller
  (:require [re-frame.core :refer [reg-event-db]]))

(reg-event-db
 ::move-onboarding-step-sandbox
 (fn [db [_ step]]
   (assoc-in db [:onboarding :sandbox] (max 0 step))))

(reg-event-db
 ::move-onboarding-step-aidbox
 (fn [db [_ step]]
   (assoc-in db [:onboarding :aidbox] (max 0 step))))

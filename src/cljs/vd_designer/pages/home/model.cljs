(ns vd-designer.pages.home.model
  (:require [re-frame.core :refer [reg-sub]]))

(reg-sub
 ::onboarding-sandbox
 (fn [db _]
   (-> db :onboarding :sandbox)))

(reg-sub
 ::onboarding-aidbox
 (fn [db _]
   (-> db :onboarding :aidbox)))

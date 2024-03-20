(ns viewdef-designer.pages.main.model
  (:require [re-frame.core :refer [reg-sub]]))

(reg-sub
 ::patients
 (fn [db _]
   (:patients db)))

(reg-sub
 ::resource
 (fn [db [_]]
   (-> db :current :resource)))

(reg-sub
 ::constants
 (fn [db [_]]
   (-> db :current :constants)))



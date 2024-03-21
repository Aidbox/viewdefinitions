(ns viewdef-designer.pages.main.model
  (:require [re-frame.core :refer [reg-sub]]))

(reg-sub
 ::patients
 (fn [db _]
   (:patients db)))

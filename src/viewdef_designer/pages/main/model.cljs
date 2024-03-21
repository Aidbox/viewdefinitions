(ns viewdef-designer.pages.main.model
  (:require [re-frame.core :refer [reg-sub]]
            [viewdef-designer.utils.select :refer [prepare-option]]))

(reg-sub
 ::patients
 (fn [db _]
   (:patients db)))

(reg-sub
 ::supported-resources
 (fn [db [_]]
   (map prepare-option (get db :resources))))

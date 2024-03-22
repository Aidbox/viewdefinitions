(ns viewdef-designer.pages.main.model
  (:require [re-frame.core :refer [reg-sub]]))

(reg-sub
 ::view-definition-data
 (fn [db _]
   (:view-definition/data db)))

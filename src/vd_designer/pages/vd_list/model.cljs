(ns vd-designer.pages.vd-list.model
  (:require
   [re-frame.core :refer [reg-sub]]))

(reg-sub
 ::view-defs
 (fn [db _]
   (:view-definitions db)))

(reg-sub
 ::view-defs-loading?
 (fn [db _]
   (:loading db)))

(ns vd-designer.pages.vd-list.model
  (:require
   [re-frame.core :refer [reg-sub]]
   [vd-designer.pages.vd-list.controller :as-alias c]))

(reg-sub
 ::view-defs
 (fn [db _]
   (:view-definitions db)))

(reg-sub
 ::view-defs-loading?
 (fn [db _]
   (:loading db)))

(reg-sub
  ::filter-phrase
  (fn [db _]
    (::c/filter-phrase db)))

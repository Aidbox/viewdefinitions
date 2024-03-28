(ns vd-designer.pages.vd-form.model
  (:require [re-frame.core :refer [reg-sub]]
            [vd-designer.components.select :refer [options-from-vec]]))

(reg-sub
 ::view-definition-data
 (fn [db _]
   (::resource-data db)))

(reg-sub
  ::current-vd
  (fn [db _]
    (:current-vd db)))

(reg-sub
  ::mode
  (fn [db _]
    (:mode db)))

(reg-sub
 ::get-all-supported-resources
 (fn [db [_]]
   (options-from-vec (get db :resources))))
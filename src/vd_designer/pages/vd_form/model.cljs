(ns vd-designer.pages.vd-form.model
  (:require [re-frame.core :refer [reg-sub]]))

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

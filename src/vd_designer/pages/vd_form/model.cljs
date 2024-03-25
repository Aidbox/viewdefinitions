(ns vd-designer.pages.vd-form.model
  (:require [re-frame.core :refer [reg-sub]]))

(reg-sub
 ::view-definition-data
 (fn [db _]
   (::resource-data db)))

(reg-sub
  ::chosen-vd-name
  (fn [db _]
    (:vd-name db)))

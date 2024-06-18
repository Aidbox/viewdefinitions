(ns vd-designer.pages.form.resource-tab.model
  (:require [re-frame.core :refer [reg-sub]]))

(reg-sub
 ::spec-map
  (fn [db _]
    (:spec-map db)))

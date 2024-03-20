(ns viewdef-designer.components.layout.model
  (:require
   [re-frame.core :as re-frame :refer [reg-sub]]))

(reg-sub
 ::active-panel
 (fn [db _]
   (:active-panel db)))

(reg-sub
 ::value
 (fn [db _]
   (:value db)))

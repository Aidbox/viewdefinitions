(ns viewdef-designer.pages.view-definitions.model
  (:require [re-frame.core :refer [reg-sub]]))

(reg-sub
 ::view-defs
 (fn [db _]
   (:view-definitions db)))

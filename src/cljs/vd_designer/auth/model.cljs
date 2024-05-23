(ns vd-designer.auth.model
  (:require [re-frame.core :refer [reg-sub]]
            [vd-designer.pages.settings.controller :as-alias c]))

(reg-sub
 ::authorized?
 (fn [db _]
   (:authorized? db)))

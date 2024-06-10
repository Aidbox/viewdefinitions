(ns vd-designer.auth.model
  (:require [re-frame.core :refer [reg-sub]]
            [vd-designer.pages.lists.settings.controller :as-alias c]))

(defn sso-link []
  (str "/api/auth/sso?route=" (.-href js/window.location)))

(reg-sub
 ::authorized?
 (fn [db _]
   (:authorized? db)))

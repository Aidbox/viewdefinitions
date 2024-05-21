(ns vd-designer.pages.auth.model
  (:require [re-frame.core :refer [reg-sub]]
            [vd-designer.pages.settings.controller :as-alias c]))

(def auth-db
  {:authorized?  false ;; TODO
   })

(reg-sub
 ::authorized?
 (fn [db _]
   (-> db :auth :authorized?)))

(ns vd-designer.pages.auth.model
  (:require
   [re-frame.core :refer [reg-sub]]
   [vd-designer.pages.settings.controller :as-alias c]))

(def auth-db
  {:authorized?  false ;; TODO
   })

(reg-sub
 ::authorized?
 (fn [db _]
   (-> db :auth :authorized?)))

(defn construct-aidbox-sso-url [current-route]
  ;; TODO extract this to some env
  (let [sso-host     "http://127.0.0.1.nip.io:8789"
        sso-client   "vd-designer"
        sso-callback "http://localhost:8280/auth"
        sso-state    (js/btoa current-route)]
    (str sso-host "/ui/portal"
         "?response_type=code"
         "&client_id="    sso-client
         "&redirect_uri=" sso-callback
         "&state="        sso-state
         "#/signin")))

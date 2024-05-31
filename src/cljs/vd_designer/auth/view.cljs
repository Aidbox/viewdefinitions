(ns vd-designer.auth.view
  (:require [reagent.core :as r]
            [vd-designer.components.pop-confirm :refer [pop-confirm]]))

(defn auth-required [trigger-element]
  (let [sso-link (str "/api/auth/sso?route=" (.-href js/window.location))]
    [pop-confirm trigger-element
     {:title       "Not authorized"
      :description (r/as-element [:p
                                  "To perform this action you need to Sign In."
                                  [:br]
                                  "You can do that via Aidbox SSO"])
      :ok-text     "Sign In"
      :cancel-text "Cancel"
      :on-confirm  #(js/window.location.assign sso-link)}]))

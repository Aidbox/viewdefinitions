(ns vd-designer.pages.auth.view
  (:require [reagent.core :as r]
            [vd-designer.components.pop-confirm :refer [pop-confirm]]
            [vd-designer.pages.auth.model :refer [construct-aidbox-sso-url]]))

(defn auth-required [trigger-element]
  (let [sso-link (construct-aidbox-sso-url (.-href js/window.location))]
    [pop-confirm trigger-element
     {:title       "Not authorized"
      :description (r/as-element [:p
                                  "To perfrom this action you need to Sign In."
                                  [:br]
                                  "You can do that via Aidbox SSO"])
      :ok-text     "Sign In"
      :cancel-text "Cancel"
      :on-confirm  #(js/window.location.assign sso-link)}]))

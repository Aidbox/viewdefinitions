(ns vd-designer.auth.view
  (:require [reagent.core :as r]
            [vd-designer.auth.model :as auth-model]
            [vd-designer.components.pop-confirm :refer [pop-confirm]]
            ["@sooro-io/react-gtm-module" :as TagManager]))

(defn auth-required [trigger-element]
  (let [sso-link (auth-model/sso-link)]
    [pop-confirm trigger-element
     {:title       "Not authorized"
      :description (r/as-element [:p
                                  "To perform this action you need to Sign In."
                                  [:br]
                                  "You can do that via Aidbox SSO"])
      :ok-button-props {:id "vd_signin"}
      :ok-text     "Sign In"
      :cancel-text "Cancel"
      :on-confirm  #(do
                      (TagManager/dataLayer
                            (clj->js {:dataLayer {:event "vd_signin"}}))
                      (js/window.location.assign sso-link))}]))

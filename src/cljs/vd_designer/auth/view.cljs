(ns vd-designer.auth.view
  (:require [reagent.core :as r]
            [vd-designer.auth.model :as auth-model]
            [vd-designer.components.pop-confirm :refer [pop-confirm]]
            [vd-designer.utils.tag-manager :as tag-manager]))

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
                      (tag-manager/data-layer
                        {:dataLayer {:event "vd_signin"}})
                      (js/window.location.assign sso-link))}]))

(ns vd-designer.pages.components.banner
  (:require
   [re-frame.core :refer [subscribe]]
   [vd-designer.auth.model :as auth-model]
   [antd :refer [Flex Button Typography]]))

(defn sign-in []
  (let [auth? @(subscribe [::auth-model/authorized?])
        sso-link (auth-model/sso-link)]
    (when-not auth?
      [:> Flex
       {:style
        {:background-color "#F4F8FB"
         :padding "5px"
         :padding-left "100px"
         :align-content "center"}
        :gap 20
        :align "center"
        :justify "center"}
       [:> Typography.Paragraph
        {:style {:margin-bottom 0}}
        "Please sign in to use ViewDefinition Designer with your data"]
       [:> Button {:type "primary" :ghost true
                   :href sso-link}
        "Sign In"]])))

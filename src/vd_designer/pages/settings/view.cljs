(ns vd-designer.pages.settings.view
  (:require
    [re-frame.core :refer [dispatch subscribe]]
    [vd-designer.pages.settings.controller :as c]
    [vd-designer.pages.settings.model :as m]
    [vd-designer.routes :as routes]
    [vd-designer.utils.event :refer [target-value]]))

(defn fhir-config-form []
  (let [{:keys [server-name base-url token]} @(subscribe [::m/fhir-server-config])]
    [:div
     [:div
      [:label "Name"]
      [:input {:type        "text"
               :value       server-name
               :placeholder "Server name"
               :on-change   #(dispatch [::c/update-fhir-server-input
                                        :server-name (target-value %)])}]]

     [:div
      [:label "URL"]
      [:input {:type        "text"
               :placeholder "URL"
               :value       base-url
               :on-change   #(dispatch [::c/update-fhir-server-input
                                        :base-url (target-value %)])}]]

     [:div
      [:label "Token"]
      [:input {:type        "text"
               :placeholder "top secret"
               :value       token
               :on-change   #(dispatch [::c/update-fhir-server-input
                                        :token (target-value %)])}]]]))

(defmethod routes/pages ::c/main [] [fhir-config-form])

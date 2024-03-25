(ns viewdef-designer.pages.fhir-server-config.view
  (:require
    [suitkin.core :as ui]
    [suitkin.utils :as su]
    [re-frame.core :refer [dispatch]]
    [reagent.core :as r]
    [viewdef-designer.routes :as routes]
    [viewdef-designer.pages.fhir-server-config.controller :as c]))

(defn form []
  (let [server-name (r/atom nil)
        url (r/atom nil)
        token (r/atom nil)]
    [:div
     [:div
      [ui/label "Name"]
      [ui/input {:type        "text"
                 :placeholder "Server name"
                 :on-change   #(reset! server-name (su/target-value %))}]]

     [:div
      [ui/label "URL"]
      [ui/input {:type        "text"
                 :placeholder "URL"
                 :on-change   #(reset! url (su/target-value %))}]]

     [:div
      [ui/label "Token"]
      [ui/input {:type        "text"
                 :placeholder "top secret"
                 :on-change   #(reset! token (su/target-value %))}]]

     [ui/button
      {:on-click (fn [_]
                   (dispatch [::c/reset-fhir-server-config
                              @server-name @url @token]))}
      "Save"]]))

(defmethod routes/pages ::c/main [] [form])

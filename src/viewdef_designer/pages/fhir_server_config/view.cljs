(ns viewdef-designer.pages.fhir-server-config.view
  (:require
    [re-frame.core :refer [dispatch]]
    [reagent.core :as r]
    [viewdef-designer.routes :as routes]
    [viewdef-designer.pages.fhir-server-config.controller :as c]))

(defn form []
  (let [server-name (r/atom nil)
        base-url (r/atom nil)
        token (r/atom nil)]
    [:div
     [:div
      [:label "Name"]
      [:input {:type        "text"
               :placeholder "Server name"
               :on-change   #(reset! server-name (.. % -target -value))}]]

     [:div
      [:label "URL"]
      [:input {:type        "text"
               :placeholder "URL"
               :on-change   #(reset! base-url (.. % -target -value))}]]

     [:div
      [:label "Token"]
      [:input {:type        "text"
               :placeholder "top secret"
               :on-change   #(reset! token (.. % -target -value))}]]

     [:button
      {:on-click (fn [_]
                   (dispatch [::c/reset-fhir-server-config
                              @server-name @base-url @token]))}
      "Save"]]))

(defmethod routes/pages ::c/main [] [form])

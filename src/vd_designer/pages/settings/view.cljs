(ns vd-designer.pages.settings.view
  (:require
    [antd :refer [List]]
    [vd-designer.components.modal :as modal]
    [re-frame.core :refer [dispatch subscribe]]
    [vd-designer.pages.settings.controller :as c]
    [vd-designer.pages.settings.model :as m]
    [reagent.core :as r]
    [vd-designer.components.list :as components.list]
    [vd-designer.components.button :as button]
    [vd-designer.utils.react :refer [js-obj->clj-map]]
    [vd-designer.components.input :as input]
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

(defn edit-button []
  (let [modal-opened? @(subscribe [::m/edit-server])]
    [:<>
     [:a {:onClick #(dispatch [::c/start-edit])} "edit"]
     [modal/modal {:title "Edit server"
                   :open modal-opened?
                   :onCancel #(dispatch [::c/cancel-edit])}
      [fhir-config-form]


      ]]))

(defn server-list []
  [:div {:style {:width "60%"}}
   [:div {:style {:display         :flex
                  :justify-content :space-between
                  :align-items     :center
                  :width           "100%"}}
    [:h1 "Servers list"]
    [button/add-view-definition "New server"
     #_#_:on-click (fn [e] (dispatch [::c/add-view-definition]))]]

   [components.list/data-list
    #_#_:loading @(subscribe [::m/view-defs-loading?])
    :dataSource [{:server-name "aidbox"
                  :base-url "https://viewdefs1.abc"
                  :token "abc" }]
    :renderItem (fn [raw-item]
                  (r/as-element
                    (let [{:keys [server-name token base-url]} (js-obj->clj-map raw-item)]
                      [:> List.Item
                       {:actions (mapv #(r/as-element (% base-url))
                                      [(fn [id] [edit-button])
                                       (fn [id] [:a {:onClick #(js/console.log "deleted")} "delete"])
                                       ])}
                       [:> List.Item.Meta
                        {:title
                         (r/as-element
                           [:a {:onClick #(dispatch [::routes/navigate [:vd-designer.pages.vd-form.controller/main :id base-url]])}
                            server-name])
                         :description base-url}]])))]])

(defmethod routes/pages ::c/main [] [server-list])

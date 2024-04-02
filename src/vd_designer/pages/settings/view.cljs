(ns vd-designer.pages.settings.view
  (:require
    [antd :refer [List Modal Checkbox]]
    [clojure.string :as str]
    [medley.core :as medley]
    [re-frame.core :refer [dispatch subscribe]]
    [reagent.core :as r]
    [vd-designer.components.button :as button]
    [vd-designer.components.list :as components.list]
    [vd-designer.pages.settings.controller :as c]
    [vd-designer.pages.settings.model :as m]
    [vd-designer.routes :as routes]
    [vd-designer.utils.event :refer [target-value]]
    [vd-designer.utils.react :refer [js-obj->clj-map]]))

(defn error-label [visible? text]
  [:label {:hidden (not visible?)
           :style  {:color     "red"
                    :font-size "10px"}} text])

(defn fhir-config-form
  [{:keys [server-name base-url token]} request-sent? errors-set]
  [:div
   [:div
    [:label "Name"]
    [:br]
    [:input {:disabled    request-sent?
             :value       server-name
             :placeholder "Server name"
             :on-change   #(dispatch [::c/update-fhir-server-input
                                      :server-name (target-value %)])}]
    [:br]
    [error-label (:name-clash errors-set)
     "Server with this name already exists"]]

   [:div
    [:label "URL"]
    [:br]
    [:input {:disabled    request-sent?
             :placeholder "URL"
             :value       base-url
             :on-change   #(dispatch [::c/update-fhir-server-input
                                      :base-url (target-value %)])}]]

   [:div
    [:label "Token"]
    [:br]
    [:input {:disabled    request-sent?
             :placeholder "top secret"
             :value       token
             :on-change   #(dispatch [::c/update-fhir-server-input
                                      :token (target-value %)])}]]
   [error-label (:conn-clash errors-set)
    "Server with this URL and token already exists"]
   [:> Checkbox {:on-change #(dispatch [::c/update-fhir-server-input
                                        :set-active (.. % -target -checked)])}
    "set active"]])

(defn some-empty-fields? [{:keys [server-name base-url token]}]
  (or (str/blank? server-name)
      (str/blank? base-url)
      (str/blank? token)))

(defn name-exists? [server-name existing-servers]
  (->> existing-servers
       (medley/find-first #(-> % :server-name (= server-name)))
       boolean))

(defn conn-exists? [{new-base-url :base-url, new-token :token} existing-servers]
  (->> existing-servers
       (medley/find-first (fn [{:keys [base-url token]}]
                            (and (= new-base-url base-url)
                                 (= new-token token))))
       boolean))

(defn edit-button []
  (let [modal-opened? @(subscribe [::m/edit-server])
        request-sent? @(subscribe [::m/request-sent])
        {:keys [server-name] :as fhir-server} @(subscribe [::m/fhir-server-config])
        existing-servers @(subscribe [::m/existing-servers])
        errors-set (cond-> #{}
                           (some-empty-fields? fhir-server) (conj :empty-field)
                           (name-exists? server-name existing-servers) (conj :name-clash)
                           (conn-exists? fhir-server existing-servers) (conj :conn-clash))]
    [:<>
     [:a {:onClick #(dispatch [::c/start-edit])} "edit"]
     [:> Modal {:open            modal-opened?
                :title           "Edit server"
                :ok-text         "Add"
                :on-ok           #(dispatch [::c/try-new-conn fhir-server])
                :ok-button-props {:disabled (not-empty errors-set)}
                :confirm-loading request-sent?
                :on-cancel       #(dispatch [::c/cancel-edit])}
      [fhir-config-form fhir-server request-sent? errors-set]]]))

(defn server-list []
  [:div {:style {:width "60%"}}
   [:div {:style {:display         :flex
                  :justify-content :space-between
                  :align-items     :center
                  :width           "100%"}}
    [:h1 "Servers list"]
    [button/add-view-definition "New server"
     :on-click (fn [e] (dispatch [::c/start-new-server]))]]

   [components.list/data-list
    #_#_:loading @(subscribe [::m/view-defs-loading?])
    :dataSource @(subscribe [::m/existing-servers])
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

(ns vd-designer.pages.settings.view
  (:require
    [antd :refer [List Modal Checkbox Row Col Button]]
    ["@ant-design/icons" :as icons]
    [clojure.string :as str]
    [medley.core :as medley]
    [re-frame.core :refer [dispatch subscribe]]
    [reagent.core :as r]
    [vd-designer.components.button :as button]
    [vd-designer.components.list :as components.list]
    [vd-designer.components.input :as components.input]
    [vd-designer.pages.settings.controller :as c]
    [vd-designer.pages.settings.model :as m]
    [vd-designer.components.tabs :as tabs]
    [vd-designer.routes :as routes]
    [vd-designer.utils.event :refer [target-value]]
    [vd-designer.utils.react :refer [js-obj->clj-map]]))

(defn error-label [visible? text]
  [:label {:hidden (not visible?)
           :style  {:color     "red"
                    :font-size "10px"}} text])

(defn request-settings-tab [{:keys [server-name base-url token fhir-version]} errors-set]
  [:div
   [:div
    [:label "Name"]
    [:br]
    [components.input/input {:value       server-name
                             :placeholder "Server name"
                             :on-change   #(dispatch [::c/update-fhir-server-input
                                                      :server-name (target-value %)])}]
    [:br]
    [error-label (:name-clash errors-set)
     "Server with this name already exists"]]

   [:div
    [:label "URL"]
    [:br]
    [components.input/input {:placeholder "URL"
                             :value       base-url
                             :on-change   #(dispatch [::c/update-fhir-server-input
                                                      :base-url (target-value %)])}]]
   [:div
    [:label "Evaluate ViewDefinition endpoint"]
    [:br]
    [components.input/input {:placeholder "URL"
                             :value       "todo"
                             :on-change   #(dispatch [::c/update-fhir-server-input
                                                      :base-url (target-value %)])}]]

   [error-label (:conn-clash errors-set)
    "Server with this URL and token already exists"]
   (when fhir-version
     [:div
      [:label (str "FHIR version: " fhir-version)]])])

(defn request-headers-tab [{:keys [server-name base-url token fhir-version]} errors-set]
  [:div
   [:> Row
    [:div [:label "Key"]
     [components.input/input {:value       "todo"
                              :on-change   #(dispatch [::c/update-fhir-server-input
                                                       :base-url (target-value %)])}]]

    [:div [:label "Value"]
     [components.input/input {:value       "todo"
                              :on-change   #(dispatch [::c/update-fhir-server-input
                                                       :base-url (target-value %)])}]]
    ]
   [button/add "Add" {#_:on-click
                      :style {:width "100%"}}]]


  )

(defn fhir-config-form [{:keys [server-name base-url token fhir-version] :as fhir-server} errors-set]
  [tabs/tabs
   {:items [(tabs/tab-item {:key      "Request settings"
                            :label    "Request settings"
                            :children [request-settings-tab fhir-server errors-set]
                            :icon     (r/create-element icons/EditOutlined)})
            (tabs/tab-item {:key      "Request Headers"
                            :label    "Request Headers"
                            :children [request-headers-tab fhir-server errors-set]
                            :icon     (r/create-element icons/SettingOutlined)})]}])

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

(defn modal-view []
  (let [original-server @(subscribe [::m/original-server])
        fhir-server @(subscribe [::m/fhir-server-config])
        existing-servers @(subscribe [::m/existing-servers])
        errors-set (cond-> #{}
                           (some-empty-fields? fhir-server) (conj :empty-field)
                           (name-exists? (:server-name fhir-server) existing-servers) (conj :name-clash)
                           (conn-exists? fhir-server existing-servers) (conj :conn-clash))]
    [:> Modal {:open      (boolean original-server)
               :title     (if (:server-name original-server) "Edit server" "Add server")
               :ok-text   (if (:server-name original-server) "Edit" "Add")
               :on-ok     #(dispatch [::c/add-server fhir-server])
               #_#_:ok-button-props {:disabled (not-empty errors-set)}
               :on-cancel #(dispatch [::c/cancel-edit])}
     [fhir-config-form fhir-server errors-set]]))

(defn connect [server-config request-sent-by used-server-name connect-error]
  (cond
    (and connect-error (= (:server-name server-config) (:server-name connect-error)))
    [:div
     [:label {:style {:color "red"}} (:status-text (:result connect-error))]
     " "
     [:a {:onClick #(dispatch [::c/connect server-config])} "connect"]
     ]

    (-> server-config :server-name (= request-sent-by))
    [:label {:style {:color "lightgrey"}} "connecting..."]

    (-> server-config :server-name (= used-server-name))
    [:label {:style {:color "green"}} "connected"]

    :else
    [:a {:onClick #(dispatch [::c/connect server-config])} "connect"]))

(defn server-list []
  (let [request-sent-by @(subscribe [::m/request-sent-by])
        used-server-name @(subscribe [::m/used-server-name])
        connect-error @(subscribe [::m/connect-error])]
    [:div {:style {:width "60%"}}
     [:div {:style {:display         :flex
                    :justify-content :space-between
                    :align-items     :center
                    :width           "100%"}}
      [:h1 "Server list"]
      [button/add-view-definition "New server"
       {:on-click (fn [e] (dispatch [::c/new-server]))}]]
     [modal-view]

     [components.list/data-list
      :dataSource @(subscribe [::m/existing-servers])
      :renderItem (fn [raw-item]
                    (r/as-element
                      (let [{:keys [server-name token base-url] :as server-config}
                            (js-obj->clj-map raw-item)]
                        [:> List.Item
                         {:actions [(r/as-element [connect server-config request-sent-by used-server-name connect-error])
                                    (r/as-element [:a {:onClick #(dispatch [::c/start-edit server-config])} "edit"])
                                    (r/as-element [:a {:onClick #(dispatch [::c/delete server-config])} "delete"])]}
                         [:> List.Item.Meta
                          {:title
                           (r/as-element
                             [:a {:onClick #(dispatch [::c/start-edit server-config])}
                              server-name])
                           :description base-url}]])))]]))

(defmethod routes/pages ::c/main [] [server-list])

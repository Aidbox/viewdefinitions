(ns vd-designer.pages.settings.view
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [List Modal Row]]
            [clojure.string :as str]
            [medley.core :as medley]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.components.button :as button]
            [vd-designer.components.input :as components.input]
            [vd-designer.components.list :as components.list]
            [vd-designer.components.modal :as modal]
            [vd-designer.components.pop-confirm :refer [auth-required]]
            [vd-designer.components.tabs :as tabs]
            [vd-designer.pages.settings.controller :as c]
            [vd-designer.pages.settings.model :as m]
            [vd-designer.pages.auth.model :as auth-model]
            [vd-designer.utils.event :refer [target-value]]
            [vd-designer.utils.react :refer [js-obj->clj-map]]
            [vd-designer.utils.string :as string-utils]))

(defn error-label [visible? text]
  [:label {:hidden (not visible?)
           :style  {:color     "red"
                    :font-size "10px"}} text])

(defn request-settings-tab [{:keys [server-name base-url fhir-version]} errors-set]
  [:div
   [:div
    [:label "Name"]
    [:br]
    [components.input/input {:value       server-name
                             :placeholder "Server name"
                             :on-change   #(dispatch [::c/update-fhir-server-input
                                                      [:server-name] (target-value %)])}]
    [:br]
    [error-label (:name-clash errors-set)
     "Server with this name already exists"]]

   [:div
    [:label "URL"]
    [:br]
    [components.input/input {:placeholder "URL"
                             :value       base-url
                             :on-change   #(dispatch [::c/update-fhir-server-input
                                                      [:base-url] (target-value %)])}]]
   (when fhir-version
     [:div
      [:label (str "FHIR version: " fhir-version)]])])

(defn header-line [k v idx]
  ^{:key idx}
  [:> Row
   [components.input/input {:value     k
                            :style     {:width "50%"}
                            :on-change #(dispatch [::c/update-fhir-server-input
                                                   [:headers idx :name] (target-value %)])}]
   [components.input/input {:value     v
                            :style     {:width "50%"}
                            :on-change #(dispatch [::c/update-fhir-server-input
                                                   [:headers idx :value] (target-value %)])}]])

(defn request-headers-tab [{:keys [headers] :as _fhir-server}]
  [:div
   (map-indexed (fn [idx header] (header-line (:name header) (:value header) idx))
                headers)
   [button/add "Add" {:on-click #(dispatch [::c/add-fhir-server-header])
                      :style    {:width "100%"}}]])

(defn fhir-config-form [fhir-server errors-set]
  [tabs/tabs
   {:items [(tabs/tab-item {:key      "Request settings"
                            :label    "Request settings"
                            :children [request-settings-tab fhir-server errors-set]
                            :icon     (r/create-element icons/EditOutlined)})
            (tabs/tab-item {:key      "Request Headers"
                            :label    "Request Headers"
                            :children [request-headers-tab fhir-server]
                            :icon     (r/create-element icons/SettingOutlined)})]}])

(defn some-empty-fields? [{:keys [server-name base-url]}]
  (or (str/blank? server-name)
      (str/blank? base-url)))

(defn name-exists? [server-name existing-servers original-server]
  (and (->> existing-servers
            (medley/find-first #(-> % :server-name (= server-name)))
            boolean)
       (or (not (:server-name original-server)) ; add mode
           (not= (:server-name original-server) server-name))))

(defn modal-view []
  (let [original-server @(subscribe [::m/original-server])
        fhir-server @(subscribe [::m/fhir-server-config])
        existing-servers @(subscribe [::m/existing-servers])
        edit? (:server-name original-server)
        errors-set (cond-> #{}
                     (some-empty-fields? fhir-server) (conj :empty-field)
                     (name-exists? (:server-name fhir-server) existing-servers original-server) (conj :name-clash))]
    [:> Modal {:open      (boolean original-server)
               :title     (if edit? "Edit server" "Add server")
               :ok-text   (if edit? "Confirm" "Add")
               :on-ok     #(dispatch [::c/add-server fhir-server])
               :ok-button-props {:disabled (not-empty errors-set)}
               :on-cancel #(dispatch [::c/cancel-edit])}
     [fhir-config-form fhir-server errors-set]]))

(defn connect [server-config request-sent-by used-server-name connect-error]
  (cond
    (and connect-error (= (:server-name server-config) (:server-name connect-error)))
    [:div
     [:label {:style {:color "red"}} (:status-text (:result connect-error))]
     " "
     [:a {:onClick #(dispatch [::c/connect server-config])} "connect"]]

    (-> server-config :server-name (= request-sent-by))
    [:label {:style {:color "lightgrey"}} "connecting..."]

    (-> server-config :server-name (= used-server-name))
    [:label {:style {:color "green"}} "connected"]

    :else
    [:a {:onClick #(dispatch [::c/connect server-config])} "connect"]))

(defn delete-server-modal [server-name]
  (modal/modal-confirm
   {:title   "Delete ViewDefinition"
    :ok-text "Delete"
    :on-ok   #(dispatch [::c/delete server-name])
    :content (r/as-element
              [:div
               (string-utils/format "Are you sure you want to delete server %s?" server-name)])}))

(defn- add-server-button [authorized?]
  (if authorized?
    [button/add "New server" {:on-click #(dispatch [::c/new-server])}]
    [auth-required [button/add "New server"] #(js/alert "TODO")]))

(defn server-list []
  (let [request-sent-by  @(subscribe [::m/request-sent-by])
        used-server-name @(subscribe [::m/used-server-name])
        connect-error    @(subscribe [::m/connect-error])
        authorized?      @(subscribe [::auth-model/authorized?])]
    [:div {:style {:max-width "768px"}}
     [:div {:style {:display         :flex
                    :justify-content :space-between
                    :align-items     :center
                    :width           "100%"}}
      [:h1 "Server list"]
      [add-server-button authorized?]]
     [modal-view]
     [components.list/data-list
      :dataSource @(subscribe [::m/existing-servers])
      :renderItem
      (fn [raw-item]
        (r/as-element
         (let [{:keys [server-name base-url] :as server-config}
               (js-obj->clj-map raw-item)]
           [:> List.Item
            {:actions (let [common [(r/as-element [connect server-config request-sent-by used-server-name connect-error])]]
                        (if authorized?
                          (conj common
                                (r/as-element [:a {:onClick #(dispatch [::c/start-edit server-config])} "edit"])
                                (r/as-element [:a {:onClick #(delete-server-modal server-name)} "delete"]))
                          common))}
            [:> List.Item.Meta
             {:title
              (r/as-element
               [:a {:onClick #(dispatch [::c/start-edit server-config])}
                server-name])
              :description base-url}]])))]]))

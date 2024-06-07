(ns vd-designer.pages.lists.settings.components.modal
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Modal Row]]
            [clojure.string :as str]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.components.button :as button]
            [vd-designer.components.input :as components.input]
            [vd-designer.components.tabs :as tabs]
            [vd-designer.pages.lists.settings.controller :as c]
            [vd-designer.pages.lists.settings.model :as m]
            [vd-designer.utils.event :refer [target-value]]))

(defn- error-label [visible? text]
  [:label {:hidden (not visible?)
           :style  {:color     "red"
                    :font-size "10px"}} text])

(defn- request-settings-tab [{:keys [server-name box-url fhir-version]} errors-set]
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
                             :value       box-url
                             :on-change   #(dispatch [::c/update-fhir-server-input
                                                      [:box-url] (target-value %)])}]]
   (when fhir-version
     [:div
      [:label (str "FHIR version: " fhir-version)]])])

(defn- header-line [k v idx]
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

(defn- request-headers-tab [{:keys [headers] :as _fhir-server}]
  [:div
   (map-indexed (fn [idx header] (header-line (:name header) (:value header) idx))
                headers)
   [button/add "Add" {:on-click #(dispatch [::c/add-fhir-server-header])
                      :style    {:width "100%"}}]])

(defn- fhir-config-form [fhir-server errors-set]
  [tabs/tabs
   {:items [(tabs/tab-item {:key      "Request settings"
                            :label    "Request settings"
                            :children [request-settings-tab fhir-server errors-set]
                            :icon     (r/create-element icons/EditOutlined)})
            (tabs/tab-item {:key      "Request Headers"
                            :label    "Request Headers"
                            :children [request-headers-tab fhir-server]
                            :icon     (r/create-element icons/SettingOutlined)})]}])

(defn- some-empty-fields? [{:keys [server-name box-url]}]
  (or (str/blank? server-name)
      (str/blank? box-url)))

;; (defn- name-exists? [server-name existing-servers original-server]
;;   (and (->> existing-servers
;;             (medley/find-first #(-> % :server-name (= server-name)))
;;             boolean)
;;        (or (not (:server-name original-server)) ; add mode
;;            (not= (:server-name original-server) server-name))))

(defn modal-view []
  (let [original-server @(subscribe [::m/original-server])
        fhir-server @(subscribe [::m/fhir-server-config])
        edit? (:server-name original-server)
        errors-set (cond-> #{}
                     (some-empty-fields? fhir-server) (conj :empty-field))]
    [:> Modal {:open            (boolean original-server)
               :title           (if edit? "Edit server" "Add server")
               :ok-text         (if edit? "Confirm" "Add")
               :ok-button-props {:disabled (not-empty errors-set)}
               :on-cancel       #(dispatch [::c/cancel-edit])}
     [fhir-config-form fhir-server errors-set]]))

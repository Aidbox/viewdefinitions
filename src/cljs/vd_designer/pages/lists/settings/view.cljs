(ns vd-designer.pages.lists.settings.view
  (:require
   [antd :refer [Card Flex Form Input List Modal Typography Row Col Space]]
   [medley.core :as medley]
   [re-frame.core :refer [dispatch dispatch-sync subscribe]]
   [reagent.core :as r]
   [vd-designer.components.button :as button]
   [vd-designer.components.modal :as modal]
   [vd-designer.utils.string :as string-utils]
   [vd-designer.auth.model :as auth-model]
   [vd-designer.components.list :as components.list]
   [vd-designer.components.form :as form-components]
   [vd-designer.pages.lists.settings.controller :as c]
   [vd-designer.pages.lists.settings.model :as m]
   [vd-designer.utils.react :refer [js-obj->clj-map]]))

(defn connect [server-config request-sent-by chosen-server connect-error]
  (cond
    (and connect-error (= (:server-name server-config)
                          (:server-name connect-error)))
    [:a {:onClick #(dispatch [::c/connect server-config])} "connect"]

    (-> server-config :server-name (= request-sent-by))
    [:label {:style {:color "lightgrey"}} "connecting..."]

    (and
     (-> server-config :server-name (= (:server-name chosen-server)))
     (= (:type server-config) (:type chosen-server)))
    [:label {:style {:color "green"}} "connected"]

    :else
    [:a {:onClick #(dispatch [::c/connect server-config])} "connect"]))

(defn save-changes [new-settings edit? old-settings]
  (let [new-settings
        (medley/remove-vals
         nil?
         (js->clj new-settings :keywordize-keys true))
        old-settings (dissoc (medley/map-keys keyword old-settings) :headers)]
    (if edit?
      (dispatch-sync [::c/update-server old-settings new-settings])
      (dispatch-sync [::c/new-server new-settings]))))

(def aidbox-getting-started-locally-url
  "https://docs.aidbox.app/getting-started/run-aidbox-locally-with-docker")

;; here we explicitly distinguish add-server modal and edit-server modal
;; ant-design Form somehow caches initial-values,
;; which causes bugs when not distinguish add and edit
(defn server-form [edit? form-header initial-values on-close]
  [form-components/settings-base-form form-header
   {:onFinish #(save-changes % edit? initial-values)
    :initialValues (or initial-values {})
    :labelCol {:span 4}
    :style {:width "600px"}}
   on-close
   [:<>
    [:> Form.Item {:label "Server name" :name "server-name"
                   :rules [{:required true}]}
     [:> Input]]
    [:> Form.Item {:label "URL" :name "box-url"
                   :rules [{:required true}]}
     [:> Input]]
    [:> Form.Item {:label "Headers" :name "headers"}
     [form-components/form-list "headers"
      (fn [element-key]
        [:> Row {:gutter 5}
         [:> Col {:span 12}
          [:> Form.Item {:name  [element-key "name"]
                         :rules [{:required true
                                  :message  "Name is required"}]}
           [:> Input {:placeholder "Name"}]]]
         [:> Col {:span 12}
          [:> Form.Item {:name  [element-key "value"]
                         :rules [{:required true
                                  :message  "Value is required"}]}
           [:> Input {:placeholder "Value"}]]]])]]

    [:a {:href aidbox-getting-started-locally-url} "Aidbox Getting started locally guide"]]])

(defn change-server-modal-on-close []
  (dispatch-sync [::c/set-editable-server nil])
  (dispatch-sync [::c/close-server-form]))

(defn add-server-modal []
  (let [server-form-opened? @(subscribe [::m/add-server-form-opened])]
    [:> Modal {:open server-form-opened?
               :footer    nil
               :width 650
               :style {:width 1000}
               :on-cancel change-server-modal-on-close}
     [server-form false "New Server" {} change-server-modal-on-close]]))

(defn update-server-modal []
  (let [server-form-opened? @(subscribe [::m/update-server-form-opened])
        editable-server @(subscribe [::m/editable-server-ant])]
    ^{:key (random-uuid)}
    [:> Modal {:open (and server-form-opened? editable-server)
               :footer    nil
               :width 650
               :style {:width 1000}
               :on-cancel change-server-modal-on-close}
     [server-form true "Edit Server" editable-server change-server-modal-on-close]]))

(defn delete-server-modal [server-config]
  (modal/modal-confirm
   {:title   "Delete Server"
    :ok-text "Delete"
    :onOk    #(dispatch [::c/delete-custom-server server-config])
    :content (r/as-element
              [:div (string-utils/format "Are you sure you want to delete %s?" (:server-name server-config))])}))

(defn server-list []
  (let [request-sent-by  @(subscribe [::m/request-sent-by])
        chosen-server    @(subscribe [::m/chosen-server])
        connect-error    @(subscribe [::m/connect-error])
        portal-servers   @(subscribe [::m/portal-servers])
        public-servers   @(subscribe [::m/public-servers])
        custom-servers   @(subscribe [::m/custom-servers])
        authorized?      @(subscribe [::auth-model/authorized?])]
    [:<>
     [add-server-modal]
     [update-server-modal]
     [:> Flex {:align   :center
               :justify :space-between}
      [:> Typography.Title {:level 1 :style {:margin-top 0}} "Server list"]]

     (when authorized?
       [:> Card {:title  (r/as-element
                          [:> Flex {:justify :space-between}
                           "User servers"
                           [button/add "New server" {:on-click
                                                     #(dispatch [::c/open-add-server-form])}]])
                 :key    "user-servers"
                 :style  {:margin-bottom "24px"}
                 :styles {:body {:padding-top    0
                                 :padding-bottom 0}}}
        (when (and custom-servers (seq custom-servers))
          [:<>
           [components.list/data-list
            {:dataSource (sort-by :server-name custom-servers)
             :renderItem (fn [raw-item]
                           (r/as-element
                            (let [{:keys [server-name box-url]
                                   :as   server-config}
                                  (js-obj->clj-map raw-item)]
                              [:> List.Item
                               {:actions [(r/as-element
                                           [:> Row
                                            [:> Space
                                             [:a
                                              {:on-click #(dispatch [::c/open-update-server-form server-config])}
                                              "edit"]
                                             [:a
                                              {:on-click
                                               #(delete-server-modal server-config)}
                                              "delete"]
                                             [connect (merge {:type :custom-servers} server-config)
                                              request-sent-by chosen-server connect-error]]])]}
                               [:> List.Item.Meta
                                {:title server-name
                                 :description (r/as-element [:a {:href   box-url
                                                                 :target "_blank"}
                                                             box-url])}]])))}]])])

     (when portal-servers
       (for [project portal-servers]
         (let [licenses (:boxes project)
               project-name (:name project)]
           ^{:key (:id project)}
           [:> Card {:title  (r/as-element
                              [:> Flex {:justify :space-between}
                               project-name
                               (when-let [new-license-url
                                          (some-> project :new-license-url)]
                                 [button/add "New server" {:href   new-license-url
                                                           :target "_blank"}])])
                     :key    project-name
                     :style  {:margin-bottom "24px"}
                     :styles {:body {:padding-top    0
                                     :padding-bottom 0}}}
            (when (seq licenses)
              [components.list/data-list
               {:dataSource (sort-by :server-name licenses)
                :renderItem (fn [raw-item]
                              (r/as-element
                               (let [{:keys [server-name box-url]
                                      :as   server-config}
                                     (js-obj->clj-map raw-item)]
                                 [:> List.Item
                                  {:actions [(r/as-element [connect (merge
                                                                     server-config
                                                                     {:type :portal-servers
                                                                      :project-id (:id project)})
                                                            request-sent-by
                                                            chosen-server
                                                            connect-error])]}
                                  [:> List.Item.Meta
                                   (cond->
                                    {:title server-name}

                                     (not (m/sandbox? server-config))
                                     (assoc
                                      :description (r/as-element [:a {:href   box-url
                                                                      :target "_blank"}
                                                                  box-url])))]])))}])])))

     (when public-servers
       (let [project-name "Public servers"]
         ^{:key project-name}
         [:> Card {:title  (r/as-element
                            [:> Flex {:justify :space-between}
                             project-name])
                   :key    project-name
                   :style  {:margin-bottom "24px"}
                   :styles {:body {:padding-top    0
                                   :padding-bottom 0}}}
          [components.list/data-list
           {:dataSource (sort-by :server-name public-servers)
            :renderItem (fn [raw-item]
                          (r/as-element
                           (let [{:keys [server-name box-url]
                                  :as   server-config}
                                 (js-obj->clj-map raw-item)]
                             [:> List.Item
                              {:actions [(r/as-element [connect (merge server-config {:type :public-servers})
                                                        request-sent-by chosen-server connect-error])]}
                              [:> List.Item.Meta
                               (cond->
                                {:title server-name}

                                 (not (m/sandbox? server-config))
                                 (assoc
                                  :description (r/as-element [:a {:href   box-url
                                                                  :target "_blank"}
                                                              box-url])))]])))}]]))]))

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

(defn connect [server-config request-sent-by used-server-name connect-error]
  (cond
    (and connect-error (= (:server-name server-config)
                          (:server-name connect-error)))
    [:a {:onClick #(dispatch [::c/connect server-config])} "connect"]

    (-> server-config :server-name (= request-sent-by))
    [:label {:style {:color "lightgrey"}} "connecting..."]

    (-> server-config :server-name (= used-server-name))
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
      (dispatch-sync [::c/new-server new-settings]))
    (dispatch-sync [::c/close-server-form])))

(defn server->ant-form-format [server]
  (->> (update server :headers
               (fn [headers]
                 (mapv
                   (fn [[header-name header-value]]
                     {:name header-name
                      :value header-value})
                   headers)))
       (map (fn [[k v]] [(name k) v]))
       (into {})))

(defn add-or-update-server-modal [edit?]
  (let [server-form-opened? @(subscribe [::m/server-form-opened])
        ;; edit?
        form-header (if edit? "Edit Server" "New Server")
        editable-server @(subscribe [::m/editable-server])
        initial-values
        (if edit?
          (server->ant-form-format editable-server)
          {:headers [{"name" "Authorization"
                      "value" "Basic"}]})
        on-close
        (fn [_]
          (dispatch [::c/set-editable-server nil])
          (dispatch [::c/close-server-form]))]
    [:> Modal {:open server-form-opened?
               :footer    nil
               :width 650
               :style {:width 1000}
               :on-cancel on-close}

     [form-components/settings-base-form form-header
      {:onFinish #(save-changes % edit? initial-values)
       :initialValues initial-values
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
              [:> Input {:placeholder "Value"}]]]])]]]]]))

(defn delete-server-modal [server-config]
  (modal/modal-confirm
    {:title   "Delete Server"
     :ok-text "Delete"
     :onOk    #(dispatch [::c/delete-custom-server server-config])
     :content (r/as-element
                [:div (string-utils/format "Are you sure you want to delete %s?" (:server-name server-config))])}))

(defn server-list []
  (let [request-sent-by  @(subscribe [::m/request-sent-by])
        used-server-name @(subscribe [::m/used-server-name])
        connect-error    @(subscribe [::m/connect-error])
        portal-boxes     @(subscribe [::m/portal-boxes-groupped-project])
        custom-servers   @(subscribe [::m/custom-servers-vec])
        authorized?      @(subscribe [::auth-model/authorized?])
        edit-form? @(subscribe [::m/server-form-edit?])]
    [:<>
     [:> Flex {:align   :center
               :justify :space-between}
      [:> Typography.Title {:level 1 :style {:margin-top 0}} "Server list"]]
     [add-or-update-server-modal edit-form?]

     (when authorized?
       [:> Card {:title  (r/as-element
                           [:> Flex {:justify :space-between}
                            "User servers"
                            [button/add "New server" {:on-click #(dispatch [::c/open-server-form])}]])
                 :key    "user-servers"
                 :style  {:margin-bottom "24px"}
                 :styles {:body {:padding-top    0
                                 :padding-bottom 0}}}
        (when custom-servers
          [components.list/data-list
           {:dataSource custom-servers
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
                                               {:on-click #(dispatch [::c/open-server-form server-config])}
                                               "edit"]
                                              [:a
                                               {:on-click
                                                #(delete-server-modal server-config)
                                                 }
                                               "delete"]
                                              [connect server-config request-sent-by used-server-name connect-error]]])]}
                               [:> List.Item.Meta
                                {:title server-name
                                 :description (r/as-element [:a {:href   box-url
                                                                 :target "_blank"}
                                                             box-url])}]])))}])])

     (when portal-boxes
       (for [[project-name project-licenses] portal-boxes]
         (let [project-name (or project-name "Public servers")]
           ^{:key project-name}
           [:> Card {:title  (r/as-element
                               [:> Flex {:justify :space-between}
                                project-name
                                (when-let [new-license-url
                                           (some-> portal-boxes
                                                   (get project-name)
                                                   first :project
                                                   :new-license-url)]
                                  [button/add "New server" {:href   new-license-url
                                                            :target "_blank"}])])
                     :key    project-name
                     :style  {:margin-bottom "24px"}
                     :styles {:body {:padding-top    0
                                     :padding-bottom 0}}}
            [components.list/data-list
             {:dataSource project-licenses
              :renderItem (fn [raw-item]
                            (r/as-element
                              (let [{:keys [server-name box-url]
                                     :as   server-config}
                                    (js-obj->clj-map raw-item)]
                                [:> List.Item
                                 {:actions [(r/as-element [connect server-config request-sent-by used-server-name connect-error])]}
                                 [:> List.Item.Meta
                                  (cond->
                                    {:title server-name}

                                    (not (m/sandbox? server-config))
                                    (assoc
                                      :description (r/as-element [:a {:href   box-url
                                                                      :target "_blank"}
                                                                  box-url])))]])))}]])))]))

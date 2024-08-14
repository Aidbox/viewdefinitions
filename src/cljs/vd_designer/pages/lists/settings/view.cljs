(ns vd-designer.pages.lists.settings.view
  (:require
   [antd :refer [Card Flex Form Input List Modal Typography Row Space]]
   [medley.core :as medley]
   [re-frame.core :refer [dispatch dispatch-sync subscribe]]
   [reagent.core :as r]
   [vd-designer.components.button :as button]
   [vd-designer.components.list :as components.list]
   [vd-designer.components.form :as form-components]
   [vd-designer.pages.lists.settings.controller :as c]
   [vd-designer.pages.lists.settings.model :as m]
   [vd-designer.utils.react :refer [js-obj->clj-map]]))

(defn connect [server-config request-sent-by used-server-name connect-error]
  (cond
    (and connect-error (= (:server-name server-config)
                          (:server-name connect-error)))
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

(defn save-popover [values]
  (let [fields (medley/remove-vals nil? (js->clj values :keywordize-keys true))]
    ;; TODO: !
    (println "fields" fields)
    ;; (dispatch-sync [:: value-path fields])
    (dispatch-sync [::c/close-server-form])))

(defn server-list []
  (let [request-sent-by  @(subscribe [::m/request-sent-by])
        used-server-name @(subscribe [::m/used-server-name])
        connect-error    @(subscribe [::m/connect-error])
        fhir-servers     @(subscribe [::m/user-servers])
        server-form-opened? @(subscribe [::m/server-form-opened])
        user-servers [{:box-url "url1" :server-name "name1"
                       :headers [{:Authorization "Basic mytoken"}]}
                      {:box-url "url2" :server-name "name2"
                       :headers [{:Authorization "Basic ..."}]}]]
    [:<>
     [:> Flex {:align   :center
               :justify :space-between}
      [:> Typography.Title {:level 1 :style {:margin-top 0}} "Server list"]]

     [:> Modal {:open server-form-opened?
                :footer    nil
                :width 650
                :style {:width 1000}
                :on-cancel #(dispatch [::c/close-server-form])}

      [form-components/settings-base-form "New Server"
       {:onFinish #(save-popover %)
        :initialValues {"server-name" "123"
                        "box-url" "2454"
                        :headers [{"name" "Authorization"
                                    "value" "Basic"}] }
        :labelCol {:span 4}
        :style {:width "600px"}}
       #(dispatch [::c/close-server-form])
       [:<>
        [:> Form.Item {:label "server-name" :name "server-name"} [:> Input]]
        [:> Form.Item {:label "box-url" :name "box-url"} [:> Input]]
        [:> Form.Item {:label "Headers" :name "headers"}
         [form-components/form-list "headers"
          (fn [element-key]
            [:> Row
             [:> Space
              [:> Form.Item {:name  [element-key "name"]
                             :rules [{:required true
                                      :message  "Name is required"}]}
               [:> Input {:placeholder "Name"}]]
              [:> Form.Item {:name  [element-key "value"]
                             :rules [{:required true
                                      :message  "Value is required"}]}
               [:> Input {:placeholder "Value"}]]]])]]]]]

     [:> Card {:title  (r/as-element
                         [:> Flex {:justify :space-between}
                          "User servers"
                          [button/add "New server" {:on-click #(dispatch [::c/open-server-form])}]])
               :key    "user-servers"
               :style  {:margin-bottom "24px"}
               :styles {:body {:padding-top    0
                               :padding-bottom 0}}}
      [components.list/data-list
       {:dataSource user-servers
        :renderItem (fn [raw-item]
                      (r/as-element
                        (let [{:keys [server-name box-url]
                               :as   server-config}
                              (js-obj->clj-map raw-item)]
                          [:> List.Item
                           {:actions [(r/as-element [connect server-config request-sent-by used-server-name connect-error])]}
                           [:> List.Item.Meta
                            {:title (str server-name " " box-url)
                             :description (r/as-element [:a {:href   box-url
                                                             :target "_blank"}
                                                         box-url])}]])))}]]

     (for [[project-name project-licenses] fhir-servers]
       (let [project-name (or project-name "Public servers")]
         ^{:key project-name}
         [:> Card {:title  (r/as-element
                            [:> Flex {:justify :space-between}
                             project-name
                             (when-let [new-license-url
                                        (some-> fhir-servers
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
                                                               box-url])))]])))}]]))]))

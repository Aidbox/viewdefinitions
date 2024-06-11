(ns vd-designer.pages.lists.settings.view
  (:require [antd :refer [Card Flex List Typography]]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.components.button :as button]
            [vd-designer.components.list :as components.list]
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

(defn server-list []
  (let [request-sent-by  @(subscribe [::m/request-sent-by])
        used-server-name @(subscribe [::m/used-server-name])
        connect-error    @(subscribe [::m/connect-error])
        fhir-servers     @(subscribe [::m/user-servers])]
    [:<>
     [:> Flex {:align   :center
               :justify :space-between}
      [:> Typography.Title {:level 1 :style {:margin-top 0}} "Server list"]]
     #_[modal-view]
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

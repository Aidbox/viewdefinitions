(ns vd-designer.index
  (:require ["@ant-design/icons" :as icons]
            [reitit.frontend.easy :as rfe]
            [day8.re-frame.http-fx]
            [re-frame.core :as re-frame :refer [dispatch
                                                reg-event-db reg-event-fx
                                                reg-sub subscribe]]
            [reagent.core :as r]
            [reagent.dom.client :as rdom-client]
            [vd-designer.components.layout :refer [layout]]
            [vd-designer.pages.vd-form.model :as vd-form.model]
            [vd-designer.pages.vd-form.view]
            [vd-designer.pages.vd-list.view]
            [vd-designer.pages.settings.view]
            [vd-designer.routes :as routes]))

;;;; Layout

(reg-event-db
 ::toggle-side-menu
 (fn [db []]
   (assoc-in db [:side-menu-collapsed] (not (:side-menu-collapsed db)))))

(reg-sub
 ::side-menu-collapsed
 (fn [db _]
   (:side-menu-collapsed db)))

(defn breadcrumbs [route]
  (let [current-vd @(subscribe [::vd-form.model/current-vd])
        m {:vd-list  [{:title "View Definitions"}]
           :settings [{:title "Settings"}]
           :form-edit [{:title "View Definitions", :href "/"}
                       {:title (:name current-vd)}]
           :form-create [{:title "View Definitions", :href "/"}
                         {:title "New"}]}]
    (m route)))

;;;; Initialization

(def default-servers {"Aidbox Default"
                      ; read all, delete ViewDefinitions, eval VD rpc
                      ; we do not want to let people create view definitions because they are
                      ; materialized when created
                      {:server-name "Aidbox Default"
                       :base-url    "https://viewdefs.aidbox.app/fhir"
                       :headers     {:Authorization "Basic YmFzaWM6dmlld2RlZmluaXRpb25z"}}

                      ; read all, delete+create+update ViewDefinitions, eval VD rpc
                      "Aidbox Default 2"
                      {:server-name "Aidbox Default 2"
                       :base-url    "https://viewdefinitions.edge.aidbox.app/fhir"
                       :headers     {:Authorization "Basic YmFzaWM6dmlld2RlZmluaXRpb25z"}}})

(reg-event-fx
  ::initialize-db
  (fn [{:keys [db]} _]
    (if (seq db)
      {:db db}
      {:db {:view-definitions    []
            :mode                :form
            :side-menu-collapsed false
            :cfg/fhir-servers    {:servers  default-servers
                                  :used-server-name (-> default-servers
                                                        first
                                                        second
                                                        :server-name)}}})))

(defn current-page []
  (let [route @routes/match
        current-route (-> route :data :name)]
    [layout
     {:collapsed @(subscribe [::side-menu-collapsed])
      :on-collapse #(dispatch [::toggle-side-menu])
      :on-menu-click (fn [key]
                       (rfe/navigate (keyword key)))
      :menu-active-key (when current-route (name current-route))
      :menu [{:key "vd-list"
              :label "ViewDefinitions"
              :icon (r/create-element icons/DatabaseOutlined)}
             {:key "settings"
              :label "Settings"
              :icon (r/create-element icons/SettingOutlined)}
             {:key "3" :label "Docs" :icon (r/create-element icons/BookOutlined)}]
      :breadcrumbs (breadcrumbs current-route)}
     (if route
       [:div
        (let [view (:view (:data route))]
          [view @routes/match])]
       [:div "Page not found"])]))

(defonce root-element (rdom-client/create-root (.getElementById js/document "app")))

(defn init []
  (routes/start-reitit)
  (re-frame/dispatch-sync [::initialize-db])
  (.render root-element (r/as-element [current-page])))

(defn ^:dev/after-load re-render []
  (re-frame/clear-subscription-cache!)
  (init))


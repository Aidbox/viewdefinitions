(ns vd-designer.index
  (:require ["@ant-design/icons" :as icons]
            [day8.re-frame.http-fx]
            [re-frame.core :refer [clear-subscription-cache! dispatch-sync
                                   inject-cofx reg-event-fx subscribe]]
            [reagent.core :as r]
            [reagent.dom.client :as rdom-client]
            [reitit.frontend.easy :as rfe]
            [vd-designer.components.layout :refer [layout]]
            [vd-designer.notifications]
            [vd-designer.auth.controller :as auth.controller]
            [vd-designer.pages.settings.view]
            [vd-designer.pages.vd-form.model :as vd-form.model]
            [vd-designer.pages.vd-form.view]
            [vd-designer.pages.vd-list.view]
            [vd-designer.routes :as routes]))

;;;; Layout

(defn breadcrumbs [route]
  (let [current-vd @(subscribe [::vd-form.model/current-vd])
        m {:vd-list     [{:title "View Definitions"}]
           :settings    [{:title "Settings"}]
           :form-edit   [{:title "View Definitions", :href "/"}
                         {:title (:name current-vd)}]
           :form-create [{:title "View Definitions", :href "/"}
                         {:title "New"}]}]
    (m route)))


;;;; Initialization

(reg-event-fx
  ::initialize-db
  [(inject-cofx :get-authentication-token)]
  (fn [{:keys [db authentication-token]} _]
    (if (seq db)
      {:db db}
      {:db {:view-definitions    []
            :side-menu-collapsed false
            :authorized?         (boolean authentication-token)
            :cfg/fhir-servers    {:used-server-name nil}}})))

(defn current-page []
  (let [route @routes/match
        current-route (-> route :data :name)]
    [layout
     {:on-menu-click   (fn [key]
                         (rfe/navigate (keyword key)))
      :menu-active-key (when current-route (name current-route))
      :menu            [{:key  "vd-list"
                         :icon (r/create-element icons/DatabaseOutlined)
                         :size 64}
                        {:key  "settings"
                         :icon (r/create-element icons/SettingOutlined)
                         :size 64}
                        #_{:key "3" :icon (r/create-element icons/BookOutlined)}]
      :breadcrumbs     (breadcrumbs current-route)}
     (if route
       (let [view (:view (:data route))]
         [view @routes/match])
       [:div "Page not found"])]))

(defonce root-element (rdom-client/create-root (.getElementById js/document "app")))

(def functional-compiler
  "https://github.com/reagent-project/reagent/blob/master/doc/ReagentCompiler.md"
  (reagent.core/create-compiler {:function-components true}))

(defn init []
  (routes/start-reitit)
  (dispatch-sync [::initialize-db])
  (dispatch-sync [::auth.controller/store-authentication (:query-params @routes/match)])
  (rdom-client/render root-element (r/as-element [(fn [] current-page)]) functional-compiler))

(defn ^:dev/after-load re-render []
  (clear-subscription-cache!)
  (init))

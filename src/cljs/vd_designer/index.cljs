(ns vd-designer.index
  (:require ["@ant-design/icons" :as icons]
            [day8.re-frame.http-fx]
            [re-frame.core :refer [clear-subscription-cache! dispatch-sync
                                   inject-cofx reg-event-fx subscribe]]
            [reagent.core :as r]
            [reagent.dom.client :as rdom-client]
            [reitit.frontend.easy :as rfe]
            [vd-designer.auth.controller :as auth.controller]
            [vd-designer.pages.layout :refer [layout]]
            [vd-designer.notifications]
            [vd-designer.pages.form.layout :as form]
            [vd-designer.pages.form.model :as vd-form.model]
            [vd-designer.pages.form.view]
            [vd-designer.pages.home.layout :as home]
            [vd-designer.pages.lists.layout :as lists]
            [vd-designer.pages.lists.settings.view]
            [vd-designer.pages.lists.vds.view]
            [vd-designer.utils.debounce]
            [vd-designer.utils.tag-manager :as tag-manager]
            [vd-designer.routes :as routes]))

;;;; Layout

(defn breadcrumbs [route]
  (let [current-vd @(subscribe [::vd-form.model/current-vd])
        home     {:title "Home"             :href "/"}
        vds      {:title "View Definitions" :href "/vds"}
        settings {:title "Settings"         :href "/settings"}

        m {:vd-list     [home (dissoc vds :href)]
           :settings    [home (dissoc settings :href)]
           :form-edit   [home vds {:title (:name current-vd)}]
           :form-create [home vds {:title "New"}]}]
    (m route)))


;;;; Initialization

(reg-event-fx
 ::initialize-db
 [(inject-cofx :get-authentication-token)
  (inject-cofx :get-chosen-server)]
 (fn [{:keys [db authentication-token chosen-server]} _]
   (if (seq db)
     {:db db}
     {:db {:view-definitions    []
           :onboarding          {:sandbox 0
                                 :aidbox  0}
           :authorized?         (boolean authentication-token)
           :cfg/fhir-servers    {:chosen-server chosen-server}}})))

(defn wrap-view-layout [route view]
  (let [breadcrumbs {:breadcrumbs (breadcrumbs route)}]
    (case (name route)
      "home"        (home/layout {} view)

      "form-edit"   (form/layout breadcrumbs view)
      "form-create" (form/layout breadcrumbs view)

      "vd-list"     (lists/layout breadcrumbs view)
      "settings"    (lists/layout breadcrumbs view))))

(defn current-page []
  (let [route @routes/match
        current-route (-> route :data :name)]
    [layout
     {:on-menu-click   (fn [key]
                         (cond
                           (= key :vd-list)
                           (tag-manager/data-layer
                             {:dataLayer {:event "vd_list"}})

                           (= key :settings)
                           (tag-manager/data-layer
                             {:dataLayer {:event "vd_servers"}}))

                         (rfe/navigate (keyword key)))
      :menu-active-key (when current-route (name current-route))
      :menu            [{:id   "vd_list"
                         :key  "vd-list"
                         :icon (r/create-element icons/UnorderedListOutlined)
                         :size 64}
                        {:id   "vd_servers"
                         :key  "settings"
                         :icon (r/create-element icons/SettingOutlined)
                         :size 64}
                        #_{:key  "3"
                           :icon (r/create-element icons/BookOutlined)}]}
     (if route
       (let [view (-> route :data :view)]
         (wrap-view-layout current-route [view @routes/match]))
       [:div "Page not found"])]))

(defonce root-element (rdom-client/create-root (.getElementById js/document "app")))

(def functional-compiler
  "https://github.com/reagent-project/reagent/blob/master/doc/ReagentCompiler.md"
  (reagent.core/create-compiler {:function-components true}))

(defn init []
  (tag-manager/init)
  (routes/start-reitit)
  (dispatch-sync [::initialize-db])
  (dispatch-sync [::auth.controller/store-authentication (:query-params @routes/match)])
  (rdom-client/render root-element (r/as-element [(fn [] current-page)]) functional-compiler))

(defn ^:dev/after-load re-render []
  (clear-subscription-cache!)
  (init))

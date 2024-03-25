(ns vd-designer.index
  (:require ["@ant-design/icons" :as icons]
            [day8.re-frame.http-fx]
            [re-frame.core :as re-frame :refer [dispatch dispatch-sync
                                                reg-event-db reg-event-fx
                                                reg-sub subscribe]]
            [reagent.core :as r]
            [reagent.dom :as rdom]
            [vd-designer.components.layout :as components]
            [vd-designer.pages.vd-form.view]
            [vd-designer.pages.vd-list.controller :as vd-list.controller]
            [vd-designer.pages.vd-list.view]
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

(defn prepare-menu-key [s]
  (str (namespace s) "/" (name s)))

(defn find-page []
  (let [route @(subscribe [::routes/active-page])]
    [components/layout
     {:collapsed @(subscribe [::side-menu-collapsed])
      :on-collapse #(dispatch [::toggle-side-menu])
      :on-menu-click (fn [key] (dispatch [::routes/navigate key]))
      :menu-active-key (subs (str route) 1)
      :menu [{:key (prepare-menu-key vd-list.controller/identifier)
              :label "ViewDefinitions"
              :icon (r/create-element icons/DatabaseOutlined)}
             {:key "2" :label "Settings" :icon (r/create-element icons/SettingOutlined)}
             {:key "3" :label "Docs" :icon (r/create-element icons/BookOutlined)}]
      :breadcrumbs [{:title "Home" :href "/"}
                    {:title "TODO"}]}
     (if route
       [:div
        (routes/pages route)]
       [:div "Page not found"])]))

;;;; Initialization

(def resources
  ["Patient" "Observation" "Practitioner"])

(reg-event-fx
 ::initialize-db
 (fn [_ _]
   {:db {:active-page ::vd-list.controller/main
         :resources resources
         :side-menu-collapsed false}}))

(def compiler
  (r/create-compiler {:function-components true}))

(defn ^:dev/after-load mount-root []
  (re-frame/clear-subscription-cache!)
  (let [root-el (.getElementById js/document "app")]
    (rdom/unmount-component-at-node root-el)
    (rdom/render [find-page] root-el compiler)))

(defn init []
  (re-frame/dispatch-sync [::initialize-db])
  (routes/start!)
  (mount-root))

(init)
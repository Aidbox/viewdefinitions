(ns viewdef-designer.index
  (:require ["@ant-design/icons" :as icons]
            [day8.re-frame.http-fx]
            [re-frame.core :as re-frame :refer [dispatch dispatch-sync
                                                reg-event-db reg-event-fx
                                                reg-sub subscribe]]
            [reagent.core :as r]
            [reagent.dom :as rdom]
            [viewdef-designer.components.layout :as components]
            [viewdef-designer.pages.view-definition.view]
            [viewdef-designer.pages.view-definitions.controller :as viewdefinition-list]
            [viewdef-designer.pages.view-definitions.view]
            [viewdef-designer.routes :as routes])
  (:require-macros [viewdef-designer.interop :refer [inline-resource]]))

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
      :menu [{:key (prepare-menu-key viewdefinition-list/identifier)
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
   {:db {:active-page ::viewdefinition-list/main
         :resources resources
         :patients (->
                    (.parse js/JSON (inline-resource "mock_patients.json"))
                    (js->clj :keywordize-keys true))
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

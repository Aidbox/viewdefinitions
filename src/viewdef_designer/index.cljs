(ns viewdef-designer.index
  (:require [re-frame.core :as re-frame :refer [reg-event-fx subscribe reg-sub dispatch]]
            [reagent.core :as r]
            [reagent.dom :as rdom]
            [day8.re-frame.http-fx]
            ; register pages
            [viewdef-designer.pages.view-definition.view]
            [viewdef-designer.pages.view-definitions.view]
            [viewdef-designer.pages.view-definitions.controller :as viewdefinition-list]

            [viewdef-designer.routes :as routes])
  (:require-macros [viewdef-designer.interop :refer [inline-resource]]))

(def compiler
  (r/create-compiler {:function-components true}))

(reg-sub
 ::sidebar
 (fn [_ _]
   {:menu
    {:items
     [#_{:title "Resources"
         :img   "/suitkin/img/icon/ic-workflow-16.svg"}

      {:title "FHIR servers"
       :img   "/suitkin/img/icon/ic-database-16.svg"
       :items [{:title "ViewDefinitions" :img "/suitkin/img/icon/ic-database-code-16.svg"
                :on-click #(dispatch [::routes/navigate ::viewdefinition-list/main])}
               {:title "Resources" :img "/suitkin/img/icon/ic-table-16.svg"}]}

      {:divider true}
      {:title "Settings" :img "/suitkin/img/icon/ic-users-16.svg"}

      {:title "Docs"
       :img   "/suitkin/img/icon/ic-notebook-play-16.svg"}
      {:space true}]}}))

(defn sidebar []
  (let [data @(subscribe [::sidebar])]
    [:div {:data-object :ig-sidebar}
     #_[ui/sidebar (assoc data
                          #_#_:class (c [:w "350px !important"]
                                        {:position "fixed"})
                          :logo [:img {:src (su/public-src "/assets/img/hs-logo.svg")}])]]))

(defn find-page
  []
  (let [route @(subscribe [::routes/active-page])]
    [:div
     [sidebar]
     (if route
       [:div
        (routes/pages route)]
       [:div "Page not found"])]))

(defn ^:dev/after-load mount-root []
  (re-frame/clear-subscription-cache!)
  (let [root-el (.getElementById js/document "app")]
    (rdom/unmount-component-at-node root-el)
    (rdom/render [find-page] root-el compiler)))

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
                    (js->clj :keywordize-keys true))}}))

(defn init []
  (re-frame/dispatch-sync [::initialize-db])
  (routes/start!)
  (mount-root))

(init)

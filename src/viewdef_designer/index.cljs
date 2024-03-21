(ns viewdef-designer.index
  (:require [re-frame.core :as re-frame :refer [reg-event-fx subscribe reg-sub dispatch]]
            [reagent.core :as r]
            [reagent.dom :as rdom]
            [suitkin.core :as ui]
            [suitkin.utils :as su]
            ; register pages
            [viewdef-designer.pages.main.view]
            [viewdef-designer.pages.view-definitions.view]

            [viewdef-designer.routes :as routes])
  (:require-macros [viewdef-designer.interop :refer [inline-resource]]
                   [stylo.core :refer [c]]))

(def compiler
  (r/create-compiler {:function-components true}))

(reg-sub
 ::sidebar
 (fn [_ _]
   {:menu

;; {:title "Users" :img "/suitkin/img/icon/ic-users-16.svg"}
;; {:title "SQL" :img "/suitkin/img/icon/ic-database-code-16.svg"}
    {:items
     [#_{:title "Resources"
         :img   "/suitkin/img/icon/ic-workflow-16.svg"}

      {:title "FHIR servers"
       :img   "/suitkin/img/icon/ic-database-16.svg"
       :items [{:title "ViewDefinitions" :img "/suitkin/img/icon/ic-database-code-16.svg"}
               {:title "Resources" :img "/suitkin/img/icon/ic-table-16.svg"}]}

      {:divider true}
      {:title "User" :img "/suitkin/img/icon/ic-users-16.svg"}

      {:title "Docs"
       :img   "/suitkin/img/icon/ic-notebook-play-16.svg"}
      {:space true}]}}))

(defn sidebar []
  (let [data @(subscribe [::sidebar])]
    [:div {:data-object :ig-sidebar :class (c {:z-index 100})}
     [ui/sidebar (assoc data
                        #_#_:class (c [:w "350px !important"]
                                  {:position "fixed"})
                        :logo [:img {:src (su/public-src "/assets/img/hs-logo.svg")}])]]))

(defn find-page
  []
  (if-let [route @(subscribe [::routes/active-page])]
    [:div {:class (c :flex [:mb 80]) :data-object ::main}
     [sidebar]
     [:div {:class (c [:ml "350px"])}
      (routes/pages route)]]
    [:div "Page not found"]))

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
   {:db {:active-page :main-page
         :resources resources
         :patients (->
                    (.parse js/JSON (inline-resource "mock_patients.json"))
                    (js->clj :keywordize-keys true))}
    #_#_:fx [[:dispatch  [::some-event]]]}))

(defn init []
  (routes/start!)
  (re-frame/dispatch-sync [::initialize-db])
  (mount-root))

(init)

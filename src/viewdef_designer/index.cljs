(ns viewdef-designer.index
  (:require [re-frame.core :as re-frame :refer [reg-event-fx subscribe reg-sub dispatch reg-event-db]]
            [reagent.core :as r]
            [reagent.dom :as rdom]
            [suitkin.core :as ui]
            [suitkin.utils :as su]
            [day8.re-frame.http-fx]
            [ajax.core :as ajax]
            ; register pages
            [viewdef-designer.pages.main.view]
            [viewdef-designer.pages.view-definitions.view]

            [viewdef-designer.routes :as routes])
  (:require-macros [viewdef-designer.interop :refer [inline-resource]]
                   [stylo.core :refer [c]]))

(def compiler
  (r/create-compiler {:function-components true}))

(reg-event-db
 ::got-view-definitions
 (fn [db [_ result]]
  (assoc db
         :view-definitions result
         :loading false)))

(reg-event-fx
  ::get-view-definitions
  (fn [{:keys [db]} _]
   {:db (assoc db :loading true)
     :http-xhrio {:method          :get
                  :uri             "https://viewdefs1.aidbox.app/fhir/ViewDefinition"
                  :timeout         8000
                  :with-credentials true
                  :headers  {:Authorization
                             "Basic dmlldy1kZWZpbml0aW9uOnNlY3JldA=="}
                  :response-format (ajax/json-response-format {:keywords? true})
                  :on-success      [::got-view-definitions]
                  :on-failure      [:bad-http-result]}}))

(reg-event-fx
  ::go-to-vd-page-and-load
  (fn [{:keys [db]} _]
   {:db (assoc db :loading true)
    ::routes/navigate :vd
    :dispatch-n [[::get-view-definitions]
                 #_[::routes/set-active-page :vd-page]] }))

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
                :on-click #(dispatch [::go-to-vd-page-and-load])}
               {:title "Resources" :img "/suitkin/img/icon/ic-table-16.svg"}]}

      {:divider true}
      {:title "Settings" :img "/suitkin/img/icon/ic-users-16.svg"}

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
   {:db {:active-page :vd-page
         :resources resources
         :patients (->
                    (.parse js/JSON (inline-resource "mock_patients.json"))
                    (js->clj :keywordize-keys true))}
    :fx [#_[:dispatch  [::some-event]]
         [:dispatch [::get-view-definitions]]]}))

(defn init []
  (re-frame/dispatch-sync [::initialize-db])
  (routes/start!)
  (mount-root))

(init)

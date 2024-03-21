(ns viewdef-designer.index
  (:require [re-frame.core :as re-frame :refer [reg-event-fx subscribe]]
            [reagent.core :as r]
            [reagent.dom :as rdom]
            [viewdef-designer.routes :as routes])
  (:require-macros [viewdef-designer.interop :refer [inline-resource]]))

(def compiler
  (r/create-compiler {:function-components true}))

(defn find-page
  []
  (if-let [route @(subscribe [::routes/active-page])]
    (routes/pages route)
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

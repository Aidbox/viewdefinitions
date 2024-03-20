(ns viewdef-designer.index
  (:require [re-frame.core :as re-frame :refer [reg-event-fx reg-sub]]
            [reagent.core :as r]
            [reagent.dom :as rdom]
            [viewdef-designer.routes :as routes]
            [viewdef-designer.pages.main.view :as main])
  (:require-macros [viewdef-designer.interop :refer [inline-resource]]))

(def compiler
  (r/create-compiler {:function-components true}))

(defn ^:dev/after-load mount-root []
  (re-frame/clear-subscription-cache!)
  (let [root-el (.getElementById js/document "app")]
    (rdom/unmount-component-at-node root-el)
    (rdom/render [main/main-view] root-el compiler)))

;;;; Initialization

(def resources
  #{"Patient" "Observation" "Practitioner"})

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
  (re-frame/dispatch [::initialize-db])
  (mount-root))

(init)

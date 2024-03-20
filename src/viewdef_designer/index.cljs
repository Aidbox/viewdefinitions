(ns viewdef-designer.index
  (:require [re-frame.core :as re-frame :refer [reg-event-fx]]
            [reagent.core :as r]
            [reagent.dom :as rdom]
            [viewdef-designer.config :as config]
            [viewdef-designer.routes :as routes]
            [viewdef-designer.pages.main :as pages]))

(defn dev-setup []
  (when config/debug?
    (println "dev mode")))

(def compiler
  (r/create-compiler {:function-components true}))

(defn ^:dev/after-load mount-root []
  (re-frame/clear-subscription-cache!)
  (let [root-el (.getElementById js/document "app")]
    (rdom/unmount-component-at-node root-el)
    (rdom/render [pages/main-page] root-el compiler)))


;;;; Initialization

(reg-event-fx
 ::initialize-db
 (fn [_ _]
   {:db {:active-page :main-page}
    #_#_:fx [[:dispatch  [::some-event]]]}))


(defn init []
  (routes/start!)

  (re-frame/dispatch [::initialize-db])
  (dev-setup)
  (mount-root))

(init)

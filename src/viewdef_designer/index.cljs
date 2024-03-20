(ns viewdef-designer.index
  (:require
   [reagent.dom :as rdom]
   [reagent.core :as r]
   [re-frame.core :as re-frame]
   [viewdef-designer.components.layout.events :as events]
   [viewdef-designer.routes :as routes]
   [viewdef-designer.components.layout.view.layout.core :as views]
   [viewdef-designer.config :as config]))

(defn dev-setup []
  (when config/debug?
    (println "dev mode")))

(def compiler
  (r/create-compiler {:function-components true}))

(defn ^:dev/after-load mount-root []
  (re-frame/clear-subscription-cache!)
  (let [root-el (.getElementById js/document "app")]
    (rdom/unmount-component-at-node root-el)
    (rdom/render [views/main-panel] root-el compiler)))

(defn init []
  (routes/start!)

  (re-frame/dispatch [::events/initialize-db])
  (dev-setup)
  (mount-root))

(init)

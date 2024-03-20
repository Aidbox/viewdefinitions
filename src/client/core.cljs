(ns client.core
  (:require
   [reagent.dom :as rdom]
   [reagent.core :as r]
   [re-frame.core :as re-frame]
   [client.events :as events]
   [client.routes :as routes]
   [client.views.core :as views]
   [client.config :as config]))

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

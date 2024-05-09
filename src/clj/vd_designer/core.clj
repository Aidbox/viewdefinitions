(ns vd-designer.core
  (:require
    [reitit.ring :as ring]
    [ring.adapter.jetty :as jetty]
    [vd-designer.web.routes.router :as r]))

;; Consider making this a function,
;; so we don't have to reload this namespace every time
;; routes are changing
(def app
  (ring/ring-handler
    (r/router)
    (ring/create-default-handler)))

(defn -main [& _]
  (jetty/run-jetty app {:port 8080})
  )

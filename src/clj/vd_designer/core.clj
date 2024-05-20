(ns vd-designer.core
  (:require [reitit.ring :as ring]
            [ring.adapter.jetty :as jetty]
            [vd-designer.web.routes.router :refer [router]]
            [vd-designer.kit :as kit]))

(def app
  (let [ctx (kit/mk-ctx)]
    (ring/ring-handler
     (router ctx)
     (ring/create-default-handler))))

(defonce server
  (let [port 8080]
    (println "Starting server on port" port)
    (jetty/run-jetty #'app {:port 8080, :join? false})))

(comment
  (.stop server)
  (.start server)
  (do
    (.stop server)
    (.start server))

  :rcf)

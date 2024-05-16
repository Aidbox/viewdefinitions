(ns vd-designer.core
  (:require
   [reitit.ring :as ring]
   [ring.adapter.jetty :as jetty]
   [vd-designer.web.routes.router :as r]))

(def app
  (ring/ring-handler
   (r/router)
   (ring/create-default-handler)))

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

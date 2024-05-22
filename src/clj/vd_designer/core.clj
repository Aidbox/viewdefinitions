(ns vd-designer.core
  (:require [reitit.ring :as ring]
            [ring.adapter.jetty :as jetty]
            [vd-designer.db.migrations :as migrate]
            [vd-designer.web.routes.router :refer [router]]
            [vd-designer.kit :as kit]))

(def ctx
  (kit/mk-ctx))

(def app
  (ring/ring-handler
    (router ctx)
    (ring/create-default-handler)))

(defonce server
  (let [port 8080]
    (print "Applying migrations... ")
    (migrate/migrate! {:datasource (:db ctx)})
    (println "Done.")
    (println "Starting server on port" port)
    (jetty/run-jetty #'app {:port 8080, :join? false})))

(comment
  (.stop server)
  (.start server)
  (do
    (.stop server)
    (.start server))

  :rcf)

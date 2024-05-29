(ns vd-designer.server
  (:require [reitit.ring :as ring]
            [ring.adapter.jetty :as jetty]
            [vd-designer.context :as context]
            [vd-designer.db.migrations :as migrate]
            [vd-designer.utils.log :as log]
            [vd-designer.web.routes.router :refer [router]]))

(def ctx
  (context/mk))

(def app
  (ring/ring-handler
   (router ctx)
   (ring/create-default-handler)))

;; Reference to application server instance for stopping/restarting
(defonce instance (atom nil))

(defn start
  "Start the application server and log the time of start."
  [http-port]
  (log/info "Starting server on port" http-port)
  (reset! instance
          (jetty/run-jetty #'app {:port http-port :join? false})))

(defn stop
  "Gracefully shutdown the server. Log the time of shutdown"
  []
  (when-not (nil? @instance)
    (.stop @instance)
    (reset! instance nil)
    (log/info "Application server shutting down...")))

(defn restart
  "Convenience function to stop and start the application server"
  [http-port]
  (stop)
  (start http-port))

(defn -main
  "Select a value for the http port the app-server will listen to and start."
  [& [http-port]]
  (let [http-port (Integer. (or http-port "8080"))]
    (migrate/migrate! (:db ctx))
    (start http-port)))

(comment
  ;; Start application server - via `-main` or `server/start`
  (-main)
  (start 8080)

  ;; Stop / restart application server
  (stop)
  (restart 8080)

  ;; Get all environment variables
  ;; use a data inspector to view environment-variables name
  (def environment-variables
    (System/getenv))

  ;; Check values set in the default system properties
  (def system-properties
    (System/getProperties))

  :rcf)

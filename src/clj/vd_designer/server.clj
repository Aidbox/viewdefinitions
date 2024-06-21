(ns vd-designer.server
  (:gen-class)
  (:require [reitit.ring :as ring]
            [ring.adapter.jetty :as jetty]
            [ring.middleware.content-type :as content-type]
            [ring.util.response :as response]
            [taoensso.telemere :as t]
            [vd-designer.context :as context]
            [vd-designer.db.migrations :as migrate]
            [vd-designer.db.pool :as pool]
            [vd-designer.web.routes.router :refer [router]]))

(defn app [ctx]
  (ring/ring-handler
   (router ctx)
   (ring/routes
    (-> (fn [request]
          (or (response/resource-response (:uri request)   {:root "public"})
              (-> (response/resource-response "index.html" {:root "public"})
                  (response/content-type      "text/html"))))
        content-type/wrap-content-type)
    (ring/create-default-handler))))

;; Reference to application server instance for stopping/restarting
(defonce ^:private instance (atom nil))

(defn start
  "Start the application server and log the time of start."
  [ctx http-port]
  (t/log! :info (str "Starting server on port " http-port))
  (reset! instance
          (jetty/run-jetty (app ctx) {:port http-port :join? false})))

(defn stop
  "Gracefully shutdown the server. Log the time of shutdown"
  []
  (when-not (nil? @instance)
    (t/log! :info "Application server shutting down...")
    (pool/close-pool)
    (.stop @instance)
    (reset! instance nil)))

(defn restart
  "Convenience function to stop and start the application server"
  [ctx http-port]
  (stop)
  (start ctx http-port))

(defn -main
  "Select a value for the http port the app-server will listen to and start."
  [& [http-port]]
  (t/log! :info "Starting server...")
  (let [ctx (context/mk)
        http-port (Integer. (or http-port "8080"))]
    (migrate/migrate! (:db ctx))
    (start ctx http-port)))

(comment
  (def ctx (context/mk))
  (migrate/migrate! (:db ctx))

  ;; Start application server - via `-main` or `server/start`
  (-main)
  (start ctx 8080)

  ;; Stop / restart application server
  (stop)
  (restart ctx 8080)

  ;; Get all environment variables
  ;; use a data inspector to view environment-variables name
  (def environment-variables
    (System/getenv))

  ;; Check values set in the default system properties
  (def system-properties
    (System/getProperties))

  :rcf)

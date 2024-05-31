(ns server-repl
  ;; TODO: learn and apply the best practices of REPL namespaces
  (:require [martian.core :as martian]
            [ragtime.repl]
            [ragtime.jdbc :as jdbc]
            [vd-designer.config]
            [vd-designer.server :as server]
            [vd-designer.context :as context]))

(def ctx (context/mk))

;;; Try out Aidbox portal client
(comment
  (def portal-client (:aidbox.portal/client ctx))

  (martian/explore portal-client)
  (let [req {:client-id     "vd-designer"
             :client-secret "changeme"
             :code          "<code>"
             :grant-type    "authorization_code"}]
    #_(martian/request-for portal-client :sso-code-exchange req)
    #_@(martian/response-for portal-client :sso-code-exchange req))

  :rcf)

;;; Try out server endpoints
(comment
  (def app (server/app ctx))

  (server/start ctx 8080)

  (app {:request-method :get
        :uri            "/api/health"})

  (app {:request-method :get
        :uri            "/bad-route"}))

;;; Try out applying migrations
(comment
  (def ragtime-cfg {:datastore  (jdbc/sql-database (:db vd-designer.config/config))
                    :migrations (jdbc/load-resources "migrations")})

  ;; it's creating `ragtime_migrations` table
  (ragtime.repl/migrate ragtime-cfg)
  ;; it's doing 1 rollback at the time
  (ragtime.repl/rollback ragtime-cfg)

  :rcf)

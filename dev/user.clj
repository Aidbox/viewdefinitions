(ns user
  (:require [clojure.string :as str]
            [iapetos.export :as export]
            [martian.core :as martian]
            [ragtime.jdbc :as jdbc]
            [ragtime.repl]
            [taoensso.telemere :as t]
            [vd-designer.clients.portal :as portal]
            [vd-designer.config]
            [vd-designer.context :as context]
            [vd-designer.monitoring :as monitoring]
            [vd-designer.repository.account :as account]
            [vd-designer.server :as server]))

(def ctx (context/mk))

(defn portal-client []
  (portal/client (-> ctx :cfg :aidbox.portal/url)))

;;; Try out Aidbox portal client
(comment
  (martian/explore (portal-client) :rpc)

  @(martian/response-for (portal-client) :rpc {:method 'test-method})

  (let [req {:client-id     "vd-designer"
             :client-secret "changeme"
             :code          "<code>"
             :grant-type    "authorization_code"}]
    #_(martian/request-for (portal-client) :sso-code-exchange req)
    @(martian/response-for (portal-client) :sso-code-exchange req))

  :rcf)

;;; Try out server endpoints
(comment
  (server/restart ctx 8080)

  (def ragtime-cfg {:datastore  (jdbc/sql-database
                                  (:db vd-designer.config/config))
                    :migrations (jdbc/load-resources "migrations")})

  ;; it's creating `ragtime_migrations` table
  (ragtime.repl/migrate ragtime-cfg)


  (server/start ctx 8080)
  (server/stop)

  (ragtime.repl/rollback ragtime-cfg)

  (def app (server/app ctx))
  (app {:request-method :get
        :uri            "/api/health"})

  (def jwt (vd-designer.service.jwt/issue (:cfg ctx) 1))

  (-> (app {:request-method :post
            :uri            "/api/aidbox/servers"
            :headers        {"Authorization" (str "Bearer " jwt)
                             "Content-Type"  "application/json"}
            :body-params
            (jsonista.core/write-value-as-string
              {:box-url "url"
               :server-name "mybox"
               :headers {"Authorization" "Basic YmFzaWM6c2VjcmV"}})})
      :body
      slurp
      jsonista.core/read-value)

  (-> (app {:request-method :get
            :uri            "/api/aidbox/servers"
            :headers        {"authorization" (str "Bearer " jwt)}})
      :body
      slurp
      jsonista.core/read-value)

  ;;; Prometheus
  (export/text-format monitoring/registry))

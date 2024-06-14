(ns server-repl
  (:require [clojure.string :as str]
            [martian.core :as martian]
            [ragtime.jdbc :as jdbc]
            [ragtime.repl]
            [taoensso.telemere :as t]
            [vd-designer.clients.portal :as portal]
            [vd-designer.config]
            [vd-designer.context :as context]
            [vd-designer.repository.account :as account]
            [vd-designer.server :as server]))

(defonce ctx (context/mk))

(defn portal-client []
  (portal/client (-> ctx :cfg :aidbox.portal/url)))

;;; Try out Aidbox portal client
(comment
  (martian/explore (portal-client) :rpc)

  (let [req {:client-id     "vd-designer"
             :client-secret "changeme"
             :code          "<code>"
             :grant-type    "authorization_code"}]
    #_(martian/request-for (portal-client) :sso-code-exchange req)
    @(martian/response-for (portal-client) :sso-code-exchange req))

  :rcf)

;;; Try out server endpoints
(comment

  (def app (server/app ctx))

  (server/start ctx 8080)
  (server/restart 8080 ctx)
  (server/stop ctx)

  (app {:request-method :get
        :uri            "/api/health"})

  (app {:request-method :get
        :uri            "/bad-route"})

  (def jwt (vd-designer.service.jwt/issue (:cfg ctx) 1))

  (-> (app {:request-method :get
            :uri            "/api/aidbox/servers"
            :headers        {"authorization" (str "Bearer " jwt)}})
      :body
      slurp
      jsonista.core/read-value))

;;; Try out applying migrations
(comment
  (def ragtime-cfg {:datastore  (jdbc/sql-database
                                 (:db vd-designer.config/config))
                    :migrations (jdbc/load-resources "migrations")})

  ;; it's creating `ragtime_migrations` table
  (ragtime.repl/migrate ragtime-cfg)
  ;; it's doing 1 rollback at the time
  (ragtime.repl/rollback ragtime-cfg)

  :rcf)

;;; Experimetn with DB queries
(comment
  (account/create (:db ctx) {:email "<EMAIL>"})

  :rcf)


;;; Logger
(comment
  ;; https://github.com/taoensso/telemere/blob/master/examples.cljc

  (t/check-intakes)

  (t/log! :info (str "Starting server on port " 8080))
  (t/log! {:level :info :data {:port 8080}} "Starting server on port ")


  (let [user-arg        "Bob"
        usd-balance-str "22.4821"]

    (t/log!
     {:let  [username    (str/upper-case user-arg)
             usd-balance (parse-double usd-balance-str)]

      :data {:username    username
             :usd-balance usd-balance}}

     ["User" username "has balance:" (str "$" (Math/round usd-balance))]))

  (t/with-signal (t/log! {:my-key "foo"} "My message"))

  :rcf)

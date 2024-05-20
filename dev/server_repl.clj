(ns server-repl                                             ;; TODO: learn and apply the best practices of REPL namespaces
  (:require [martian.core :as martian]
            [martian.httpkit :as martian-http]
            [vd-designer.core :refer [app]]
            [vd-designer.web.clients.portal :refer [portal-client]]
            [next.jdbc :as jdbc]
            [honey.sql.helpers :as sql-helpers]
            [vd-designer.db.pool :as pool]
            ))

(comment

  (jdbc/execute!

    "create table user ( id serial primary key, uuid uuid unique, email varchar(256) unique )")

  (sql-helpers/create-table :user)

  (martian/explore portal-client)

  (martian/url-for portal-client :sso-code-exchange)

  (martian/request-for
    portal-client :sso-code-exchange
    {:client-id     "vd-designer"
     :client-secret "changeme"
     :code          "<code>"
     :grant-type    "authorization_code"})

  @(martian/response-for
     portal-client :sso-code-exchange
     {:client-id     "vd-designer"
      :client-secret "changeme"
      :code          "<code>"
      :grant-type    "authorization_code"})



  (app {:request-method :get
        :uri            "/api/health"})

  (app {:request-method :get
        :uri            "/api/echo"
        :query-params   {:test 123}})

  (app {:request-method :get
        :uri            "/bad-route"}))

(comment

  (def pool
    (pool/create-pool
      {:data-source.url "jdbc:postgresql://localhost:5454/vd-dev?user=vd-dev&password=vd-dev"}))

  (jdbc/execute! pool ["create table if not exists public.user ( id serial primary key, uuid uuid unique, email varchar(256) unique )"])


  )

(comment
  (with-open [conn (jdbc/get-connection datasource)]
    (jdbc/prepare conn))

  (jdbc.conn/jdbc-url db-config)

  (jdbc/execute!
    datasource
    ["create table if not exists public.user ( id serial primary key, uuid uuid unique, email varchar(256) unique )"])

  )

(ns server-repl                                             ;; TODO: learn and apply the best practices of REPL namespaces
   (:require [honey.sql.helpers :as sql-helpers]
             [martian.core :as martian]
             [next.jdbc :as jdbc]
             [vd-designer.clients.portal :refer [client]]
             [vd-designer.core :refer [app]]
             [vd-designer.kit :as kit]
             [vd-designer.model.account :as account]))

 (comment

   (def kit
     (kit/mk-ctx))

   (jdbc/execute!

    "create table user ( id serial primary key, uuid uuid unique, email varchar(256) unique )")

   (sql-helpers/create-table :user)

   (martian/explore client)

   (martian/url-for client :sso-code-exchange)

   (martian/request-for
    (:aidbox.portal/client kit) :sso-code-exchange
    {:client-id     "vd-designer"
     :client-secret "changeme"
     :code          "<code>"
     :grant-type    "authorization_code"})

   @(martian/response-for
     (:aidbox.portal/client kit) :sso-code-exchange
     {:client-id     "vd-designer"
      :client-secret "changeme"
      :code          "<code>"
      :grant-type    "authorization_code"})

   @(martian/response-for
     (:aidbox.portal/client kit) :sso-code-exchange
     {:client-id     "vd-designer"
      :client-secret "changeme"
      :code          nil
      :grant-type    "authorization_code"})



   (app {:request-method :get
         :uri            "/api/health"})

   (app {:request-method :get
         :uri            "/api/echo"
         :query-params   {:test 123}})

   (app {:request-method :get
         :uri            "/bad-route"}))



 (jdbc/execute! (:db kit)
                ["create table if not exists public.accounts ( id serial primary key, uuid uuid unique, email varchar(256) unique )"])

 (account/get-accounts (:db kit))

 (account/create-account (:db kit)
                         {:email "<EMAIL>" :uuid #uuid "0000-0000-0000-0000-0000"})

 :rcf)

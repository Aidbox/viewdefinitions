(ns vd-designer.test-kit
  (:require [vd-designer.config :as config]
            [next.jdbc :as jdbc]
            [vd-designer.fake.portal-client :as portal.fake]))

(def db-config
  {:dbtype   "postgresql"
   :dbname   (System/getenv "POSTGRES_DB")
   :host     "localhost"
   ;; TODO: use env variable
   :port     5454
   :user     (System/getenv "POSTGRES_USER")
   :password (System/getenv "POSTGRES_PASSWORD")})

(defn mk []
  {:aidbox.portal/client (portal.fake/client)
   :db                   (jdbc/get-datasource db-config)
   :cfg                  config/config})

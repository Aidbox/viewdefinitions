(ns vd-designer.kit
  (:require
    [clojure.test :refer :all]
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

(def datasource
  (jdbc/get-datasource db-config))

(defn kit []
  {:aidbox.portal/client (portal.fake/client)
   :db                   })

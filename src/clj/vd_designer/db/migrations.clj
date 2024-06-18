(ns vd-designer.db.migrations
  (:require [ragtime.core :as ragtime]
            [ragtime.jdbc :as jdbc]
            [ragtime.reporter :as reporter]
            [taoensso.telemere :as t]))

(defn migrate! [db]
  (let [migrations (jdbc/load-resources "migrations")]
    (t/log! :info "Applying migrations...")
    (t/log! {:level :debug :data {:migrations (mapv :id migrations)}}
            "Found migrations")
    (ragtime/migrate-all (jdbc/sql-database {:datasource db})
                         (ragtime/into-index migrations)
                         migrations
                         {:reporter reporter/print})))

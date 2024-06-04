(ns vd-designer.db.migrations
  (:require [ragtime.core :as ragtime]
            [ragtime.jdbc :as jdbc]
            [ragtime.reporter :as reporter]
            [vd-designer.utils.log :as log]))

(defn migrate! [db]
  (let [migrations (jdbc/load-resources "migrations")]
    (log/info "Applying migrations...")
    (log/debug "Found folowing migrations:" (mapv :id migrations))
    (ragtime/migrate-all (jdbc/sql-database {:datasource db})
                         (ragtime/into-index migrations)
                         migrations
                         {:reporter reporter/print})))

(ns vd-designer.db.migrations
  (:require [ragtime.core :as ragtime]
            [ragtime.jdbc :as jdbc]
            [vd-designer.utils.log :as log]))

(defn migrate! [db]
  (let [migrations (jdbc/load-resources "migrations")]
    (log/info "Applying migrations...")
    (ragtime/migrate-all (jdbc/sql-database {:datasource db})
                         (ragtime/into-index migrations)
                         migrations)))

(ns vd-designer.db.migrations
  (:require [ragtime.core :as ragtime]
            [ragtime.jdbc :as jdbc]))

(defn migrate! [db]
  (let [migrations (jdbc/load-resources "migrations")]
    (ragtime/migrate-all (jdbc/sql-database {:datasource db})
                         (ragtime/into-index migrations)
                         migrations)))

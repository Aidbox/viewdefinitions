(ns vd-designer.db.query
  (:require [honey.sql :as sql]
            [next.jdbc :as jdbc]
            [honey.sql.helpers :refer [truncate]]
            [vd-designer.utils.log :as log]))

(defn execute!
  "Executes honey SQL query on database. Logs and throws exception if query fails."
  [db q]
  (try
    (jdbc/execute! db (sql/format q))
    (catch Exception e
      (log/error "Caught DB exception:" (.getMessage e))
      (throw e))))

(defn truncate! [db table|table+params]
  (execute! db (truncate table|table+params)))

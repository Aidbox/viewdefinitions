(ns vd-designer.db.query
  (:require [honey.sql :as sql]
            [honey.sql.helpers :refer [truncate]]
            [next.jdbc :as jdbc]
            [taoensso.telemere :as t]))

(defn execute!
  "Executes honey SQL query on database. Logs and throws exception if query fails."
  [db q]
  (t/catch->error!
   {:data      {:query q}
    :catch-sym e
    :msg       ["DB query failed:" e]}
   (jdbc/execute! db (sql/format q))))

(defn truncate! [db table|table+params]
  (execute! db (truncate table|table+params)))

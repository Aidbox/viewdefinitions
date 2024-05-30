(ns vd-designer.db.query
  (:require [honey.sql :as sql]
            [next.jdbc :as jdbc]
            [honey.sql.helpers :refer [truncate]]))

(defn execute! [db q]
  (jdbc/execute! db (sql/format q)))

(defn truncate! [db table|table+params]
  (execute! db (truncate table|table+params)))

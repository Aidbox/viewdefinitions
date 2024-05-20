(ns vd-designer.model.auth-log
  (:require [honey.sql.helpers :refer [from insert-into select values]]
            [vd-designer.db.query :as q]))

(defn create [db auth-log]
  (q/execute! db
              (-> (insert-into :auth-log)
                  (values [auth-log]))))

(defn get-all [db]
  (q/execute! db
              (-> (select :*)
                  (from :auth-log))))

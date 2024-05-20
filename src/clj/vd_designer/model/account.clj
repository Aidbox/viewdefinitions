(ns vd-designer.model.account
  (:require [honey.sql.helpers :refer [from insert-into returning select values]]
            [vd-designer.db.query :as q]))

(defn create [db account]
  (q/execute! db
              (-> (insert-into :accounts)
                  (values [account])
                  (returning :id))))

(defn get-all [db]
  (q/execute! db
              (-> (select :*)
                  (from :accounts))))

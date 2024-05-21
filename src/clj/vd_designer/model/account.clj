(ns vd-designer.model.account
  (:require [honey.sql.helpers :refer [from insert-into limit returning select
                                       values where]]
            [vd-designer.db.query :as q]))

(defn create [db account]
  (q/execute! db
              (-> (insert-into :accounts)
                  (values [account])
                  (returning :id))))

(defn get-by-email [db email]
  (q/execute! db
              (-> (select :id)
                  (from :accounts)
                  (where [:= :email email])
                  (limit 1))))

(defn get-or-create [db account]
  (if-let [account-id (first (get-by-email db (:email account)))]
    [account-id]
    (create db account)))

(defn get-all [db]
  (q/execute! db
              (-> (select :*)
                  (from :accounts))))

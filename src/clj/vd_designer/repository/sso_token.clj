(ns vd-designer.repository.sso-token
  (:require [honey.sql.helpers :refer [delete-from from insert-into limit
                                       order-by select values where]]
            [vd-designer.db.query :as q]))

(defn create [db sso-tokens-data]
  (q/execute! db
              (-> (insert-into :sso-tokens)
                  (values [sso-tokens-data]))))

(defn get-all [db]
  (q/execute! db
              (-> (select :*)
                  (from :sso-tokens))))

(defn get-last-by-id [db account-id]
  (first (q/execute! db
                     (-> (select :*)
                         (from :sso-tokens)
                         (where [:= :account_id account-id])
                         (order-by [:id :desc])
                         (limit 1)))))

(defn delete [db account-id]
  (q/execute! db
              (-> (delete-from :sso-tokens)
                  (where [:= :account_id account-id]))))

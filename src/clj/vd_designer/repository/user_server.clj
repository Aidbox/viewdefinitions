(ns vd-designer.repository.user-server
  (:require [honey.sql.helpers :refer [from insert-into select values where limit order-by]]
            [vd-designer.db.query :as q]))

; TODO: upsert, not insert!
(defn create [db user-server-data]
  (q/execute! db
              (-> (insert-into :user-servers)
                  (values [user-server-data]))))

(defn create-many [db user-server-data]
  (q/execute! db
              (-> (insert-into :user-servers)
                  (values user-server-data))))

(defn get-by-account-id-and-box-url [db account-id box-url]
  (def ss
    (honey.sql/format (-> (select :*)
        (from :user-servers)
        (where [:and
                [:= :account_id account-id]
                [:= :box_url box-url]])
        (limit 1))))
  (first (q/execute! db
                     (-> (select :*)
                         (from :user-servers)
                         (where [:and
                                 [:= :account_id account-id]
                                 [:= :box_url box-url]])
                         (order-by [:id :desc])
                         (limit 1)))))

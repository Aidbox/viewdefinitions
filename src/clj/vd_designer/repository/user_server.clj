(ns vd-designer.repository.user-server
  (:require [honey.sql.helpers :refer [do-update-set from insert-into limit
                                       on-conflict select values where]]
            [vd-designer.db.query :as q]))

; TODO: upsert, not insert!
(defn create [db user-server-data]
  (q/execute! db
              (-> (insert-into :user-servers)
                  (values [user-server-data]))))

;; insert all servers. if server with account_id+box_url exists, update auth token
(defn create-many [db user-server-data]
  (q/execute! db
              (-> (insert-into :user-servers)
                  (values user-server-data)
                  (on-conflict {:on-constraint :user_servers_pkey})
                  (do-update-set :aidbox_auth_token))))

(defn get-by-account-id-and-box-url [db account-id box-url]
  (first (q/execute! db
                     (-> (select :*)
                         (from :user-servers)
                         (where [:and
                                 [:= :account_id account-id]
                                 [:= :box_url box-url]])
                         (limit 1)))))

(defn get-all [db]
  (q/execute! db
              (-> (select :*)
                  (from :user-servers))))

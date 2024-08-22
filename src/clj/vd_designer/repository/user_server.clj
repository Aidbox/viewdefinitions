(ns vd-designer.repository.user-server
  (:require [honey.sql :as sql]
            [honey.sql.helpers :refer [do-update-set from insert-into limit
                                       on-conflict select values where returning]]
            [jsonista.core :as json]
            [next.jdbc.prepare :as prepare]
            [next.jdbc.result-set :as rs]

            [vd-designer.db.query :as q])
  (:import (org.postgresql.util PGobject)
           [java.sql PreparedStatement]))


; TODO: upsert, not insert!
(defn create [db user-server-data]
  (q/execute! db
              (-> (insert-into :user-servers)
                  (values [user-server-data])
                  ;; (on-conflict {:on-constraint :user_servers_pkey})
                  )))


(defn create-custom [db account-id server-name box-url headers]
  (def h headers)
  (q/execute-with-params! db
                          {:insert-into
                           [:user-servers]
                           :columns [:account-id :server-name :box-url
                                     :is-custom
                                     :headers
                                     :aidbox-auth-token ;; non null
                                     ]
                           :values [[account-id server-name box-url true
                                     [:param :headers-json]
                                     "custom"]]
                           :on-conflict {:on-constraint :user_servers_pkey}
                           :do-nothing true

                           }
              {:params {:headers-json headers}}))

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

(defn get-custom-servers [db]
  (q/execute! db
              (-> (select :server_name :box_url :headers)
                  (from :user-servers)
                  (where [:= :is_custom true]))))

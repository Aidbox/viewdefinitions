(ns vd-designer.repository.user-server-custom
  (:require [honey.sql.helpers :refer [from insert-into
                                       select values]]
            [vd-designer.db.query :as q]))

; TODO: upsert, not insert!
(defn create [db user-server-data]
  (q/execute! db
              (-> (insert-into :user-servers-custom)
                  (values [user-server-data]))))

(defn create-many [db user-server-data]
  (q/execute! db
              (-> (insert-into :user-servers-custom)
                  (values user-server-data))))

(defn get-all [db]
  (q/execute! db
              (-> (select :*)
                  (from :user-servers-custom))))

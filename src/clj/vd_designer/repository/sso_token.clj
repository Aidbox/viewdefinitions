(ns vd-designer.repository.sso-token
  (:require [honey.sql.helpers :refer [from insert-into select values]]
            [vd-designer.db.query :as q]))

(defn create [db sso-tokens-data]
  (q/execute! db
              (-> (insert-into :sso-tokens)
                  (values [sso-tokens-data]))))

(defn get-all [db]
  (q/execute! db
              (-> (select :*)
                  (from :sso-tokens))))


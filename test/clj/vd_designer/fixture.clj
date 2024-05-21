(ns vd-designer.fixture
  (:require [vd-designer.db.query :as q]
            [vd-designer.kit :as kit]))

(defn clean-database [db]
  (let [tables [[:accounts   :cascade]
                [:sso_tokens :cascade]
                :auth_log]]
    (mapv #(q/truncate! db %) tables)))

(defn clean-database-fixture [f]
  (let [{:keys [db]} (kit/mk-ctx)]
    (clean-database db)
    (f)
    (clean-database db)))

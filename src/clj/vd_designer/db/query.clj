(ns vd-designer.db.query
  (:require [honey.sql :as sql]
            [honey.sql.helpers :refer [truncate]]
            [iapetos.core :as prometheus]
            [next.jdbc :as jdbc]
            [taoensso.encore :as enc]
            [taoensso.telemere :as t]
            [vd-designer.monitoring :as monitoring]
            [clojure.string :as str]))

(defmacro execute!
  "Executes honey SQL query on database. Logs and throws exception if query fails."
  [db q]
  (let [source-info (-> (enc/get-source &form &env)
                        (select-keys [:ns :line])
                        vals
                        (->> (str/join ":")))]
    (enc/keep-callsite
     `(prometheus/with-activity-counter
        (monitoring/registry :db/active-connections {:ns ~source-info})
        (prometheus/with-duration
          (monitoring/registry :db/duration-seconds {:ns ~source-info})
          (t/catch->error!
           {:data      {:query ~q}
            :catch-sym e#
            :msg       ["DB query failed:" e#]}
           (jdbc/execute! ~db (sql/format ~q))))))))

(defn truncate! [db table|table+params]
  (execute! db (truncate table|table+params)))

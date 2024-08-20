(ns vd-designer.db.query
  (:require [honey.sql :as sql]
            [honey.sql.helpers
             :refer [do-update-set from insert-into limit
                     truncate on-conflict select values where returning]]
            [jsonista.core :as json]
            [next.jdbc :as jdbc]
            [next.jdbc.sql :as jdbc-sql]
            [next.jdbc.prepare :as prepare]
            [next.jdbc.result-set :as rs]
            [iapetos.core :as prometheus]
            [taoensso.encore :as enc]
            [taoensso.telemere :as t]
            [vd-designer.monitoring :as monitoring]
            [clojure.string :as str]

            [vd-designer.db.query :as q])
  (:import (org.postgresql.util PGobject)
           [java.sql PreparedStatement])
  )


(def mapper (json/object-mapper {:decode-key-fn keyword}))
(def ->json json/write-value-as-string)
(def <-json #(json/read-value % mapper))

(defn ->pgobject
  "Transforms Clojure data to a PGobject that contains the data as
  JSON. PGObject type defaults to `jsonb` but can be changed via
  metadata key `:pgtype`"
  [x]
  (let [pgtype (or (:pgtype (meta x)) "jsonb")]
    (doto (PGobject.)
      (.setType pgtype)
      (.setValue (->json x)))))

(defn <-pgobject
  "Transform PGobject containing `json` or `jsonb` value to Clojure
  data."
  [^org.postgresql.util.PGobject v]
  (let [type  (.getType v)
        value (.getValue v)]
    (if (#{"jsonb" "json"} type)
      (when value
        (with-meta (<-json value) {:pgtype type}))
      value)))

(set! *warn-on-reflection* true)

;; if a SQL parameter is a Clojure hash map or vector, it'll be transformed
;; to a PGobject for JSON/JSONB:
(extend-protocol prepare/SettableParameter
  clojure.lang.IPersistentMap
  (set-parameter [m ^PreparedStatement s i]
    (.setObject s i (->pgobject m)))

  clojure.lang.IPersistentVector
  (set-parameter [v ^PreparedStatement s i]
    (.setObject s i (->pgobject v))))

;; if a row contains a PGobject then we'll convert them to Clojure data
;; while reading (if column is either "json" or "jsonb" type):
(extend-protocol rs/ReadableColumn
  org.postgresql.util.PGobject
  (read-column-by-label [^org.postgresql.util.PGobject v _]
    (<-pgobject v))
  (read-column-by-index [^org.postgresql.util.PGobject v _2 _3]
    (<-pgobject v)))


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

 ; FIXME: multiple arity
(defmacro execute-with-params!
  [db q sql-params]
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
           (jdbc/execute! ~db (sql/format ~q ~sql-params))))))))

(defn truncate! [db table|table+params]
  (execute! db (truncate table|table+params)))

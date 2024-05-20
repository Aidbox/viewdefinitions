(ns vd-designer.db.pool
  (:require [clojure.string :as str]
            [next.jdbc.connection :as jdbc.conn])
  (:import (com.zaxxer.hikari HikariConfig HikariDataSource)
           (java.util Properties)))

(def pool-config
  {:auto-commit        true
   :read-only          false
   :connection-timeout 30000
   :validation-timeout 5000
   :idle-timeout       600000
   :max-lifetime       1800000
   :minimum-idle       10
   :maximum-pool-size  10})

(defn- upcase [^String s]
  (str
    (.toUpperCase (.substring s 0 1))
    (.substring s 1)))

(defn- propertize [k]
  (let [parts (str/split (name k) #"-")]
    (str (first parts) (str/join "" (map upcase (rest parts))))))

(defn create-pool [db-config]
  (let [props (Properties.)]
    (.setProperty props "dataSourceClassName" "org.postgresql.ds.PGSimpleDataSource")
    (doseq [[k v] (assoc pool-config
                    :data-source.url (jdbc.conn/jdbc-url db-config))]
      (when (and k v)
        (.setProperty props (propertize k) (str v))))
    (-> props
        HikariConfig.
        HikariDataSource.)))

;; TODO: do this on server down
(defn close-pool [^HikariDataSource datasource] (.close datasource))

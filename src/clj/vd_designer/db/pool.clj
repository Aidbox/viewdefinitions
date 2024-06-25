(ns vd-designer.db.pool
  (:require [next.jdbc.connection :as jdbc.conn]
            [taoensso.telemere :as t])
  (:import (com.zaxxer.hikari HikariConfig HikariDataSource)
           (java.util Properties)))

(defonce ^:private pool (atom nil))

(def properties
  (let [props (Properties.)]
    (doseq [[k v] {"autoCommit"          "true"
                   "readOnly"            "false"
                   "connectionTimeout"   "30000"
                   "validationTimeout"   "5000"
                   "idleTimeout"         "600000"
                   "maxLifetime"         "1800000"
                   "minimumIdle"         "10"
                   "maximumPoolSize"     "10"
                   "dataSourceClassName" "org.postgresql.ds.PGSimpleDataSource"}]
      (.setProperty props k v))
    props))

(defn close-pool []
  (let [^HikariDataSource datasource @pool]
    (reset! pool nil)
    (when-not (nil? datasource)
      (t/log! :info "Closing database pool...")
      (.close datasource))))

(defn create-pool [db-config]
  (close-pool)
  (t/log! :info "Creating database pool...")
  (-> properties
      ^Properties (doto (.setProperty "dataSource.url" (jdbc.conn/jdbc-url db-config)))
      HikariConfig.
      HikariDataSource.
      (->> (reset! pool))))

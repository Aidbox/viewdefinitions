(ns vd-designer.db.pool
  (:require [next.jdbc.connection :as jdbc.conn]
            [vd-designer.utils.log :as log])
  (:import (com.zaxxer.hikari HikariConfig HikariDataSource)
           (java.util Properties)))

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

(defn create-pool [db-config]
  (log/info "Creating database pool...")
  (-> properties
      ^Properties (doto (.setProperty "dataSource.url" (jdbc.conn/jdbc-url db-config)))
      HikariConfig.
      HikariDataSource.))

(defn close-pool [^HikariDataSource datasource]
  (log/info "Closing database pool...")
  (.close datasource))

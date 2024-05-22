(ns vd-designer.test-kit
  (:require [clojure.java.shell :refer [sh]]
            [clojure.string :as str]
            [next.jdbc :as jdbc]
            [vd-designer.config :refer [config]]
            [vd-designer.db.migrations :as migrate]
            [vd-designer.fake.clients.portal :as portal]))

(defn- mk-db []
  ;; NOTE: this test-db name comes from compose.yml
  (-> (sh "docker" "exec" "test-db" "su" "postgres" "-c" "./create-db.sh")
      :out
      str/trim-newline
      (->> (str "jdbc:"))
      jdbc/get-datasource
      (doto migrate/migrate!)))

(defn mk-ctx []
  {:aidbox.portal/client (portal/client)
   :db                   (mk-db)
   :cfg                  config})

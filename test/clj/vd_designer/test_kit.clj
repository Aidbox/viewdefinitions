(ns vd-designer.test-kit
  (:require [next.jdbc :as jdbc]
            [vd-designer.config :refer [config]]
            [vd-designer.fake.clients.portal :as portal]))

(defn mk-ctx []
  {:aidbox.portal/client (portal/client)
   :db                   (jdbc/get-datasource (:db config))
   :cfg                  config})

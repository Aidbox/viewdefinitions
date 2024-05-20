(ns vd-designer.kit
  (:require [vd-designer.clients.portal :as portal]
            [vd-designer.config :refer [config]]
            [vd-designer.db.pool :as pool]))

(defn mk-ctx []
  {:aidbox.portal/client (portal/client)
   :db                   (pool/create-pool (:db config))
   :cfg                  config})

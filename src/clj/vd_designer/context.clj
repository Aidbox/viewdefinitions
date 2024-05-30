(ns vd-designer.context
  (:require [vd-designer.clients.portal :as portal]
            [vd-designer.config :refer [config]]
            [vd-designer.db.pool :as pool]))

(defn mk []
  {:aidbox.portal/client (portal/client (:aidbox.portal/url config))
   :db                   (pool/create-pool (:db config))
   :cfg                  config})

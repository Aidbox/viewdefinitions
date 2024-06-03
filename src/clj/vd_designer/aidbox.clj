(ns vd-designer.aidbox
  (:require [vd-designer.clients.portal :as portal]))

(defn init-project [client]
  (portal/rpc:init-project client "<access token>")
  )

;; TODO: rework portal to have a middleware that takes care of access/refresh tokens
(defn list-servers [{:keys [aidbox.portal/client]}]
  (init-project client)

  )

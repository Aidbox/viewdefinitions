(ns vd-designer.aidbox.proxy)

(defprotocol AidboxProxyServer
  (connect [this])
  (get-view-definition [this])
  (eval-view-definition [this])
  (save-view-definition [this])
  (delete-view-definition [this]))

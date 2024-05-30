(ns vd-designer.utils.http)

(defn get-header
  "Gets header by it's name from request or response."
  [req|resp header-name]
  (-> req|resp :headers (get header-name)))

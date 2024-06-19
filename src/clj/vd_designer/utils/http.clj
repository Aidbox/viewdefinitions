(ns vd-designer.utils.http)

(defn get-header
  "Gets header by it's name from request or response."
  [req|resp header-name]
  (-> req|resp :headers (get header-name)))

(defn apply-middleware
  "Helper to apply a middleware to some handler and ctx"
  [middleware handler ctx]
  (-> (middleware)
      :wrap
      (#(% handler))
      (#(% ctx))))

(ns vd-designer.web.middleware.context)

(def query-string-middleware
  {:name ::portal-client
   :wrap (fn [handler]
           (fn [req]
             (let [context "TODO"]
               (handler
                 (merge context req)))))})

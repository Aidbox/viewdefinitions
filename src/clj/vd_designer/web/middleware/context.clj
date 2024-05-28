(ns vd-designer.web.middleware.context)

(defn app-context-middleware [ctx]
  {:name ::app-context
   :wrap (fn [handler]
           (fn [req]
             (handler (assoc ctx :request req))))})

(ns vd-designer.web.middleware.context)

(defn app-context-middleware
  "Puts original request into provided context by :request keyword and
   returns that context"
  [ctx]
  {:name ::app-context
   :wrap (fn [handler]
           (fn [req]
             (def r req)
             (handler (assoc ctx :request req))))})

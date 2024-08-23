(ns vd-designer.web.middleware.query
  (:require [lambdaisland.uri :as uri]))

(defn query-string->map [{:keys [query-string] :as req}]
  (def q query-string)
  (def qq (uri/query-string->map query-string))
  (assoc req :query-params (uri/query-string->map query-string)))

(def query-string-middleware
  {:name ::parse-query-params
   :wrap (fn [handler]
           (fn [req]
             (-> req query-string->map handler)))})

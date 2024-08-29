(ns vd-designer.web.middleware.query
  (:require [lambdaisland.uri :as uri]))

(defn request->query-params [{:keys [query-string] :as req}]
  (assoc req :query-params (uri/query-string->map query-string)))

(def query-string-middleware
  {:name ::parse-query-params
   :wrap (fn [handler]
           (fn [req]
             (-> req request->query-params handler)))})

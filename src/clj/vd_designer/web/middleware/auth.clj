(ns vd-designer.web.middleware.auth
  (:require [clojure.string :as str]
            [lambdaisland.uri :as uri]
            [ring.util.http-response :as http-response]
            [vd-designer.service.jwt :as jwt]))

(defn truncate-referer [referer]
  (some-> referer
          (uri/uri)
          (assoc :path "")
          (uri/uri-str)
          (str/split #"\?")
          first))

(defn jwt->user [ctx]
  (let [[schema jwt] (some-> ctx
                             (get-in [:request :headers "authorization"])
                             (str/split #" "))
        referer (some-> ctx
                        (get-in [:request :headers "referer"])
                        truncate-referer)]
    (if (not= schema "Bearer")
      nil
      (let [jwt-validation-result (jwt/validate (:cfg ctx) referer jwt)]
        (if (:error jwt-validation-result)
          nil
          {:accounts/id (:result jwt-validation-result)})))))

(defn unauthorized-wo-token [handler ctx]
  (if-let [user (jwt->user ctx)]
    (handler (merge ctx {:user user}))
    (http-response/unauthorized)))

(def authorize
  {:name ::jwt->user
   :wrap (fn [handler]
           (fn [req]
             (unauthorized-wo-token handler req)))})

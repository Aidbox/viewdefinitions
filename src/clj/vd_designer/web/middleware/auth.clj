(ns vd-designer.web.middleware.auth
  (:require [clojure.string :as str]
            [lambdaisland.uri :as uri]
            [ring.util.http-response :as http-response]
            [vd-designer.service.jwt :as jwt]))

(defn truncate-referer [referer]
  (some-> referer
      (uri/uri)
      (assoc :path "")
      (uri/uri-str)))

(defn jwt->user [handler ctx]
  (let [[schema jwt] (some-> ctx
                             (get-in [:request :headers "authorization"])
                             (str/split #" "))
        referer (some-> ctx
                        (get-in [:request :headers "referer"])
                        truncate-referer)]
    (if (not= schema "Bearer")
      (http-response/unauthorized)
      (let [jwt-validation-result (jwt/validate (:cfg ctx) referer jwt)]
        (if (:error jwt-validation-result)
          (http-response/unauthorized)
          (-> ctx
              (assoc :user {:accounts/id (:result jwt-validation-result)})
              (handler)))))))

(def authorize
  {:name ::jwt->user
   :wrap (fn [handler]
           (fn [req]
             (jwt->user handler req)))})

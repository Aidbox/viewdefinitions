(ns vd-designer.web.middleware.auth
  (:require [clojure.string :as str]
            [lambdaisland.uri :as uri]
            [ring.util.http-response :as http-response]
            [vd-designer.service.jwt :as jwt]))

(defn- truncate-referer [referer]
  (some-> referer
          (uri/uri)
          (assoc :path "")
          (uri/uri-str)
          (str/split #"\?")
          first))

(defn- jwt->user [{:keys [cfg request]}]
  (let [[schema jwt] (some-> request
                             (get-in [:headers "authorization"])
                             (str/split #" "))
        referer      (some-> request
                             (get-in [:headers "referer"])
                             truncate-referer)]
    (if (not= schema "Bearer")
      {:result nil}
      (jwt/validate cfg referer jwt))))


(defn authentication-required-middleware []
  {:name ::authentication
   :wrap (fn [handler]
           (fn [ctx]
             (let [{:keys [result error]} (jwt->user ctx)]
               (if (or error (nil? result))
                 (http-response/unauthorized {:error error})
                 (handler (assoc ctx :user result))))))})

(defn authentication-optional-middleware []
  {:name ::authentication
   :wrap (fn [handler]
           (fn [ctx]
             (let [{:keys [result error]} (jwt->user ctx)]
               (if-not (empty? error)
                 (http-response/unauthorized {:error error})
                 (handler (assoc ctx :user result))))))})

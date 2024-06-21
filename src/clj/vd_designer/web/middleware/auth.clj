(ns vd-designer.web.middleware.auth
  (:require [clojure.string :as str]
            [lambdaisland.uri :as uri]
            [ring.util.http-response :as http-response]
            [vd-designer.service.jwt :as jwt]
            [vd-designer.utils.http :refer [get-header]]))

(defn- truncate-referer [referer]
  (some-> referer
          (uri/uri)
          (assoc :path "")
          (uri/uri-str)
          (str/split #"\?")
          first))

(defn- jwt->user [{:keys [cfg request]}]
  (let [[schema jwt] (some-> request
                             (get-header :Authorization)
                             (str/split #" "))
        referer      (some-> request
                             (get-header :Referer)
                             truncate-referer)]
    (if (not= schema "Bearer")
      {:result nil}
      (jwt/validate cfg referer jwt))))


(defn authentication-middleware [required?]
  {:name ::authentication
   :wrap (fn [handler]
           (fn [ctx]
             (let [{:keys [result error]} (jwt->user ctx)
                   condition (if required?
                               (or error (nil? result))
                               (not (nil? error)))]
               (if condition
                 (http-response/unauthorized {:error error})
                 (handler (assoc ctx :user result))))))})

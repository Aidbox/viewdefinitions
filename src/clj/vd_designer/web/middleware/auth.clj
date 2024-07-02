(ns vd-designer.web.middleware.auth
  (:require [clojure.string :as str]
            [lambdaisland.uri :as uri]
            [ring.util.http-response :as http-response]
            [vd-designer.repository.sso-token :as sso-token]
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

(defn authentication-middleware* [handler {:keys [db] :as ctx} required?]
  (let [{:keys [result error]} (jwt->user ctx)
        account-id result
        jwt-decoding-failed? (or (some? error)
                                 (and required? (nil? account-id)))]
    (if jwt-decoding-failed?
      (http-response/unauthorized {:error error})
      (if account-id
        (if-let [sso-token (sso-token/get-last-by-id db account-id)]
          (handler (assoc ctx :user {:id        account-id
                                     :sso-token (:sso_tokens/access_token sso-token)}))
          (http-response/unauthorized {:error "Aidbox session expired"}))
        (handler ctx)))))

(defn authentication-middleware [required?]
  {:name ::authentication
   :wrap (fn [handler]
           (fn [ctx]
             (authentication-middleware* handler ctx required?)))})

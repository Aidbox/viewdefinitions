(ns vd-designer.service.jwt
  (:require [buddy.core.keys :as keys]
            [buddy.sign.jwk :as jwk]
            [buddy.sign.jwt :as jwt]
            [vd-designer.utils.time :as time])
  (:import [clojure.lang ExceptionInfo]
           (java.security KeyPairGenerator SecureRandom)))

(defn- generate-keypair []
  (let [kg (KeyPairGenerator/getInstance "RSA")]
    (.initialize kg 1024 (SecureRandom/getInstanceStrong))
    (.genKeyPair kg)))

(defn generate-jwk []
  (let [pair (generate-keypair)]
    (keys/jwk (.getPrivate pair) (.getPublic pair))))

(defn- make-claims
  [{app-url :vd.designer.app/url
    :as     config}
   account-id]
  (let [issued-at (time/current-ts)]
    {:iss app-url
     :sub account-id
     :aud [app-url]
     :exp (+ issued-at (-> config :jwt :expires-in))
     :iat issued-at
     :nbf issued-at}))

(defn issue
  [{{:keys [jwk sign-opts]} :jwt
    :as      config}
   account-id]
  (-> (make-claims config account-id)
      (jwt/sign (jwk/private-key jwk) sign-opts)))

(defn validate
  [{{:keys [jwk sign-opts]} :jwt
    app-url                 :vd.designer.app/url}
   ^String referer
   ^String jwt]
  (let [pub (jwk/public-key jwk)
        verify-opts {:iss app-url, :aud referer}]
    (try (->> (merge sign-opts verify-opts)
              (jwt/unsign jwt pub)
              :sub
              (assoc {} :result))
         (catch ExceptionInfo e {:error (.getMessage e)}))))

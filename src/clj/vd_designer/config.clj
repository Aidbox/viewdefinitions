(ns vd-designer.config
  (:require [clojure.edn :as edn]
            [vd-designer.service.jwt :as jwt]
            [vd-designer.utils.base64 :as base64]))

(def config
  {:vd.designer.app/url
   (or (System/getenv "APP_HOST")
       "http://localhost:8080")

   :aidbox.portal/url
   (or (System/getenv "AIDBOX_PORTAL_URL")
       "http://127.0.0.1.nip.io:8789")

   :jwt
   {:jwk        (if-let [jwk (System/getenv "VD_AUTH_JWK")]
                  (-> jwk (base64/decode) edn/read-string)
                  (jwt/generate-jwk))
    :expires-in (* 60 #_SECONDS
                   60 #_MINUTES
                   24 #_HOURS)
    :sign-opts  {:alg :rs512}}

   :sso
   {:client-id            (or (System/getenv "AIDBOX_CLIENT_NAME")
                              "vd-designer")
    :client-secret        (or (System/getenv "AIDBOX_CLIENT_SECRET")
                              "changeme")
    :default-redirect-url (or (System/getenv "APP_HOST")
                              "http://localhost:8280")
    :provider-url         (or (System/getenv "AIDBOX_PORTAL_SSO_URL")
                              "http://127.0.0.1.nip.io:8789/ui/portal")}

   :db
   {:dbtype   "postgresql"
    :dbname   (System/getenv "POSTGRES_DB")
    :host     (System/getenv "POSTGRES_HOST")
    :port     (System/getenv "POSTGRES_PORT")
    :user     (System/getenv "POSTGRES_USER")
    :password (System/getenv "POSTGRES_PASSWORD")}})

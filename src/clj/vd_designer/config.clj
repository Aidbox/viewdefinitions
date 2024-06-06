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
    :dbname   (or (System/getenv "POSTGRES_DB")
                  "vd-dev")
    :host     (or (System/getenv "POSTGRES_HOST")
                  "localhost")
    :port     (or (System/getenv "POSTGRES_PORT")
                  5454)
    :user     (or (System/getenv "POSTGRES_USER")
                  "vd-dev")
    :password (or (System/getenv "POSTGRES_PASSWORD")
                  "vd-dev")}

   :public-fhir-servers
   [{:server-name "Aidbox Default"
     :box-url     "https://viewdefs.aidbox.app"
     :headers     {"Authorization" "Basic YmFzaWM6dmlld2RlZmluaXRpb25z"}}

    {:server-name "Aidbox Default 2"
     :box-url     "https://viewdefinitions.edge.aidbox.app"
     :headers     {"Authorization" "Basic YmFzaWM6dmlld2RlZmluaXRpb25z"}}]})

(ns vd-designer.web.controllers.auth
  (:require [lambdaisland.uri :as uri]
            [ring.util.http-response :as http-response]
            [vd-designer.service.sso :as sso-service]
            [vd-designer.utils.base64 :as base64]
            [clojure.string :as str]))

(defn sso-redirect
  [{{:keys [route]} :query-params
    config :cfg}]
  (let [{:keys [client-id provider-url]} (:sso config)]
    (-> provider-url
        (uri/assoc-query {:response_type "code"
                          :client_id     client-id
                          :state         (base64/encode route)})
        (uri/join "#/signin")
        uri/uri-str
        http-response/found)))

(defn- construct-sso-callback-response [sso-config state sso-result]
  (let [default-url (:default-redirect-url sso-config)
        base-url (if (empty? state)
                   default-url
                   (try (base64/decode state)
                        (catch Exception _ default-url)))]
    (-> base-url
        (uri/assoc-query sso-result)
        uri/uri-str
        http-response/found)))

(defn sso-callback
  [{{:keys [code state]} :query-params
    config               :cfg
    :as                  ctx}]
  (if (str/blank? code)
    (construct-sso-callback-response (:sso config) state {:error "Missing authorization code"})
    (->> (sso-service/authenticate ctx code)
         (construct-sso-callback-response (:sso config) state))))

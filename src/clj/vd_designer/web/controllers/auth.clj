(ns vd-designer.web.controllers.auth
  (:require [lambdaisland.uri :as uri]
            [ring.util.http-response :as http-response]
            [vd-designer.service.sso :as sso-service]
            [vd-designer.utils.base64 :as base64]
            [clojure.string :as str]))

(defn- construct-response [sso-config state sso-result]
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
    (construct-response (:sso config) state {:error "Missing authorization code"})
    (->> (sso-service/authenticate ctx code)
         (construct-response (:sso config) state))))

(ns vd-designer.web.controllers.auth
  (:require [lambdaisland.uri :as uri]
            [martian.core :as martian]
            [ring.util.http-response :as http-response]
            [vd-designer.config :as config]
            [vd-designer.utils.base64 :as base64]
            [vd-designer.web.clients.portal :refer [portal-client]]))

(defn- exchange-code
  "Ecxchange outh2 code to access token, will return a map with either :error or
   :result key"
  [code]
  (let [{:keys [client-id client-secret]} (:sso-config config/config)
        req {:client-id     client-id
             :client-secret client-secret
             :code          code
             :grant-type    "authorization_code"}
        exchange (martian/response-for portal-client :sso-code-exchange req)
        resp (:body @exchange)]
    (if (empty? code)
      {:error "Authorization code is not provided"}
      (if (empty? (:error resp))
        {:result resp}
        {:error  (:error_description resp)}))))

(defn- construct-response [state exchange-result]
  ;; TODO handle case when state do not has a valid url
  (let [default-url (-> config/config :sso-config :default-redirect-url)
        base-url (if (empty? state)
                   default-url
                   (try (base64/decode state)
                        (catch Exception _ default-url)))]
    (-> base-url
        (uri/assoc-query exchange-result)
        uri/uri-str
        http-response/found)))

;; TODO save auth state to db / create user if required
(defn- authenticate [exchange-result]
  (if (empty? (:error exchange-result))
    {:result (-> exchange-result :result :access_token)}
    exchange-result))

(defn sso-callback [{{:keys [code state]} :query-params}]
  (->> (exchange-code code)
       authenticate
       (construct-response state)))

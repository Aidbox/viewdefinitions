(ns vd-designer.web.controllers.auth
  (:require [martian.core :as martian]
            [ring.util.http-response :as http-response]
            [lambdaisland.uri :as uri]
            [vd-designer.utils.base64 :as base64]
            [vd-designer.web.clients.portal :refer [portal-client]]))

;; TODO extract these to global config / env
(def sso-config
  {:client-id            "vd-designer"
   :client-secret        "changeme"
   :default-redirect-url "https://localhost:8280"})

(defn- exchange-code
  "Ecxchange outh2 code to access token, will return a map with either :error or
   :result key"
  [code]
  (let [{:keys [client-id client-secret]} sso-config
        req {:client-id     client-id
             :client-secret client-secret
             :code          code
             :grant-type    "authorization_code"}
        exchange (martian/response-for portal-client :sso-code-exchange req)
        resp (:body @exchange)]
    (if (empty? code)
      {:error "Authorization code is not provided"}
      (if (empty? (:error resp))
        {:result (:body resp)}
        {:error  (:error_description resp)}))))

(defn- construct-redirect-url [state exchange-result]
  ;; TODO handle case when state do not has a valid url
  (let [base-url (if (empty? state)
                   (:default-redirect-url sso-config)
                   (base64/decode state))]
    (-> base-url
        (uri/assoc-query exchange-result)
        uri/uri-str)))

;; TODO save auth state to db / create user if required
(defn- authenticate [exchange-result]
  exchange-result)

(defn sso-callback [{{:keys [code state]} :query-params}]
  (->> (exchange-code code)
       authenticate
       (construct-redirect-url state)
       http-response/found))

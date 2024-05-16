(ns vd-designer.web.controllers.auth
  (:require [martian.core :as martian]
            [ring.util.http-response :as http-response]
            [lambdaisland.uri :as uri]
            [vd-designer.utils.base64 :as base64]
            [vd-designer.web.clients.portal :refer [portal-client]]))

;; TODO save auth state to db / create user if required
(defn sso-callback [{{:keys [code state]} :query-params}]
  ;; TODO handle case when state is missing - use default url
  ;; TODO handle case when state do not has a valid url
  (let [redirect-url (-> (base64/decode state)
                         (uri/assoc-query (if (empty? code)
                                            {:sso/error "Authorization code is not provided"}

                                            (let [exchange @(martian/response-for
                                                             portal-client :sso-code-exchange
                                                  ;; TODO extract these to env
                                                             {:client-id     "vd-designer"
                                                              :client-secret "changeme"
                                                              :code          code
                                                              :grant-type    "authorization_code"})]
                                              (if (empty? (-> exchange :body :error))
                                                (:body exchange)
                                                {:sso/error (-> exchange :body :error_description)}))))
                         uri/uri-str)]
    (http-response/found redirect-url)))

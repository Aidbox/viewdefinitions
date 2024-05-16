(ns vd-designer.web.controllers.auth
  (:require [ring.util.http-response :as http-response]
            [vd-designer.utils.base64 :as base64]))

(defn sso-callback [{{:keys [code state]} :query-params}]
  ;; get code from query params and send POST request to aidbox to change it to token
  ;; http://127.0.0.1.nip.io:8789/auth/token -H "Content-type: application/json" -d '{"client_id":"vd-designer","client_secret":"changeme","code":"<code>","grant_type":"authorization_code"}'
  ;; then redirect to url from state with a result
  (if (empty? code)
    (http-response/bad-request
     {:error "Authorization code is not provided"})

    (http-response/ok
     {:code  code
      ;; TODO: handle case when state is absent
      :state (base64/decode state)})))

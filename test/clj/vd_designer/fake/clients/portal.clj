(ns vd-designer.fake.clients.portal
  (:require [martian.core :as martian]
            [ring.util.http-response :as http-response]
            [vd-designer.config :refer [config]]
            [vd-designer.clients.portal :as portal]))

(defn exchange [{:keys [client-id client-secret code]}]
  (let [{expected-client-id     :client-id
         expected-client-secret :client-secret} (:sso config)]
    (if (or (not= client-id expected-client-id)
            (not= client-secret expected-client-secret))
      (http-response/bad-request {:error             "Invalid client credentials"
                                  :error_description "<error description>"})
      (if (not= code "<code>")
        (http-response/bad-request {:error             "Invalid authorization code"
                                    :error_description "<error description>"})
        (http-response/ok {:userinfo      {:id    (str (random-uuid))
                                           :email "<email>"}
                           :access_token  "<access token>"
                           :refresh_token "<refresh token>"
                           :expires_in    3600})))))

(def perform-request
  {:name  ::perform-request
   :leave (fn [{:keys [handler params]}]
            {:response
             (atom
              (case (:route-name handler)
                :sso-code-exchange (exchange params)))})})

(defn client []
  (martian/bootstrap
   "https://api.com" portal/routes
   {:interceptors (conj martian/default-interceptors perform-request)}))

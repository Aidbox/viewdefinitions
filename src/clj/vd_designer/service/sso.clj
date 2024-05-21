(ns vd-designer.service.sso
  (:require [martian.core :as martian]
            [next.jdbc :as jdbc]
            [vd-designer.model.account :as account]
            [vd-designer.model.auth-log :as auth-log]
            [vd-designer.model.sso-token :as sso-token]))

(defn- exchange-code
  "Exchanges oauth2 code to access token,
   returns a map with either :error or :result key"
  [portal-client sso-config code]
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
        {:result resp}
        {:error (:error_description resp)}))))

(defn- save-auth [db exchange-result]
  (if (empty? (:error exchange-result))
    (let [res (-> exchange-result :result)
          {:keys [email id]} (:userinfo res)]

      (jdbc/with-transaction [tx db]
        ;; TODO do not create user if there is already one with the same email
        (let [[{account-id :accounts/id}] (account/create tx {:uuid  (parse-uuid id)
                                                              :email email})]
          (sso-token/create tx (-> res
                                   (select-keys [:access_token :refresh_token :expires_in])
                                   (assoc :account_id account-id)))
          (auth-log/create tx {:email email})))

      {:result (:access_token res)})
    exchange-result))

(defn authenticate
  [{config :cfg
    :keys  [aidbox.portal/client db]}
   code]
  (->> (exchange-code client (:sso config) code)
       (save-auth db)))

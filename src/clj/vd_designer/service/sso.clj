(ns vd-designer.service.sso
  (:require [martian.core :as martian]
            [next.jdbc :as jdbc]
            [vd-designer.repository.account :as account]
            [vd-designer.repository.auth-log :as auth-log]
            [vd-designer.repository.sso-token :as sso-token]
            [vd-designer.service.jwt :as jwt]))

(defn- exchange-code
  "Exchanges oauth2 code to access token,
   returns a map with either :error or :result key"
  [portal-client config code]
  (if (empty? code)
    {:error "Authorization code is not provided"}
    (let [{:keys [client-id client-secret]} (:sso config)
          req {:client-id     client-id
               :client-secret client-secret
               :code          code
               :grant-type    "authorization_code"}
          exchange (martian/response-for portal-client :sso-code-exchange req)
          resp (:body @exchange)]
      (if (empty? (:error resp))
        {:result resp}
        {:error (:error_description resp)}))))

(defn- save-auth
  "Saves auth log and sso token"
  [db exchange-result]
  (if (empty? (:error exchange-result))
    (let [res (-> exchange-result :result)
          {:keys [email]} (:userinfo res)]

      (jdbc/with-transaction [tx db]
        (let [[{account-id :accounts/id}] (account/get-or-create tx {:email email})]
          (sso-token/create tx (-> res
                                   (select-keys [:access_token :refresh_token :expires_in])
                                   (assoc :account_id account-id)))
          (auth-log/create tx {:email email})
          {:result account-id})))
    exchange-result))

(defn- issue-jwt
  "Issues jwt token"
  [config save-auth-res]
  (if (empty? (:error save-auth-res))
    {:result (jwt/issue config (:result save-auth-res))}
    save-auth-res))

(defn authenticate
  [{config :cfg
    :keys  [aidbox.portal/client db]}
   code]
  (->> code
       (exchange-code client config)
       (save-auth db)
       (issue-jwt config)))

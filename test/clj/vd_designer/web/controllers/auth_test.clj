(ns vd-designer.web.controllers.auth-test
  (:require [clojure.test :refer :all]
            [lambdaisland.uri :as uri]
            [matcher-combinators.test :refer [match?]]
            [medley.core :as medley]
            [ring.util.http-response :as http-response]
            [vd-designer.db.query :as q]
            [vd-designer.repository.account :as account]
            [vd-designer.repository.auth-log :as auth-log]
            [vd-designer.repository.sso-token :as sso-token]
            [vd-designer.service.jwt :as jwt]
            [vd-designer.test-context :as test-context]
            [vd-designer.utils.base64 :as base64]
            [vd-designer.utils.http :as http]
            [vd-designer.web.controllers.auth :refer [sso-callback]]))

;; TODO decide where to put this
(defn clean-database [db]
  (let [tables [[:accounts   :cascade]
                [:sso_tokens :cascade]
                :auth_log]]
    (mapv #(q/truncate! db %) tables)))

(defn redirect-uri-matcher [host kw]
  (fn [uri-str]
    (let [uri (uri/parse uri-str)]
      (and (-> uri uri/query-map kw string?)
           (-> uri :host (= host))))))

(deftest sso-callback-test
  (let [{:keys [db cfg] :as ctx} (test-context/mk)
        code "<code>"
        state (base64/encode "http://api.com")

        callback-fn (fn [overrides]
                      (clean-database db)
                      (sso-callback (medley/deep-merge ctx overrides)))]

    (testing "invalid SSO config"
      (is (match?
           (http-response/found "http://api.com?error=%3Cerror+description%3E")
           (callback-fn {:cfg     {:sso {:client-id     "<wrong client>"
                                         :client-secret "<wrong secret>"}}
                         :request {:query-params {:code  code
                                                  :state state}}}))))

    (testing "incorrect query params:"
      (testing "invalid code"
        (is (match?
             (http-response/found (redirect-uri-matcher "api.com" :error))
             (callback-fn {:request {:query-params {:code  "<invalid code>"
                                                    :state state}}}))))

      (testing "state cannot be decoded"
        (is (match?
             (http-response/found (redirect-uri-matcher "localhost" :authentication))
             (callback-fn {:request {:query-params {:code  code
                                                    :state "<invalid state>"}}}))))
      (testing "missing state"
        (is (match?
             (http-response/found (redirect-uri-matcher "localhost" :authentication))
             (callback-fn {:request {:query-params {:code code}}})))))

    (testing "user exists"
      (clean-database db)
      (account/create db {:email "<email>" :uuid (random-uuid)})
      (is (match?
           (http-response/found (redirect-uri-matcher "localhost" :authentication))
           (sso-callback (assoc ctx :request {:query-params {:code code}}))))
      (let [all-accounts (account/get-all db)]
        (is (match?
             [{:accounts/id    number?
               :accounts/uuid  uuid?
               :accounts/email "<email>"}]
             all-accounts))))

    (testing "full flow"
      (clean-database db)

      (let [response (sso-callback (assoc ctx :request {:query-params {:code code}}))
            all-accounts (account/get-all db)]
        (is (match?
             [{:accounts/id    number?
               :accounts/uuid  uuid?
               :accounts/email "<email>"}]
             all-accounts)
            "account created")

        (is (match? {:result (:accounts/id (first all-accounts))}
                    (let [jwt (-> (http/get-header response "Location")
                                  uri/parse uri/query-map
                                  :authentication)]
                      (jwt/validate cfg (:vd.designer.app/url cfg) jwt)))
            "redirect URI has valid JWT")

        (is (match?
             [{:sso_tokens/id            number?
               :sso_tokens/account_id    (-> all-accounts first :accounts/id)
               :sso_tokens/access_token  "<access token>"
               :sso_tokens/refresh_token "<refresh token>"
               :sso_tokens/expires_in    number?}]
             (sso-token/get-all db))
            "Aidbox session stored")

        (is (match?
             [{:auth_log/id        number?
               :auth_log/email     "<email>"
               :auth_log/issued_at any?}]
             (auth-log/get-all db))
            "VDD session created")))))

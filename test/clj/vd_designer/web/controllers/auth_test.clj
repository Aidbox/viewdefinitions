(ns vd-designer.web.controllers.auth-test
  (:require [clojure.test :refer :all]
            [lambdaisland.uri :as uri]
            [matcher-combinators.test :refer [match?]]
            [medley.core :as medley]
            [ring.util.http-response :as http-response]
            [vd-designer.fixture :refer [clean-database-fixture clean-database]]
            [vd-designer.model.account :as account]
            [vd-designer.model.auth-log :as auth-log]
            [vd-designer.model.sso-token :as sso-token]
            [vd-designer.test-kit :as test-kit]
            [vd-designer.utils.base64 :as base64]
            [vd-designer.web.controllers.auth :refer [sso-callback]]))

(use-fixtures :each clean-database-fixture)

(defn redirect-uri-matcher [host kw]
  (fn [uri-str]
    (let [uri (uri/parse uri-str)]
      (and (-> uri uri/query-map kw string?)
           (-> uri :host (= host))))))

(deftest sso-callback-test
  (let [code "<code>"
        state (base64/encode "http://api.com")

        callback-fn (fn [overrides]
                      (let [kit (test-kit/mk-ctx)]
                        (clean-database (:db kit))
                        (sso-callback (medley/deep-merge kit overrides))))]

    (testing "invalid SSO config"
      (is (match?
           (http-response/found "http://api.com?error=%3Cerror+description%3E")
           (callback-fn {:cfg          {:sso {:client-id     "<wrong client>"
                                              :client-secret "<wrong secret>"}}
                         :query-params {:code  code
                                        :state state}}))))

    (testing "incorrect query params:"
      (testing "invalid code"
        (is (match?
             (http-response/found (redirect-uri-matcher "api.com" :error))
             (callback-fn {:query-params {:code  "<invalid code>"
                                          :state state}}))))

      (testing "state cannot be decoded"
        (is (match?
              ;; TODO: CHECK MORE
             (http-response/found (redirect-uri-matcher "localhost" :result))
             (callback-fn {:query-params {:code  code
                                          :state "<invalid state>"}}))))
      (testing "missing state"
        (is (match?
             (http-response/found (redirect-uri-matcher "localhost" :result))
             (callback-fn {:query-params {:code code}})))))

    (testing "happy path"
      (let [{:keys [db] :as kit} (test-kit/mk-ctx)]
        (clean-database (:db kit))
        (testing "user created"
          (is (match?
               (http-response/found (redirect-uri-matcher "localhost" :result))
               (sso-callback (merge kit {:query-params {:code code}}))))
          (let [all-accounts (account/get-all db)]
            (is (match?
                 [{:accounts/id    number?
                   :accounts/uuid  uuid?
                   :accounts/email "<email>"}]
                 all-accounts)
                "account created")
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
                "VDD session created")))))))

(comment
  (run-test sso-callback-test)

  :rcf)

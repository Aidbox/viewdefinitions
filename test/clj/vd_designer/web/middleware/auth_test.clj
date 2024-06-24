(ns vd-designer.web.middleware.auth-test
  (:require [clojure.test :refer :all]
            [matcher-combinators.test :refer [match?]]
            [ring.util.http-response :as http-response]
            [vd-designer.repository.account :as account]
            [vd-designer.repository.sso-token :as sso-token]
            [vd-designer.service.jwt :as jwt]
            [vd-designer.test-context :as test-context]
            [vd-designer.utils.http :refer [apply-middleware]]
            [vd-designer.web.middleware.auth :refer [authentication-middleware]]))

(deftest authentication-middleware-test
  (let [{:keys [db cfg] :as ctx} (test-context/mk)
        [{account-id :accounts/id}] (account/create db {:email "<email>"})
        access-token "<access_token>"]
    (sso-token/create db {:account_id account-id, :access_token access-token})

    (testing "header is missing"
      (is (match?
           (http-response/unauthorized {:error nil})
           (apply-middleware (partial authentication-middleware true)
                             identity
                             {:request {}}))))

    (testing "wrong authorization schema"
      (is (match?
           (http-response/unauthorized {:error nil})
           (apply-middleware (partial authentication-middleware true)
                             identity
                             {:request
                              {:headers
                               {:Authorization "Basic 123"}}}))))

    (testing "invalid JWK"
      (let [invalid-cfg (assoc-in cfg [:jwt :jwk] (jwt/generate-jwk))]
        (is (match?
             (http-response/unauthorized
              {:error "Authentication seems manipulated, please re-authenticate"})
             (apply-middleware (partial authentication-middleware true)
                               identity
                               {:cfg cfg
                                :request
                                {:headers
                                 {:Authorization (str "Bearer " (jwt/issue invalid-cfg account-id))}}})))))

    (testing "happy path"
      (is (match?
           {:user/id        account-id
            :user/sso-token access-token}
           (apply-middleware (partial authentication-middleware true)
                             identity
                             (merge
                              {:cfg cfg
                               :request
                               {:headers
                                {:Authorization (str "Bearer " (jwt/issue cfg account-id))}}}
                              ctx)))))))

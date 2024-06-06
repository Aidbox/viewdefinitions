(ns vd-designer.web.middleware.auth-test
  (:require [clojure.test :refer :all]
            [matcher-combinators.test :refer [match?]]
            [ring.util.http-response :as http-response]
            [vd-designer.service.jwt :as jwt]
            [vd-designer.web.middleware.auth :refer [unauthorized-wo-token]]))

(deftest unauthorized-wo-token-test
  (testing "header is missing"
    (is (match?
          (http-response/unauthorized)
          (unauthorized-wo-token identity {:request {}}))))
  (testing "wrong authorization schema"
    (is (match?
          (http-response/unauthorized)
          (unauthorized-wo-token
            identity
            {:request
             {:headers
              {"authorization" "Basic am9objpkb2U="}}}))))
  (testing "invalid JWT"
    (let [valid-cfg {:jwt {:jwk        (jwt/generate-jwk)
                           :sign-opts  {:alg :rs512}
                           :expires-in 1}}
          invalid-cfg {:jwt {:jwk        (jwt/generate-jwk)
                             :sign-opts  {:alg :rs512}
                             :expires-in 1}}
          invalid-jwt (jwt/issue invalid-cfg "<account-id>")]
      (is (match?
            (http-response/unauthorized)
            (unauthorized-wo-token
              identity
              {:cfg valid-cfg
               :request
               {:headers
                {"authorization" (str "Bearer " invalid-jwt)}}})))))
  (testing "happy path"
    (let [cfg {:jwt {:jwk        (jwt/generate-jwk)
                     :sign-opts  {:alg :rs512}
                     :expires-in 1}}
          invalid-jwt (jwt/issue cfg "<account-id>")]
      (is (match?
            {:user {:accounts/id "<account-id>"}}
            (unauthorized-wo-token
              identity
              {:cfg cfg
               :request
               {:headers
                {"authorization" (str "Bearer " invalid-jwt)}}}))))))

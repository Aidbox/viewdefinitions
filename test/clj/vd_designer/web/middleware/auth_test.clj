(ns vd-designer.web.middleware.auth-test
  (:require [clojure.test :refer :all]
            [matcher-combinators.test :refer [match?]]
            [ring.util.http-response :as http-response]
            [vd-designer.service.jwt :as jwt]
            [vd-designer.utils.http :refer [apply-middleware]]
            [vd-designer.web.middleware.auth :refer [authentication-required-middleware]]))

(deftest authentication-required-middleware-test
  (testing "header is missing"
    (is (match?
         (http-response/unauthorized {:error nil})
         (apply-middleware authentication-required-middleware
                           identity
                           {:request {}}))))

  (testing "wrong authorization schema"
    (is (match?
         (http-response/unauthorized {:error nil})
         (apply-middleware authentication-required-middleware
                           identity
                           {:request
                            {:headers
                             {"authorization" "Basic am9objpkb2U="}}}))))

  (testing "invalid JWK"
    (let [valid-cfg   {:jwt {:jwk        (jwt/generate-jwk)
                             :sign-opts  {:alg :rs512}
                             :expires-in 1}}
          invalid-cfg {:jwt {:jwk        (jwt/generate-jwk)
                             :sign-opts  {:alg :rs512}
                             :expires-in 1}}
          invalid-jwt (jwt/issue invalid-cfg "<account-id>")]
      (is (match?
           (http-response/unauthorized
            {:error "Authentication seems manipulated, please re-authenticate"})
           (apply-middleware authentication-required-middleware
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
           {:user "<account-id>"}
           (apply-middleware authentication-required-middleware
                             identity
                             {:cfg cfg
                              :request
                              {:headers
                               {"authorization" (str "Bearer " invalid-jwt)}}}))))))

(ns vd-designer.web.middleware.auth-test
  (:require [clojure.test :refer :all]
            [matcher-combinators.test :refer [match?]]
            [ring.util.http-response :as http-response]
            [vd-designer.service.jwt :as jwt]
            [vd-designer.utils.http :refer [apply-middleware]]
            [vd-designer.web.middleware.auth :refer [authentication-middleware]]))

(deftest authentication-middleware-test
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
    (let [valid-cfg   {:jwt {:jwk        (jwt/generate-jwk)
                             :sign-opts  {:alg :rs512}
                             :expires-in 1}}
          invalid-cfg {:jwt {:jwk        (jwt/generate-jwk)
                             :sign-opts  {:alg :rs512}
                             :expires-in 1}}]
      (is (match?
           (http-response/unauthorized
            {:error "Authentication seems manipulated, please re-authenticate"})
           (apply-middleware (partial authentication-middleware true)
                             identity
                             {:cfg valid-cfg
                              :request
                              {:headers
                               {:Authorization (str "Bearer " (jwt/issue invalid-cfg "<account-id>"))}}})))))

  (testing "happy path"
    (let [cfg {:jwt {:jwk        (jwt/generate-jwk)
                     :sign-opts  {:alg :rs512}
                     :expires-in 1}}]
      (is (match?
           {:user "<account-id>"}
           (apply-middleware (partial authentication-middleware true)
                             identity
                             {:cfg cfg
                              :request
                              {:headers
                               {:Authorization (str "Bearer " (jwt/issue cfg "<account-id>"))}}}))))))

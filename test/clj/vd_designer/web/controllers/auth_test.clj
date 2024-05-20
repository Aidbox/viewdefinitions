(ns vd-designer.web.controllers.auth-test
  (:require [clojure.test :refer :all]
            [matcher-combinators.test :refer [match?]]
            [ring.util.http-response :as http-response]
            [vd-designer.test-kit :as test-kit]
            [vd-designer.utils.base64 :as base64]
            [vd-designer.web.controllers.auth :refer [sso-callback]]))

(deftest sso-callback-test
  (let [code "<code>"
        state (base64/encode "<base-redirect-uri>")]

    (testing "invalid SSO config"
      (is (match?
           (http-response/found "<base-redirect-uri>?error=%3Cerror+description%3E")
           (sso-callback
            (merge (test-kit/mk)
                   {:cfg          {:sso-config {:client-id     "<wrong client>"
                                                :client-secret "<wrong secret>"}}
                    :query-params {:code  code
                                   :state state}})))))

    (testing "incorrect query params"
      (testing "invalid code"
        (is (match?
             (http-response/found "<base-redirect-uri>?error=%3Cerror+description%3E")
             (sso-callback
              (merge (test-kit/mk)
                     {:query-params {:code  "<invalid code>"
                                     :state state}})))))

      (testing "state cannot be decoded"
        (is (match?
             (http-response/found "http://localhost:8280?result=%3Caccess+token%3E")
             (sso-callback
              (merge (test-kit/mk) {:query-params {:code  code
                                                   :state "<invalid state>"}})))))
      (testing "missing state"
        (is (match?
             (http-response/found "http://localhost:8280?result=%3Caccess+token%3E")
             (sso-callback
              (merge (test-kit/mk) {:query-params {:code code}}))))))

    (testing "happy path"
      ;; user created
      ;; session stored (access/refresh tokens)
      ;; JWT issued
      ;; http response
      )))

(comment
  (run-test sso-callback-test)
  )

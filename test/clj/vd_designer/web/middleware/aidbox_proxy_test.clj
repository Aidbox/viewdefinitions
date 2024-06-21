(ns vd-designer.web.middleware.aidbox-proxy-test
  (:require [clojure.test :refer :all]
            [matcher-combinators.test :refer [match?]]
            [ring.util.http-response :as http-response]
            [vd-designer.repository.account :as account]
            [vd-designer.repository.user-server :as user-server]
            [vd-designer.test-context :as test-context]
            [vd-designer.utils.http :refer [apply-middleware]]
            [vd-designer.web.middleware.aidbox-proxy :refer [aidbox-proxy-middleware]]))

(deftest aidbox-proxy-middleware-test
  (testing "public server"
    (let [result (apply-middleware
                  aidbox-proxy-middleware
                  http-response/ok
                  {:cfg     {:public-fhir-servers
                             [{:box-url "<box-url>"
                               :headers {:Authorization "<some-token>"}}]}
                   :request {:request-method :post
                             :body-params    {:box-url "<box-url>"}}})]
      (is (match? {:body {:fhir-server-headers {:Authorization "<some-token>"}}}
                  result))))

  (testing "private server:"
    (let [{:keys [db] :as ctx} (test-context/mk)
          [{account-id :accounts/id}] (account/create db {:email "<email>"})]

      (testing "doesn't belong to user"
        (is (match?
             (http-response/unauthorized {:error "Unknown server"})
             (apply-middleware
              aidbox-proxy-middleware
              identity
              (merge ctx
                     {:user account-id
                      :request
                      {:request-method :post
                       :body-params    {:box-url "<box-url>"}}})))))

      (testing "happy path"
        (user-server/create db {:server_name       "whatever"
                                :account_id        account-id
                                :box_url           "<box-url>"
                                :aidbox_auth_token "<aidbox-auth-token>"})
        (let [result (apply-middleware
                      aidbox-proxy-middleware
                      http-response/ok
                      (merge ctx
                             {:user account-id
                              :request
                              {:request-method :post
                               :body-params    {:box-url "<box-url>"}}}))]
          (is (match? {:body {:fhir-server-headers {:Cookie "aidbox-auth-token=<aidbox-auth-token>;"}}}
                      result)))))))

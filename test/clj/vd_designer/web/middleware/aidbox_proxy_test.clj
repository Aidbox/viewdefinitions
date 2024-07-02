(ns vd-designer.web.middleware.aidbox-proxy-test
  (:require [clojure.test :refer :all]
            [matcher-combinators.test :refer [match?]]
            [ring.util.http-response :as http-response]
            [vd-designer.fake.clients.portal :as fake-portal]
            [vd-designer.repository.account :as account]
            [vd-designer.repository.sso-token :as sso-token]
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
    (let [{:keys [db aidbox.portal/client] :as ctx} (test-context/mk)
          [{account-id :accounts/id}] (account/create db {:email "<email>"})]

      (testing "doesn't belong to user"
        (is (match?
             (http-response/unauthorized {:error "Unknown server"})
             (apply-middleware
              aidbox-proxy-middleware
              identity
              (merge ctx
                     {:user {:id account-id}
                      :request
                      {:request-method :post
                       :body-params    {:box-url "<box-url>"}}})))))

      (testing "Expired Aidbox portal access token"
        (let [token   "<expired-token>"
              box-url "<expired-box-url>"]
          (fake-portal/add-access-key client {:token token, :expired? true})
          (user-server/create db {:server_name       "whatever"
                                  :account_id        account-id
                                  :box_url           box-url
                                  :aidbox_auth_token token})
          (sso-token/create db {:account_id   account-id
                                :access_token token})

          (is (match?
               (http-response/unauthorized {:error "Session expired"})
               (apply-middleware
                aidbox-proxy-middleware
                http-response/unauthorized
                (merge ctx
                       {:user {:id account-id, :sso-token token}
                        :request
                        {:request-method :post
                         :body-params    {:box-url box-url}}}))))

          (is (match?
               (sso-token/get-all db)
               []))))

      (testing "happy path"
        (let [sso-token "<aidbox-auth-token>"]
          (user-server/create db {:server_name       "whatever"
                                  :account_id        account-id
                                  :box_url           "<box-url>"
                                  :aidbox_auth_token sso-token})
          (let [result (apply-middleware
                        aidbox-proxy-middleware
                        http-response/ok
                        (merge ctx
                               {:user {:id account-id, :sso-token sso-token}
                                :request
                                {:request-method :post
                                 :body-params    {:box-url "<box-url>"}}}))]
            (is (match? {:body {:fhir-server-headers {:Cookie (str "aidbox-auth-token=" sso-token ";")}}}
                        result))))))))

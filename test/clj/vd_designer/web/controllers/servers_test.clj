(ns vd-designer.web.controllers.servers-test
  (:require [clojure.test :refer [deftest testing is]]
            [matcher-combinators.matchers :as m]
            [matcher-combinators.test :refer [match?]]
            [ring.util.http-response :as http-response]
            [vd-designer.web.controllers.servers :as servers]
            [vd-designer.db.query :as query]
            [vd-designer.web.controllers.custom-servers :as custom-servers]
            [vd-designer.fake.clients.portal :as fake-portal]
            [vd-designer.repository.account :as account]
            [vd-designer.repository.sso-token :as sso-token]
            [vd-designer.repository.user-server :as user-server]
            [vd-designer.test-context :as test-context]))

(deftest servers-test
  (def valid-access-token {:token "<valid-access-token>" :expired? false})
  (def project-1-id (str (random-uuid)))
  (def project-2-id (str (random-uuid)))
  (def ctx (test-context/mk))
  (def db (:db ctx))
  (def cfg (:cfg ctx))
  (def client (:aidbox.portal/client ctx))

  (def account (first (account/create db {:email "<email>"})))

  (def account-id (:accounts/id account))

  (def ctx-with-user (assoc ctx :user {:id        account-id
                                       :sso-token (:token valid-access-token)}))
  (def public-servers (servers/select-server-keys (:public-fhir-servers cfg)))

  (testing "public servers only"
    (is (match? (http-response/ok {:public-servers public-servers})
                (servers/list-servers ctx))))

  (testing "3 licenses among 2 projects"
    (fake-portal/add-access-key client valid-access-token)

    (doseq [project [{:name "<project-1-name>", :id project-1-id}
                     {:name "<project-2-name>", :id project-2-id}]]
      (fake-portal/add-project client valid-access-token project))

    (doseq [license-base [{:box-url "https://box-url-1.com"
                           :name    "<license-1-name>"
                           :project {:id project-1-id}}
                          {:box-url "https://box-url-2.com"
                           :name    "<license-2-name>"
                           :project {:id project-2-id}}
                          {:box-url "https://box-url-3.com"
                           :name    "<license-3-name>"
                           :project {:id project-2-id}}]]
      (->> license-base
           (fake-portal/->valid-license (:token valid-access-token))
           (fake-portal/add-license client)))

    ;; to verify the last one is picked
    (doseq [token [{:token "<access-token-1>"}
                   {:token "<access-token-2>"}
                   valid-access-token]]
      (sso-token/create db {:account_id   account-id
                            :access_token (:token token)}))

    (is (match?
          (m/via (fn [r] (-> r :body :portal-servers))
                 (m/in-any-order
                   [{:name "<project-2-name>",
                     :id some?
                     :new-license-url string?
                     :boxes
                     [{:box-url "https://box-url-3.com",
                       :project-id some?
                       :aidbox-auth-token "<valid-access-token>",
                       :account-id 1,
                       :server-name "<license-3-name>"}
                      {:box-url "https://box-url-2.com",
                       :project-id some?
                       :aidbox-auth-token "<valid-access-token>",
                       :account-id 1,
                       :server-name "<license-2-name>"}]}
                    {:id some?
                     :name "<project-1-name>",
                     :new-license-url string?
                     :boxes
                     [{:box-url "https://box-url-1.com",
                       :project-id some?
                       :aidbox-auth-token "<valid-access-token>",
                       :account-id 1,
                       :server-name "<license-1-name>"}]}]))
          (servers/list-servers ctx-with-user)))

    (is (match?
          (m/in-any-order
            [#:user_servers{:account_id        account-id
                            :server_name       "<license-1-name>"
                            :box_url           "https://box-url-1.com"
                            :aidbox_auth_token (:token valid-access-token)}
             #:user_servers{:account_id        account-id
                            :server_name       "<license-2-name>"
                            :box_url           "https://box-url-2.com"
                            :aidbox_auth_token (:token valid-access-token)}
             #:user_servers{:account_id        account-id
                            :server_name       "<license-3-name>"
                            :box_url           "https://box-url-3.com"
                            :aidbox_auth_token (:token valid-access-token)}])
          (user-server/get-all db))))

  (testing "custom user servers"

    (testing "create custom user server"

      (query/truncate! db "user_servers")

      (is (match?
            (http-response/ok
              {:box-url "<url>"
               :server-name "<server-name>"
               :headers {} })
            (custom-servers/add-custom-server
              (assoc ctx-with-user :request
                     {:body-params
                      {:box-url "<url>"
                       :server-name "<server-name>"
                       :headers {}}}))))

      (is (match?
            (http-response/bad-request {:error "Server already exists"})
            (custom-servers/add-custom-server
              (assoc ctx-with-user :request
                     {:body-params
                      {:box-url "<url>"
                       :server-name "<server-name>"
                       :headers {}}})))))

    (testing "update custom user server"
      (is (match?
            (http-response/ok
              {:box-url "<url1>"
               :server-name "<server-name1>"
               :headers {:header "1"} })
            (custom-servers/update-custom-server
              (assoc ctx-with-user :request
                     {:body-params
                      {:old {:box-url "<url>"
                             :server-name "<server-name>"
                             :headers {}}
                       :new
                       {:box-url "<url1>"
                        :server-name "<server-name1>"
                        :headers {:header "1"}}}})))))

    (testing "list custom user server"
      (is (match?
            (http-response/ok
              {:portal-servers [{} {}]
               :public-servers [{:sandbox true}]
               :custom-servers
               [{:server-name "<server-name1>"
                 :box-url "<url1>"
                 :headers {:header "1"}}]})
            (servers/list-servers ctx-with-user))))

    (testing "delete custom user server"
      (is (match?
            (http-response/ok
              {:box-url "<url1>"
               :server-name "<server-name1>"})
            (custom-servers/delete-custom-server
              (assoc ctx-with-user :request
                     {:body-params
                      {:box-url "<url1>"
                        :server-name "<server-name1>"}})))))))

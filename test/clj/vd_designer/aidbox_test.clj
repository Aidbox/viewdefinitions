(ns vd-designer.aidbox-test
  (:require [clojure.test :refer :all]
            [matcher-combinators.matchers :as m]
            [matcher-combinators.test :refer [match?]]
            [ring.util.http-response :as http-response]
            [vd-designer.portal :as sut]
            [vd-designer.fake.clients.portal :as fake-portal]
            [vd-designer.repository.account :as account]
            [vd-designer.repository.sso-token :as sso-token]
            [vd-designer.repository.user-server :as user-server]
            [vd-designer.test-context :as test-context]))

(deftest list-servers-test
  (let [valid-access-token {:token    "<valid-access-token>"
                            :expired? false}
        [project-1-id project-2-id] (repeatedly 2 random-uuid)

        {:keys [aidbox.portal/client cfg db] :as ctx} (test-context/mk)
        [{account-id :accounts/id}] (account/create db {:email "<email>"})

        ctx-with-user (assoc ctx :user {:id        account-id
                                        :sso-token (:token valid-access-token)})
        public-servers (sut/select-server-keys (:public-fhir-servers cfg))]

    (testing "public servers only"
      (is (match? (http-response/ok public-servers)
                  (sut/list-servers ctx))))

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
           (m/via :body
                  (m/in-any-order
                   (concat
                    public-servers
                    [{:box-url     "https://box-url-1.com"
                      :server-name "<license-1-name>"
                      :project
                      {:id              project-1-id
                       :name            "<project-1-name>"
                          ;; Aidbox base URL is taken from cfg
                       :new-license-url (format "http://127.0.0.1.nip.io:8789/ui/portal#/project/%s/license/new"
                                                project-1-id)}}

                     {:box-url     "https://box-url-2.com"
                      :server-name "<license-2-name>"
                      :project
                      {:id              project-2-id
                       :name            "<project-2-name>"
                       :new-license-url (format "http://127.0.0.1.nip.io:8789/ui/portal#/project/%s/license/new"
                                                project-2-id)}}

                     {:box-url     "https://box-url-3.com"
                      :server-name "<license-3-name>"
                      :project
                      {:id              project-2-id
                       :name            "<project-2-name>"
                       :new-license-url (format "http://127.0.0.1.nip.io:8789/ui/portal#/project/%s/license/new"
                                                project-2-id)}}])))
           (sut/list-servers ctx-with-user)))

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
           (user-server/get-all db))))))

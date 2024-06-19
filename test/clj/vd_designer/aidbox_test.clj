(ns vd-designer.aidbox-test
  (:require [clojure.test :refer :all]
            [matcher-combinators.matchers :as m]
            [matcher-combinators.test :refer [match?]]
            [vd-designer.aidbox :as sut]
            [vd-designer.fake.clients.portal :as fake-portal]
            [vd-designer.repository.account :as account]
            [vd-designer.repository.sso-token :as sso-token]
            [vd-designer.repository.user-server :as user-server]
            [vd-designer.test-context :as test-context]))

(deftest list-user-servers-test
  (let [valid-access-token "<valid-access-token>"
        [project-1-id project-2-id] (repeatedly 2 random-uuid)
        aidbox-auth-token "<aidbox-auth-token>"

        {:keys [aidbox.portal/client db] :as ctx} (test-context/mk)
        [account-id-map] (account/create db {:email "<email>"})]

    (testing "0 servers"
      (is (match? [] (sut/list-user-servers ctx (:accounts/id account-id-map)))))

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
             (fake-portal/->valid-license aidbox-auth-token)
             (fake-portal/add-license client)))

      ;; to verify the last one is picked
      (doseq [token ["<access-token-1>"
                     "<access-token-2>"
                     valid-access-token]]
        (sso-token/create db {:account_id   (:accounts/id account-id-map)
                              :access_token token}))

      (is (match?
           (m/in-any-order
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
                                        project-2-id)}}])
           (sut/list-user-servers ctx (:accounts/id account-id-map))))

      (is (match?
           (m/in-any-order
            [#:user_servers{:account_id        (:accounts/id account-id-map)
                            :server_name       "<license-1-name>"
                            :box_url           "https://box-url-1.com"
                            :aidbox_auth_token aidbox-auth-token}
             #:user_servers{:account_id        (:accounts/id account-id-map)
                            :server_name       "<license-2-name>"
                            :box_url           "https://box-url-2.com"
                            :aidbox_auth_token aidbox-auth-token}
             #:user_servers{:account_id        (:accounts/id account-id-map)
                            :server_name       "<license-3-name>"
                            :box_url           "https://box-url-3.com"
                            :aidbox_auth_token aidbox-auth-token}])
           (user-server/get-all db))))))

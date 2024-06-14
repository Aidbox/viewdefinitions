(ns vd-designer.aidbox.proxy.private
  (:require [jsonista.core :as json]
            [martian.core :as martian]
            [org.httpkit.client :as http-client]
            [vd-designer.clients.portal :as portal]
            [vd-designer.repository.user-server :as user-server])
  (:import (vd_designer.aidbox.proxy AidboxProxyServer)))

(defn aidbox-auth-token-cookie [{:keys [db request user]}]
  (->> request :body-params :box-url
       (user-server/get-by-account-id-and-box-url db (:accounts/id user))
       :aidbox_auth_token
       (format "aidbox-auth-token=%s;")))

(defrecord PrivateAidboxServerProxy [db request user]

  AidboxProxyServer

  (connect [this-ctx]
    @(http-client/get
       (-> request :body-params :box-url (str "/fhir/ViewDefinition"))
       {:headers
        {"Cookie"       (aidbox-auth-token-cookie this-ctx)
         "Accept"       "application/json"
         "Content-Type" "application/transit+json"}}))

  (get-view-definition [this-ctx]
    (let [{:keys [box-url vd-id]} (-> request :query-params)]
      @(http-client/get
         (str box-url "/fhir/ViewDefinition/" vd-id)
         {:headers
          {"Cookie"       (aidbox-auth-token-cookie this-ctx)
           "Accept"       "application/json"
           "Content-Type" "application/transit+json"}})))

  (eval-view-definition [this-ctx]
    (let [{:keys [box-url view-definition]} (:body-params request)
          req {:Cookie (aidbox-auth-token-cookie this-ctx)
               :method 'sof/eval-view
               :params {:limit 100
                        :view  view-definition}}]
      @(martian/response-for (portal/client box-url) :rpc req)))

  (save-view-definition [this-ctx]
    (let [{:keys [box-url view-definition vd-id]} (:body-params request)
          request-fn (if vd-id
                       #(http-client/put (str box-url "/fhir/ViewDefinition/" vd-id) %)
                       #(http-client/post (str box-url "/fhir/ViewDefinition") %))]
      @(request-fn
         {:headers
          {"Cookie"       (aidbox-auth-token-cookie this-ctx)
           "Accept"       "application/json"
           "Content-Type" "application/json"}
          :body (json/write-value-as-string view-definition)})))

  (delete-view-definition [this-ctx]
    (let [{:keys [box-url vd-id]} (:body-params request)]
      @(http-client/delete
         (str box-url "/fhir/ViewDefinition/" vd-id)
         {:headers
          {"Cookie"       (aidbox-auth-token-cookie this-ctx)
           "Accept"       "application/json"
           "Content-Type" "application/json"}}))))

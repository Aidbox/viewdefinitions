(ns vd-designer.aidbox.proxy.private
  (:require [jsonista.core :as json]
            [martian.core :as martian]
            [org.httpkit.client :as http-client]
            [vd-designer.aidbox.proxy]
            [vd-designer.clients.portal :as portal])
  (:import (vd_designer.aidbox.proxy AidboxProxyServer)))

(defrecord PrivateAidboxServerProxy [db request user fhir-server-headers]

  AidboxProxyServer

  (connect [_this-ctx]
    @(http-client/get
       (-> request :body-params :box-url (str "/fhir/ViewDefinition"))
       {:headers
        (merge {"Accept"       "application/json"
                "Content-Type" "application/transit+json"}
               fhir-server-headers)}))

  (get-view-definition [_this-ctx]
    (let [{:keys [box-url vd-id]} (-> request :query-params)]
      @(http-client/get
         (str box-url "/fhir/ViewDefinition/" vd-id)
         {:headers
          (merge {"Accept"       "application/json"
                  "Content-Type" "application/transit+json"}
                 fhir-server-headers)})))

  (eval-view-definition [this-ctx]
    (let [{:keys [box-url vd]} (:body-params request)
          req {:Cookie (get fhir-server-headers "Cookie")
               :method 'sof/eval-view
               :params {:limit 100
                        :view  vd}}]
      @(martian/response-for (portal/client box-url) :rpc req)))

  (save-view-definition [this-ctx]
    (let [{:keys [box-url vd vd-id]} (:body-params request)
          request-fn (if vd-id
                       #(http-client/put (str box-url "/fhir/ViewDefinition/" vd-id) %)
                       #(http-client/post (str box-url "/fhir/ViewDefinition") %))]
      @(request-fn
         {:headers
          (merge {"Accept"       "application/json"
                  "Content-Type" "application/json"}
                 fhir-server-headers)
          :body (json/write-value-as-string vd)})))

  (delete-view-definition [this-ctx]
    (let [{:keys [box-url vd-id]} (:body-params request)]
      @(http-client/delete
         (str box-url "/fhir/ViewDefinition/" vd-id)
         {:headers
          (merge {"Accept"       "application/json"
                  "Content-Type" "application/json"}
                 fhir-server-headers)}))))

(defn mk [ctx user-server]
  (-> ctx
      (assoc :fhir-server-headers
             {"Cookie" (->> user-server
                           :user_servers/aidbox_auth_token
                           (format "aidbox-auth-token=%s;"))})
      (map->PrivateAidboxServerProxy)))

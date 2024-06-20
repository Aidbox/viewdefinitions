(ns vd-designer.aidbox.proxy.public
  (:require [jsonista.core :as json]
            [martian.core :as martian]
            [org.httpkit.client :as http-client]
            [vd-designer.aidbox.proxy]
            [vd-designer.clients.portal :as portal])
  (:import (vd_designer.aidbox.proxy AidboxProxyServer)))

(defrecord PublicAidboxServerProxy [cfg db request user fhir-server-headers]

  AidboxProxyServer

  (connect [_this-ctx]
    @(http-client/get
       (-> request :body-params :box-url (str "/fhir/ViewDefinition"))
       {:headers
        (merge {"Accept"       "application/json"
                "Content-Type" "application/transit+json"}
               fhir-server-headers)}))

  (get-view-definition [_this-ctx]
    (let [{:keys [box-url vd-id]} (:query-params request)]
      @(http-client/get
         (str box-url "/fhir/ViewDefinition/" vd-id)
         {:headers
          (merge {"Accept"       "application/json"
                  "Content-Type" "application/transit+json"}
                 fhir-server-headers)})))

  (eval-view-definition [_this-ctx]
    (let [{:keys [box-url vd]} (:body-params request)
          aidbox-client (portal/client box-url)
          req {:authorization (get fhir-server-headers "Authorization")
               :method        'sof/eval-view
               :params        {:limit 100
                               :view  vd}}]
      @(martian/response-for aidbox-client :rpc req)))

  (save-view-definition [_this-ctx]
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

  (delete-view-definition [_this-ctx]
    (let [{:keys [box-url vd-id]} (:body-params request)]
      @(http-client/delete
         (format "%s/fhir/ViewDefinition/%s" box-url vd-id)
         {:headers
          (merge {"Accept"       "application/json"
                  "Content-Type" "application/json"}
                 fhir-server-headers)}))))

(defn mk [ctx public-server]
  (-> ctx
      (assoc :fhir-server-headers (:headers public-server))
      (map->PublicAidboxServerProxy)))

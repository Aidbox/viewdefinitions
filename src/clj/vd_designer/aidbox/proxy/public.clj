(ns vd-designer.aidbox.proxy.public
  (:require [jsonista.core :as json]
            [martian.core :as martian]
            [org.httpkit.client :as http-client]
            [vd-designer.clients.portal :as portal])
  (:import (vd_designer.aidbox.proxy AidboxProxyServer)))

(defrecord PublicAidboxServerProxy [cfg db request user public-server]

  AidboxProxyServer

  (connect [_this-ctx]
    (let [box-url (-> request :body-params :box-url)]
      @(http-client/get
         (str box-url "/fhir/ViewDefinition")
         {:headers (merge {"Accept"       "application/json"
                           "Content-Type" "application/transit+json"}
                          (:headers public-server))})))

  (get-view-definition [_this-ctx]
    (let [{:keys [box-url vd-id]} (:query-params request)]
      @(http-client/get
         (str box-url "/fhir/ViewDefinition/" vd-id)
         {:headers
          (-> {"Accept"       "application/json"
               "Content-Type" "application/transit+json"}
              (merge (:headers public-server)))})))

  (eval-view-definition [_this-ctx]
    (let [{:keys [box-url vd]} (:body-params request)
          aidbox-client (portal/client box-url)
          req {:authorization (-> public-server :headers (get "Authorization"))
               :method        'sof/eval-view
               :params        {:limit 100
                               :view  vd}}]
      @(martian/response-for aidbox-client :rpc req)))

  (save-view-definition [_this-ctx]
    (let [{:keys [box-url view-definition vd-id]} (:body-params request)
          request-fn (if vd-id
                       #(http-client/put (str box-url "/fhir/ViewDefinition/" vd-id) %)
                       #(http-client/post (str box-url "/fhir/ViewDefinition") %))]
      @(request-fn
         {:headers
          (merge {"Accept"       "application/json"
                  "Content-Type" "application/json"}
                 (:headers public-server))
          :body (json/write-value-as-string view-definition)})))

  (delete-view-definition [_this-ctx]
    (let [{:keys [box-url vd-id]} (:body-params request)]
      @(http-client/delete
         (format "%s/fhir/ViewDefinition/%s" box-url vd-id)
         {:headers
          (merge {"Accept"       "application/json"
                  "Content-Type" "application/json"}
                 (:headers public-server))}))))

(defn mk [ctx public-server]
  (map->PublicAidboxServerProxy (assoc ctx
                                  :public-server public-server)))

(ns vd-designer.web.controllers.auth
  (:require [clojure.string :as str]
            [lambdaisland.uri :as uri]
            [ring.util.http-predicates :as predicates]
            [ring.util.http-response :as http-response]
            [vd-designer.clients.portal :as portal]
            [vd-designer.repository.sso-token :as sso-token]
            [vd-designer.service.sso :as sso-service]
            [vd-designer.utils.base64 :as base64]))

(defn check [{:keys [aidbox.portal/client db user]}]
  (if (predicates/unauthorized? @(portal/rpc:init-project client (:sso-token user)))
    (do
      (sso-token/delete db (:id user))
      (http-response/unauthorized {:error "Aidbox session expired"}))
    (http-response/ok)))


(defn sso-redirect
  [{{{:keys [route]} :query-params} :request
    config                          :cfg}]
  (let [{:keys [client-id provider-url]} (:sso config)
        host (:vd.designer.app/url config)]
    (-> provider-url
        (uri/assoc-query {:response_type "code"
                          :client_id     client-id
                          :redirect_uri  (str host "/api/auth/sso-callback")
                          :state         (base64/encode route)})
        (uri/join "#/signin")
        uri/uri-str
        http-response/found)))


(defn- construct-sso-callback-response [sso-config state sso-result]
  (let [default-url (:default-redirect-url sso-config)
        box-url (if (empty? state)
                  default-url
                  (try (base64/decode state)
                       (catch Exception _ default-url)))
        query-map (if (empty? (:error sso-result))
                    {:authentication (:result sso-result)}
                    sso-result)]
    (-> box-url
        (uri/assoc-query query-map)
        uri/uri-str
        http-response/found)))

(defn sso-callback
  [{{{:keys [code state]} :query-params} :request
    config                               :cfg
    :as                                  ctx}]
  (let [sso-result (if (str/blank? code)
                     {:error "Missing authorization code"}
                     (sso-service/authenticate ctx code))]
    (construct-sso-callback-response (:sso config) state sso-result)))

(ns vd-designer.clients.portal
  (:require [martian.core :as martian]
            [martian.httpkit :as martian-http]
            [schema.core :as s]
            [vd-designer.clients.interceptors :as interceptors]))

(def routes
  [{:route-name  :sso-code-exchange
    :path-parts  ["/auth/token"]
    :produces    ["application/json"]
    :consumes    ["application/json"]
    :method      :post
    :body-schema {:body {:client_id     s/Str
                         :client_secret s/Str
                         :code          s/Str
                         ;; TODO use enum here
                         :grant_type    s/Str}}}

   {:route-name     :rpc
    :path-parts     ["/rpc"]
    :method         :post
    ;; use middleware for this?
    :headers-schema {(s/optional-key :Cookie)        s/Str
                     (s/optional-key :Authorization) s/Str}
    :produces       ["application/transit+json"]
    :consumes       ["application/transit+json"]
    :body-schema    {:body {:method                  s/Symbol
                            (s/optional-key :params) s/Any}}}])

(defn client [url]
  (martian/bootstrap
   url
   routes
   {:interceptors (concat [(interceptors/observability "portal")]
                          martian-http/default-interceptors)}))

(defn rpc:init-project [portal-client access-token]
  (martian/response-for portal-client
                        :rpc
                        {:method        'portal.portal/init-project
                         :Authorization (str "Bearer " access-token)}))

(defn rpc:fetch-licenses [portal-client access-token project-id]
  (martian/response-for portal-client
                        :rpc
                        {:method        'portal.portal/fetch-licenses
                         :Authorization (str "Bearer " access-token)
                         :params        {:project-id project-id}}))

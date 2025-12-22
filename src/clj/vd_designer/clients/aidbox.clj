(ns vd-designer.clients.aidbox
  (:require
   [martian.core :as martian]
   [martian.httpkit :as martian-http]
   [schema.core :as s]
   [vd-designer.clients.interceptors :as interceptors]))

(def routes
  [{:route-name     :connect
    :path-parts     ["/ViewDefinition"]
    :produces       ["application/json"]
    :consumes       ["application/json"]
    :headers-schema {(s/optional-key :Cookie)        s/Str
                     (s/optional-key :Authorization) s/Str}
    :method         :get}

   {:route-name     :get-view-definition
    :path-parts     ["/ViewDefinition/" :vd-id]
    :path-schema    {:vd-id s/Str}
    :headers-schema {(s/optional-key :Cookie)        s/Str
                     (s/optional-key :Authorization) s/Str}
    :produces       ["application/json"]
    :consumes       ["application/json"]
    :method         :get}

   {:route-name     :create-view-definition
    :path-parts     ["/ViewDefinition"]
    :headers-schema {(s/optional-key :Cookie)        s/Str
                     (s/optional-key :Authorization) s/Str}
    :produces       ["application/json"]
    :consumes       ["application/json"]
    :method         :post
    :body-schema    {:body s/Any}}

   {:route-name     :update-view-definition
    :path-parts     ["/ViewDefinition/" :vd-id]
    :path-schema    {:vd-id s/Str}
    :headers-schema {(s/optional-key :Cookie)        s/Str
                     (s/optional-key :Authorization) s/Str}
    :produces       ["application/json"]
    :consumes       ["application/json"]
    :method         :put
    :body-schema    {:body s/Any}}

   {:route-name     :delete-view-definition
    :path-parts     ["/ViewDefinition/" :vd-id]
    :path-schema    {:vd-id s/Str}
    :headers-schema {(s/optional-key :Cookie)        s/Str
                     (s/optional-key :Authorization) s/Str}
    :produces       ["application/json"]
    :consumes       ["application/json"]
    :method         :delete}

   {:route-name     :view-definition-run
    :path-parts     ["/ViewDefinition/$run"]
    :headers-schema {(s/optional-key :Cookie)        s/Str
                     (s/optional-key :Authorization) s/Str}
    :produces       ["application/json"]
    :consumes       ["application/json"]
    :method         :post
    :body-schema    {:body s/Any}}

   {:route-name     :get-view-definition-sql
    :path-parts     ["/ViewDefinition/$sql"]
    :headers-schema {(s/optional-key :Cookie)        s/Str
                     (s/optional-key :Authorization) s/Str}
    :produces       ["application/json"]
    :consumes       ["application/json"]
    :method         :post
    :body-schema    {:body s/Any}}

   {:route-name     :rpc
    :path-parts     ["/rpc"]
    :method         :post
    :headers-schema {(s/optional-key :Cookie)        s/Str
                     (s/optional-key :Authorization) s/Str}
    :produces       ["application/json"]
    :consumes       ["application/json"]
    :body-schema    {:body {:method                  s/Symbol
                            (s/optional-key :params) s/Any}}}

   {:route-name     :metadata
    :query-schema   {:box-url s/Str}
    :path-parts     ["/metadata"]
    :produces       ["application/json"]
    :consumes       ["application/json"]
    :method         :get}])

(defn aidbox-client [url]
  (martian/bootstrap
    url
    routes
    {:interceptors (concat [(interceptors/observability "fhir-server")]
                           martian-http/default-interceptors)}))

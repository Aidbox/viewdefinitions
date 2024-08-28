(ns vd-designer.clients.aidbox
  (:require
   [clojure.string :as str]
   [martian.core :as martian]
   [martian.httpkit :as martian-http]
   [schema.core :as s]
   [vd-designer.clients.interceptors :as interceptors]))

(def routes
  [{:route-name     :connect
    :path-parts     ["/fhir/ViewDefinition"]
    :produces       ["application/transit+json"]
    :consumes       ["application/json"]
    :headers-schema {(s/optional-key :Cookie)        s/Str
                     (s/optional-key :Authorization) s/Str}
    :method         :get}

   {:route-name     :get-view-definition
    :path-parts     ["/fhir/ViewDefinition/" :vd-id]
    :path-schema    {:vd-id s/Str}
    :headers-schema {(s/optional-key :Cookie)        s/Str
                     (s/optional-key :Authorization) s/Str}
    :produces       ["application/transit+json"]
    :consumes       ["application/json"]
    :method         :get}

   {:route-name     :create-view-definition
    :path-parts     ["/fhir/ViewDefinition"]
    :headers-schema {(s/optional-key :Cookie)        s/Str
                     (s/optional-key :Authorization) s/Str}
    :produces       ["application/json"]
    :consumes       ["application/json"]
    :method         :post
    :body-schema    {:body s/Any}}

   {:route-name     :update-view-definition
    :path-parts     ["/fhir/ViewDefinition/" :vd-id]
    :path-schema    {:vd-id s/Str}
    :headers-schema {(s/optional-key :Cookie)        s/Str
                     (s/optional-key :Authorization) s/Str}
    :produces       ["application/json"]
    :consumes       ["application/json"]
    :method         :put
    :body-schema    {:body s/Any}}

   {:route-name     :delete-view-definition
    :path-parts     ["/fhir/ViewDefinition/" :vd-id]
    :path-schema    {:vd-id s/Str}
    :headers-schema {(s/optional-key :Cookie)        s/Str
                     (s/optional-key :Authorization) s/Str}
    :produces       ["application/json"]
    :consumes       ["application/json"]
    :method         :delete}

   {:route-name     :rpc
    :path-parts     ["/rpc"]
    :method         :post
    ;; use middleware for this?
    :headers-schema {(s/optional-key :Cookie)        s/Str
                     (s/optional-key :Authorization) s/Str}
    :produces       ["application/transit+json"]
    :consumes       ["application/transit+json"]
    :body-schema    {:body {:method                  s/Symbol
                            (s/optional-key :params) s/Any}}}

   {:route-name     :metadata
    :query-schema   {:box-url s/Str}
    :path-parts     ["/fhir/metadata"]
    :produces       ["application/json"]
    :consumes       ["application/json"]
    :method         :get}])

(defn- aidbox-client* [url title]
  (martian/bootstrap
    url
    routes
    {:interceptors (concat [(interceptors/observability title)]
                           martian-http/default-interceptors)}))

(defn aidbox-portal-client [url]
  (aidbox-client* url "portal"))

(defn custom-server-client [url]
  (aidbox-client* url "custom-server"))

(defn aidbox-client [url]
  (cond
    (and url (str/includes? url "aidbox.app"))
    (aidbox-portal-client url)

    :else
    (custom-server-client url)))

(ns vd-designer.clients.portal
  (:require [martian.core :as martian]
            [martian.httpkit :as martian-http]
            [schema.core :as s]))

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
                         :grant_type    s/Str}}}])

(defn client [aidbox-portal-url]
  (martian/bootstrap
   aidbox-portal-url
   routes
   {:interceptors martian-http/default-interceptors}))

(ns vd-designer.web.clients.portal
  (:require [martian.core :as martian]
            [martian.httpkit :as martian-http]
            [schema.core :as s]))

(def routes
  [{:route-name  :sso-code-exchange
    :path-parts  ["/auth/token"]
    :produces ["application/json"]
    :consumes ["application/json"]
    :method      :post
    :body-schema {:body {:client_id     s/Str
                         :client_secret s/Str
                         :code          s/Str
                         ;; TODO use enum here
                         :grant_type    s/Str}}}])

(def portal-client
  (martian/bootstrap
   "http://127.0.0.1.nip.io:8789"
   routes
   {:interceptors martian-http/default-interceptors}))

;; {
;;   "grant_type": "refresh_token",
;;   "client_id": "webapp",
;;   "refresh_token": "eyJhb..PloA"
;; }

(ns server-repl ;; TODO: learn and apply the best practices of REPL namespaces
  (:require [martian.core :as martian]
            [vd-designer.core :refer [app]]
            [vd-designer.web.clients.portal :refer [portal-client]]))

(comment
  (martian/explore portal-client)

  (martian/url-for portal-client :sso-code-exchange)

  (martian/request-for
   portal-client :sso-code-exchange
   {:client-id     "vd-designer"
    :client-secret "changeme"
    :code          "<code>"
    :grant-type    "authorization_code"})

  @(martian/response-for
    portal-client :sso-code-exchange
    {:client-id     "vd-designer"
     :client-secret "changeme"
     :code          "<code>"
     :grant-type    "authorization_code"})



  (app {:request-method :get
        :uri            "/api/health"})

  (app {:request-method :get
        :uri            "/api/echo"
        :query-params   {:test 123}})

  (app {:request-method :get
        :uri            "/bad-route"}))

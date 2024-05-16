(ns vd-designer.web.routes.router
  (:require [vd-designer.web.controllers.auth :as auth]
            [muuntaja.core :as m]
            [reitit.ring :as ring]
            [reitit.ring.coercion :as coercion]
            [reitit.ring.middleware.muuntaja :as muuntaja]
            [vd-designer.web.middleware.query :refer [query-string-middleware]]
            [vd-designer.web.controllers.health :as health]))

(defn router []
  (ring/router
    ["/api"
     ["/health" {:get #'health/check}]
     ["/auth"
      ["/sso-callback" {:get
                        {:summary    "Callback for SSO auth"
                         :parameters {:query {:code  string?
                                              :state string?}}
                         :handler    #'auth/sso-callback}}]]]

    {:data {:muuntaja   m/instance
            :middleware [muuntaja/format-middleware
                         query-string-middleware
                         coercion/coerce-exceptions-middleware
                         coercion/coerce-request-middleware
                         coercion/coerce-response-middleware]}}))

(ns vd-designer.web.routes.router
  (:require [muuntaja.core :as m]
            [reitit.ring :as ring]
            [reitit.ring.coercion :as coercion]
            [reitit.ring.middleware.muuntaja :as muuntaja]
            [vd-designer.web.controllers.auth :as auth]
            [vd-designer.web.controllers.health :as health]
            [vd-designer.web.middleware.context :refer [app-context-middleware]]
            [vd-designer.web.middleware.query :refer [query-string-middleware]]))

(defn router [ctx]
  (ring/router
   ["/api"
    ["/health" {:get #'health/check}]
    ["/auth"
     ["/sso" {:get
              {:summary "Redirect to SSO provider"
               :handler #'auth/sso-redirect}}]
     ["/sso-callback" {:get
                       {:summary    "Callback for SSO auth"
                        :parameters {:query {:code  string?
                                             :state string?}}
                        :handler    #'auth/sso-callback}}]]]

   {:data {:muuntaja   m/instance
           :middleware [(app-context-middleware ctx)
                        muuntaja/format-middleware
                        query-string-middleware
                        coercion/coerce-exceptions-middleware
                        coercion/coerce-request-middleware
                        coercion/coerce-response-middleware]}}))

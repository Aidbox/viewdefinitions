(ns vd-designer.web.routes.router
  (:require [muuntaja.core :as m]
            [reitit.ring :as ring]
            [reitit.ring.coercion :as coercion]
            [reitit.ring.middleware.muuntaja :as muuntaja]
            [vd-designer.aidbox :as aidbox]
            [vd-designer.web.controllers.auth :as auth]
            [vd-designer.web.controllers.health :as health]
            [vd-designer.web.middleware.auth :as middleware.auth]
            [vd-designer.web.middleware.context :refer [app-context-middleware]]
            [vd-designer.web.middleware.query :refer [query-string-middleware]]))

(defn router [ctx]
  (ring/router
   ["/api"
    ["/aidbox"
     {:middleware [middleware.auth/authorize]}
     ["/servers" {:get
                  {:handler #'aidbox/list-servers}}]
     ["/connect" {:post
                  {:parameters {:body {:box-url string?}}
                   :handler #'aidbox/connect}}]
     ["/ViewDefinition"
      ;; TODO: make prettier
      ["" {:get
           {:parameters {:query {:vd-id  string?
                                 :box-url string?}}
            :handler #'aidbox/get-view-definition}
           :post
           {#_#_:parameters {:body {:box-url string? :vd string?}}
            :handler #'aidbox/save-view-definition}}]
      ["/eval"
       {:post
        {:parameters {:body {:box-url string? :view-definition string?}}
         :handler #'aidbox/eval-view-definition}}]]]
    ["/auth"
     ["/sso" {:get
              {:summary "Redirect to SSO provider"
               :handler #'auth/sso-redirect}}]
     ["/sso-callback" {:get
                       {:summary    "Callback for SSO auth"
                        :parameters {:query {:code  string?
                                             :state string?}}
                        :handler    #'auth/sso-callback}}]]
    ["/health" {:get #'health/check}]]

   {:data {:muuntaja   m/instance
           :middleware [muuntaja/format-middleware
                        query-string-middleware
                        coercion/coerce-exceptions-middleware
                        coercion/coerce-request-middleware
                        coercion/coerce-response-middleware
                        (app-context-middleware ctx)]}}))

(ns vd-designer.web.routes.router
  (:require [muuntaja.core :as m]
            [reitit.ring :as ring]
            [reitit.ring.coercion :as coercion]
            [reitit.ring.middleware.muuntaja :as muuntaja]
            [vd-designer.portal :as portal]
            [vd-designer.aidbox :as aidbox]
            [vd-designer.web.controllers.auth :as auth]
            [vd-designer.web.controllers.custom-servers :as custom-servers]
            [vd-designer.web.controllers.health :as health]
            [vd-designer.web.controllers.metrics :as metrics]
            [vd-designer.web.middleware.aidbox-proxy :refer [aidbox-proxy-middleware]]
            [vd-designer.web.middleware.auth :refer [authentication-middleware]]
            [vd-designer.web.middleware.context :refer [app-context-middleware]]
            [vd-designer.web.middleware.observability :refer [observability-middleware]]
            [vd-designer.web.middleware.query :refer [query-string-middleware]]))

(defn router [ctx]
  (ring/router
   [["/metrics"
     {:get
      {:handler #'metrics/expose}}]

    ["/api"
     ;; should be public
     ["/metadata"
      {:get
       {:parameters {:query {:box-url string?}}
        :handler    #'aidbox/get-metadata}}]

     ["/aidbox" {:middleware [(authentication-middleware false)]}
      ["/servers"
       {:get  {:handler #'portal/list-servers}
        :post {:parameters {:body {:server-name string?
                                   :box-url string?
                                   :headers any?}}
               :handler    #'custom-servers/add-custom-server
               :middleware [(authentication-middleware true)]}

        :put {:parameters
                 {:body
                  {:old
                   {:server-name string?
                    :box-url string?}
                   :new
                   {:server-name string?
                    :box-url string?
                    :headers any?}}}
               :handler    #'custom-servers/update-custom-server
               :middleware [(authentication-middleware true)]}

        :delete {:parameters {:body {:server-name string?
                                     :box-url string?}}
               :handler    #'custom-servers/delete-custom-server
               :middleware [(authentication-middleware true)]}}]
      ["/connect"
       {:post
        {:parameters {:body {:box-url string? :headers any?}}
         :handler    #'aidbox/connect
         :middleware [(aidbox-proxy-middleware)]}}]

      ["/ViewDefinition" {:middleware [(aidbox-proxy-middleware)]}
      ;; TODO: make prettier
       [""
        {:get
         {:parameters {:query {:vd-id   string?
                               :box-url string?}}
          :handler    #'aidbox/get-view-definition}

         :post
         {:parameters {:body {:box-url string? :vd string?}}
          :handler    #'aidbox/save-view-definition
          :middleware [(authentication-middleware true)]}

         :delete
         {:parameters {:body {:box-url string?
                              :vd      string?}}
          :handler    #'aidbox/delete-view-definition
          :middleware [(authentication-middleware true)]}}]
       ["/eval"
        {:post
         {:parameters {:body {:box-url string?
                              :vd      string?}}
          :handler    #'aidbox/eval-view-definition}}]]]

     ["/auth"
      ["/check"
       {:get
        {:summary    "Check if user is authenticated"
         :handler    #'auth/check
         :middleware [(authentication-middleware true)]}}]
      ["/sso"
       {:get
        {:summary "Redirect to SSO provider"
         :handler #'auth/sso-redirect}}]
      ["/sso-callback"
       {:get
        {:summary    "Callback for SSO auth"
         :parameters {:query {:code  string?
                              :state string?}}
         :handler    #'auth/sso-callback}}]]

     ["/health"
      {:get {:handler #'health/check
             :parameters {:query {:box-url string?}}
             }
       }]]]

   {:data {:muuntaja   m/instance
           :middleware [muuntaja/format-middleware
                        query-string-middleware
                        coercion/coerce-exceptions-middleware
                        coercion/coerce-request-middleware
                        coercion/coerce-response-middleware
                        (app-context-middleware ctx)
                        (observability-middleware)]}}))

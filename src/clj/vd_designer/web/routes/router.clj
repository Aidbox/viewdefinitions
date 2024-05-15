(ns vd-designer.web.routes.router
  (:require [reitit.ring :as ring]
            [reitit.ring.middleware.muuntaja :as muuntaja]
            [reitit.ring.coercion :as coercion]
            [muuntaja.core :as m]
            [reitit.ring.middleware.parameters :as parameters]
            [vd-designer.web.controllers.health :as health]))

(defn router []
  (ring/router
   ["/api"
    ["/health" {:get #'health/check}]]

   {:data {:muuntaja   m/instance
           :middleware [parameters/parameters-middleware
                        muuntaja/format-response-middleware
                        coercion/coerce-exceptions-middleware
                        coercion/coerce-request-middleware
                        coercion/coerce-response-middleware]}}))

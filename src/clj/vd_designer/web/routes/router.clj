(ns vd-designer.web.routes.router
  (:require
    [reitit.ring.middleware.parameters :as parameters]
    [reitit.ring :as ring]
    [ring.util.http-response :as http-response]
    [vd-designer.web.controllers.health :as health]))

(defn router []
  (ring/router
    ["/api"
     ["/health" {:get #'health/check}]
     ["/echo" {:get (fn [req]
                      (http-response/ok req))}]]

    #_{:data {:middleware [parameters/parameters-middleware]}}
    ))

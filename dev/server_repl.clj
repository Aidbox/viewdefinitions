;; TODO: learn and apply the best practices of REPL namespaces
(ns server-repl
  (:require [vd-designer.core :refer [app]]))

(comment
  (app {:request-method :get
        :uri            "/api/health"})

  (app {:request-method :get
        :uri            "/api/echo"
        :query-params   {:test 123}})

  (app {:request-method :get
        :uri            "/bad-route"})

  )

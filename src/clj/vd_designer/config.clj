(ns vd-designer.config)

;; TODO some of these should come from env
(def config
  {:base-path "/api"
   :sso-config {:client-id            "vd-designer"
                :client-secret        "changeme"
                :default-redirect-url "http://localhost:8280"}})

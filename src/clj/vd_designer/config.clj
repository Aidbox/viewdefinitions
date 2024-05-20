(ns vd-designer.config)

;; TODO some of these should come from env
(def config
  {:sso {:client-id            "vd-designer"
         :client-secret        "changeme"
         :default-redirect-url "http://localhost:8280"}

   :db  {:dbtype   "postgresql"
         :dbname   (System/getenv "POSTGRES_DB")
         :host     (System/getenv "POSTGRES_HOST")
         :port     (System/getenv "POSTGRES_PORT")
         :user     (System/getenv "POSTGRES_USER")
         :password (System/getenv "POSTGRES_PASSWORD")}})

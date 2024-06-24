(ns vd-designer.web.controllers.metrics
  (:require [iapetos.export :as export]
            [ring.util.http-response :as http-response]
            [vd-designer.monitoring :as monitoring]))

(defn expose [_]
  (-> monitoring/registry
      export/text-format
      http-response/ok))

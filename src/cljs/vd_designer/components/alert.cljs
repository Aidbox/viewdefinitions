(ns vd-designer.components.alert
  (:require [antd :refer [Alert]]
            [medley.core :as medley]))

(defn alert [& {:as opts}]
  [:> Alert (medley/deep-merge {} opts)])

(ns vd-designer.components.select
  (:require [medley.core :as medley]))

(defn options-from-vec [o]
  (map #(hash-map :value % :label %) o))

(defn with-default-props
  "For more details see: https://ant.design/components/select#api"
  [& {:as opts}]
  (medley/deep-merge
   {:showSearch       true
    :variant          :borderless
    :style            {:width "100%"}
    :allowClear       true
    :filterOption     true
    :optionFilterProp "label"}
   opts))

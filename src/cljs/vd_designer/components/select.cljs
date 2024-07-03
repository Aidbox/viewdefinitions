(ns vd-designer.components.select
  (:require [medley.core :as medley]))

(defn options-from-vec [o & [transform]]
  (let [transform (if (nil? transform) identity transform)]
    (map #(hash-map :label %
                    :value (transform %)) o)))

(defn with-default-props
  "For more details see: https://ant.design/components/select#api"
  [& {:as opts}]
  (medley/deep-merge
   {:showSearch       true
    :variant          :borderless
    :style            {:width "100%"}
    :filterOption     true
    :optionFilterProp "label"}
   opts))

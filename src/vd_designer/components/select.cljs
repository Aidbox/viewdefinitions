(ns vd-designer.components.select
  (:require [antd :refer [Select]]))

(defn options-from-vec [o]
  (map #(hash-map :value % :label %) o))

(defn select
  "Select with sealch
   For more details see: https://ant.design/components/select#api"
  [& {:as opts}]
  [:> Select (merge-with
              into
              {:showSearch       true
               :style            {:width "100%"}
               :allowClear       true
               :filterOption     true
               :optionFilterProp "label"}
              opts)])

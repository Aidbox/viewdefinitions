(ns vd-designer.components.select
  (:require [antd :refer [Select]]))

(defn options-from-vec [o]
  (map #(hash-map :value % :label %) o))

(defn select [props]
  (fn [props]
    [:> Select
     {:showSearch true
      :style {:width 200}
      :placeholder "Resource type"
      :allowClear true
      :filterOption true
      :optionFilterProp "label"
      :options (:options props)
      :onSelect (:on-select props)}]))

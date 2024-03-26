(ns vd-designer.components.table
  (:require [antd :refer [Table]]))

(defn derive-columns [data]
  (->> data
       first
       keys
       (map #(hash-map :title (subs (str %) 1) :dataIndex % :key %))
       vec))

(defn table
  "Table with data.
     Example of props:
       { :loading ..,
         :columns ..,
         :dataSource .. }
     For more details see: https://ant.design/components/table#api
     "
  [props]
  [:> Table props])

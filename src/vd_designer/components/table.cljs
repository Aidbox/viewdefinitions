(ns vd-designer.components.table
  (:require [antd :refer [Table]]))

(defn derive-columns [data]
  (->> data
       first
       keys
       (mapv #(hash-map :title (subs (str %) 1) :dataIndex % :key %))))

(defn table
  "Table with data.
  For more details see: https://ant.design/components/table#api"
  [data & {:as opts}]
  (let [columns (derive-columns data)]
    [:> Table (merge-with
               into
               {:columns    columns
                :dataSource data
                :rowKey     "id"}
               opts)]))

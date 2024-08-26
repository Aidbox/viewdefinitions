(ns vd-designer.components.table
  (:require [antd :refer [ConfigProvider Table]]
            [medley.core :as medley]))

(defn derive-columns [data]
  (->> data
       first
       (into (array-map))
       (mapv (comp name first))))

(defn one-row-data->ant-row-data [row-data index]
  (let [column-named-key? (:key row-data)]
    (cond-> row-data
      column-named-key?
      (assoc :key1 (:key row-data))
      :always
      (assoc :key index))))

(defn table
  "Table with data.
  For more details see: https://ant.design/components/table#api"
  [data & {:as opts}]
  (let [data-with-keys (map-indexed (fn [idx data]
                                      (one-row-data->ant-row-data data idx))
                                    data)
        columns (derive-columns data)]
    ;; 13px - to fit the height of ViewDefinition form:
    ;; it's height in pixels is 46
    ;; 16 (padding) * 2 + 13 + 1 (border) = 46

    [:> ConfigProvider {:theme {:token {:Table {:lineHeight         "13px"
                                                :headerBorderRadius 0}}}}
     [:> Table
      (update (medley/deep-merge
                {:columns    columns
                 :sticky     true
                 :dataSource data-with-keys}
                opts)
              :columns
              (fn [columns-vec]
                (mapv (fn [column] (hash-map :title (str column) :dataIndex column :key column)) columns-vec)))]]))

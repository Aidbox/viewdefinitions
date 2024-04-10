(ns vd-designer.components.table
  (:require [antd :refer [ConfigProvider Table]]
            [medley.core :as medley]))

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
    ;; 13px - to fit the height of ViewDefinition form:
    ;; it's height in pixels is 46
    ;; 16 (padding) * 2 + 13 + 1 (border) = 46
    [:> ConfigProvider {:theme {:token {:lineHeight "13px"}}}
     [:> Table (medley/deep-merge
               {:columns    columns
                :dataSource data
                :rowKey     "id"}
               opts)]]))

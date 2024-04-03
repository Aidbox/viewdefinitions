(ns vd-designer.components.tabs
  (:require [antd :refer [Tabs]]
            [medley.core :as medley]
            [reagent.core :as r]))

(defn tab-item
  "Item should be a map with keys :key, :children, (:label or/and :icon)"
  [item]
  (update item :children r/as-element))

(defn tabs
  "Tabs with icons
   For more details see: https://ant.design/components/tabs#tabs"
  [& {:as opts}]
  [:> Tabs (medley/deep-merge {:defaultActiveKey 1} opts)])


    ;; items={[AppleOutlined, AndroidOutlined].map((Icon, i) => {
    ;;   const id = String(i + 1);
    ;;   return {
    ;;     key: id,
    ;;     label: `Tab ${id}`,
    ;;     children: `Tab ${id}`,
    ;;     icon: <Icon />,
    ;;   };
    ;; })}

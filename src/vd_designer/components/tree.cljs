(ns vd-designer.components.tree
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [ConfigProvider Tree]]
            [reagent.core :as r]))

(defn tree-node [key title children]
  {:title      (r/as-element title)
   :key        (str key)
   :selectable false
   :children   children})

(defn tree-leaf [key title]
  {:title      (r/as-element title)
   :key        (str key)
   :selectable false
   :isLeaf     true})

(defn tree
  "Tree like structure
   For more details see: https://ant.design/components/tree#api"
  [& {:as opts}]
  [:> ConfigProvider {:theme {:components {:Tree {:titleHeight 32
                                                  :nodeHoverBf "#FAFAFA"}}}}
   [:> Tree (merge-with into
                        {:showIcon     true
                         :showLine     true
                         :blockNode    true
                         :class        "vd-tree"
                         :switcherIcon (r/create-element icons/DownOutlined)}
                        opts)]])

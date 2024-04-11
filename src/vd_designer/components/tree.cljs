(ns vd-designer.components.tree
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [ConfigProvider Tree]]
            [clojure.string :as str]
            [reagent.core :as r]))

(defn calc-key [k]
  (str/join " " k))

(defn tree-node [key title children]
  {:title      (r/as-element title)
   :key        (calc-key key)
   :selectable false
   :children   children})

(defn tree-leaf [key title]
  {:title      (r/as-element title)
   :key        (calc-key key)
   :selectable false
   :isLeaf     true})

(defn tree
  "Tree like structure
   For more details see: https://ant.design/components/tree#api"
  [& {:as opts}]
  [:> ConfigProvider {:theme {:components {:Tree {:titleHeight 32
                                                  :nodeHoverBg "var(--hover-color)"}}}}
   [:> Tree (merge-with into
                        {:showIcon     true
                         :showLine     true
                         :blockNode    true
                         :class        "vd-tree"
                         :switcherIcon (r/create-element icons/DownOutlined)}
                        opts)]])

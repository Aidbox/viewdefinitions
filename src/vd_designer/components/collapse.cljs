(ns vd-designer.components.collapse
  (:require [antd :refer [Collapse]]
            [reagent.core :as r]))

(defn collapse-item [title children]
  {:label (r/as-element title) :children (r/as-element children)})

(defn collapse
  "Section with collapsable elements.
   For more details see: https://ant.design/components/collapse#api
   NOTE: each item should be created with collapse-item function"
  [& {:as opts}]
  [:> Collapse (merge-with
                into
                {:style    {:background-color "transparent"}
                 :bordered false}
                opts)])

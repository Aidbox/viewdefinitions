(ns vd-designer.components.collapse
  (:require [antd :refer [Collapse]]
            [reagent.core :as r]))

(defn create-collapse-item [title children]
  {:label (r/as-element title) :children (r/as-element children)})

(defn collapse
  "Section with collapsable elements.
   For more details see: https://ant.design/components/collapse#api"
  [items]
  [:> Collapse {:style {:background-color "transparent"}
                :bordered false
                :items items}])

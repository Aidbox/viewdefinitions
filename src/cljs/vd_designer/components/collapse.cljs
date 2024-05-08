(ns vd-designer.components.collapse
  (:require [antd :refer [Collapse ConfigProvider]]
            [medley.core :as medley]
            [reagent.core :as r]))

(defn collapse-item [title children]
  {:label (r/as-element title) :children (r/as-element children)})

(defn collapse
  "Section with collapsable elements.
   For more details see: https://ant.design/components/collapse#api
   NOTE: each item should be created with collapse-item function"
  [& {:as opts}]
  [:> ConfigProvider {:theme {:components {:Collapse {:contentPadding 0
                                                      :headerPadding  "4px 0"}}}}
   [:> Collapse (medley/deep-merge
                 {:style {:background-color "transparent"
                          :border-bottom    "1px solid #F2F4F7"
                          :border-radius    0}
                  :ghost true}
                 opts)]])

(println "12345")

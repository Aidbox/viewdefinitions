(ns vd-designer.components.input
  (:require [antd :refer [ConfigProvider Input]]
            [medley.core :as medley]))

(defn search [& {:as opts}]
  [:> Input.Search (merge-with into
                               {}
                               opts)])

(defn input
  "Input
   For more details see: https://ant.design/components/input#api"
  [& {:as opts}]
  [:> ConfigProvider {:theme {:components {:Input {:activeBorderColor "#7972D3"
                                                   :hoverBorderColor  "#7972D3"
                                                   :paddingInline 0}}}}
   [:> Input (medley/deep-merge
               {:classNames {:input "default-input"}
                :style      {:font-style       "italic"
                             :border           "none"
                             :border-bottom    "1px solid transparent"
                             :border-radius    0
                             :background-color "transparent"}}
               opts)]])

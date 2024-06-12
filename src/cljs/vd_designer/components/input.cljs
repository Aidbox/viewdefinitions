(ns vd-designer.components.input
  (:require
   [antd :refer [ConfigProvider Input InputNumber]]
   [medley.core :as medley]))

(defn search [& {:as opts}]
  [:> Input.Search (medley/deep-merge {} opts)])

(defn input
  "Input
   For more details see: https://ant.design/components/input#api"
  [& {:as opts}]
  [:> ConfigProvider {:theme {:components {:Input {:paddingInline 0}}}}
   [:> Input (medley/deep-merge
              {:classNames {:input "default-input"}
               :style
               {:font-style       "italic"
                :border           "none"
                :border-bottom    "1px solid transparent"
                :border-radius    0
                :background-color "transparent"}}
              opts)]])

(defn input-number
  [& {:as opts}]
  [:> ConfigProvider {:theme {:components {:InputNumber {:paddingInline 0}}}}
   [:> InputNumber
    (medley/deep-merge
     {:class "default-input"
      :style      {:font-style       "italic"
                   :border           "none"
                   :width "100%"
                   :border-bottom    "1px solid transparent"
                   :border-radius    0
                   :background-color "transparent"}}
     opts)]])

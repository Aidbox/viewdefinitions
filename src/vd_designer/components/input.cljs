(ns vd-designer.components.input
  (:require
   [antd :refer [ConfigProvider Input InputNumber]]
   [medley.core :as medley]
   [re-frame.core :refer [dispatch subscribe]]
   [vd-designer.pages.vd-form.controller :as form-controller]
   [reagent.core :as r]))

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
                                                   :paddingInline     0}}}}
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
  [:> ConfigProvider {:theme {:components {:InputNumber {:activeBorderColor "#7972D3"
                                                         :hoverBorderColor  "#7972D3"
                                                         :paddingInline     0}}}}
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

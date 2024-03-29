(ns vd-designer.components.input
  (:require
   [antd :refer [Button ConfigProvider Input Space]]
   [vd-designer.utils.react :refer [create-react-image]]))

(defn search [& {:as opts}]
  [:> Input.Search (merge-with into
                               {}
                               opts)])

(defn input
  "Input
   For more details see: https://ant.design/components/input#api"
  [& {:as opts}]
  [:> ConfigProvider {:theme {:components {:Input {:activeBorderColor "#7972D3"
                                                   :hoverBorderColor  "#7972D3"}}}}
   [:> Input (merge-with into
                         {:classNames {:input "default-input"}
                          :style      {:font-style       "italic"
                                       :border           "none"
                                       :border-bottom    "1px solid #fff"
                                       :border-radius    0
                                       :background-color "transparent"}}
                         opts)]])

(defn fhir-path [input-overrides button-overrides]
  [:> Space {:direction :horizontal}
   [input (merge-with into
                      {}
                      input-overrides)]
   [:> Button (merge-with into
                          {:style {:border           :none
                                   :background-color "transparent"}}
                          button-overrides)
    (create-react-image "/img/input/expand.svg")]])

(defn col-name [& {:as opts}]
  [input (merge-with into
                     {:style {:font-style "normal"}}
                     opts)])

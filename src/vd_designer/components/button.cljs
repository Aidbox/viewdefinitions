(ns vd-designer.components.button
  (:require [antd :refer [Button ConfigProvider]]
            [reagent.core :as r]))

(defn button
  "Button wrapper.
   For more details see: https://ant.design/components/button#api"
  [text & {:as opts}]
  [:> Button opts text])

(defn ghost [text icon & {:as opts}]
  [:> ConfigProvider {:theme {:components {:Button {:paddingInlineSM          8
                                                    :defaultGhostColor        "#B5B5BC"
                                                    :defaultGhostBorderColor  "#B5B5BC"

                                                    :defaultActiveColor       "#7972D399"
                                                    :defaultActiveBorderColor "#7972D3"

                                                    :defaultHoverBorderColor  "#B5B5BC"
                                                    :defaultHoverColor        "#B5B5BC"
                                                    :textHoverBg              "none"}}}}
   [button text (merge-with
                 into
                 {:type  :default
                  :size  :small
                  :ghost true
                  :icon  (r/create-element icon)
                  :style {:border        :none
                          :border-radius "5px"}}
                 opts)]])

(defn invisible-icon [icon & {:as opts}]
  [ghost "" icon (merge-with
                  into
                  {:class "invisible-button"}
                  opts)])

(defn add-view-definition [content & {:as opts}]
  [:button (merge-with into
                       {:style {:height           "32px"
                                :padding          "4px 15px"
                                :background-color "#1890FF"
                                :color            "white"
                                :border           :none
                                :border-radius    "2px"}}
                       opts)
   content])

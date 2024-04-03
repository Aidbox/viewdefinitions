(ns vd-designer.components.button
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Button ConfigProvider]]
            [medley.core :as medley]
            [reagent.core :as r]))

(defn button
  "Button wrapper.
   For more details see: https://ant.design/components/button#api"
  [text & {:as opts}]
  [:> Button opts text])

(defn delete [& {:as opts}]
  [:> ConfigProvider {:theme {:components {:Button {:colorText "#BFBFBF"}}}}
   [button "" (medley/deep-merge
                {:type  "text"
                 :class "delete-button"
                 :icon  (r/create-element icons/CloseOutlined)}
                opts)]])


(defn add [text & {:as opts}]
  [:> ConfigProvider {:theme {:components {:Button {:paddingInlineSM 8
                                                    :colorText       "#B5B5BC"

                                                    :textHoverBg     "#FAFAFA"
                                                    :defaultHoverBg  "#FAFAFA"}}}}
   [button text (medley/deep-merge
                  {:type  "text"
                   :size  "small"
                   :ghost true
                   :icon  (r/create-element icons/PlusOutlined)}
                  opts)]])

(defn add-view-definition [content & {:as opts}]
  [:button (medley/deep-merge
                       {:style {:height           "32px"
                                :padding          "4px 15px"
                                :background-color "#1890FF"
                                :color            "white"
                                :border           :none
                                :border-radius    "2px"}}
                       opts)
   content])

(ns vd-designer.components.button
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Button ConfigProvider]]
            [reagent.core :as r]))

(defn button
  "Button wrapper.
   For more details see: https://ant.design/components/button#api"
  [text & {:as opts}]
  [:> Button opts text])

(defn delete [& {:as opts}]
  [:> ConfigProvider {:theme {:components {:Button {:colorText "#BFBFBF"}}}}
   [button "" (merge-with
               into
               {:type  "text"
                :class "delete-button"
                :icon  (r/create-element icons/CloseOutlined)}
               opts)]])

(defn add [text & {:as opts}]
  [:> ConfigProvider {:theme {:components {:Button {:paddingInlineSM 8
                                                    :colorText       "#B5B5BC"

                                                    :textHoverBg     "#FAFAFA"
                                                    :defaultHoverBg  "#FAFAFA"}}}}
   [button text (merge-with
                 into
                 {:type  "text"
                  :size  "small"
                  :ghost true
                  :icon  (r/create-element icons/PlusOutlined)}
                 opts)]])

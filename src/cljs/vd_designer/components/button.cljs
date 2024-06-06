(ns vd-designer.components.button
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Button ConfigProvider Space Tooltip]]
            [medley.core :as medley]
            [reagent.core :as r]
            [vd-designer.utils.browser :as utils.browser]))

(defn button
  "Button wrapper.
   For more details see: https://ant.design/components/button#api"
  [text & {:as opts}]
  [:> Button opts text])

(defn add [text & {:as opts}]
  [:> Button (medley/deep-merge {} opts)
   [:> Space (r/create-element icons/PlusOutlined) text]])

(defn ghost [text icon & {:as opts}]
  [:> ConfigProvider {:theme {:components {:Button {:paddingInlineSM         8
                                                    :defaultGhostColor       "#B5B5BC"
                                                    :defaultGhostBorderColor "#B5B5BC"}}}}
   [button text (medley/deep-merge
                 {:type  :default
                  :size  :small
                  :ghost true
                  :icon  (r/create-element icon)
                  :style {:border        :none
                          :border-radius "5px"}}
                 opts)]])

(defn invisible-icon [icon & {:as opts}]
  [:> ConfigProvider {:theme {:components {:Button {:defaultGhostColor       "#B5B5BC"
                                                    :defaultGhostBorderColor "#B5B5BC"
                                                    :paddingBlock            0
                                                    :paddingInline           0}}}}
   [button "" (medley/deep-merge
               {:type  :default
                :ghost true
                :class "invisible-button"
                :icon  (r/create-element icon)
                :style {:border        :none
                        :height        "30px"
                        :border-radius "5px"}}
               opts)]])

(defn icon [text icon & {:as opts}]
  [button text (medley/deep-merge
                {:icon  (r/create-element icon)}
                opts)])

(defn download-text-file [{:keys [filename text]}]
  (let [file (js/Blob. [text] {:type "text/plain"})]
    [:a {:download filename
         ;; URL.createObjectURL is called w/o subsequent revocation
         ;; Theoretically, this may lead to memory leaks
         :href     (js/URL.createObjectURL file)}
     [button nil {:icon (r/create-element icons/DownloadOutlined)}]]))

(defn label-copied []
  (r/as-element
   [:div {:style {:text-align "center"}}
    "copied!"]))

(defn copy [text-to-copy]
  [:> Tooltip
   {:title           (label-copied)
    :mouseLeaveDelay 2
    :placement       :top
    :content         nil
    :trigger         :click}
   (button nil
           {:icon     (r/create-element icons/CopyOutlined)
            :on-click #(utils.browser/copy-text-to-clipboard text-to-copy)})])

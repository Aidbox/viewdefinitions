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

(defn add-button-config [& {:as opts}]
  (medley/deep-merge
   {:colorText               "#7972D3"
    :defaultBorderColor      "#7972D399"

    :defaultHoverColor       "#7972D3"
    :defaultHoverBorderColor "#7972D399"
    :defaultHoverBg          "var(--hover-color)"}
   opts))


(defn add [text & {:as opts}]
  [:> ConfigProvider {:theme {:components {:Button (add-button-config)}}}
   [:> Button (medley/deep-merge {} opts)
    [:> Space (r/create-element icons/PlusOutlined) text]]])

(defn ghost [text icon & {:as opts}]
  [:> ConfigProvider {:theme {:components {:Button {:paddingInlineSM          8
                                                    :defaultGhostColor        "#B5B5BC"
                                                    :defaultGhostBorderColor  "#B5B5BC"

                                                    :defaultActiveColor       "#7972D399"
                                                    :defaultActiveBorderColor "#7972D3"

                                                    :defaultHoverBorderColor  "#B5B5BC"
                                                    :defaultHoverColor        "#B5B5BC"
                                                    :textHoverBg              "none"}}}}
   [button text (medley/deep-merge
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

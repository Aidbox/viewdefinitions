(ns vd-designer.components.switch
  (:require [antd :refer [Switch]]
            [medley.core :as medley]))

(defn code-label [text]
  [:label {:style {:font-family "JetBrains Mono"}}
   text])

(defn json<->yaml [& {:as opts}]
  [:div {:style {:display     :flex
                 :align-items :center
                 :gap         "4px"}}
   [code-label "YAML"]
   [:> Switch (-> {:size :small
                   :style {:background "var(--ant-color-primary)"}}
                  (medley/deep-merge opts))]
   [code-label "JSON"]])

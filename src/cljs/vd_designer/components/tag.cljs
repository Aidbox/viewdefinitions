(ns vd-designer.components.tag
  (:require [medley.core :as medley]))

(defn tag [text & {:as opts}]
  [:label
   (medley/deep-merge
     {:style {:display        "inline-flex"
              :padding        "3px 7px"
              :text-transform "uppercase"
              :height         "20px"
              :border-radius  "4px"
              :align-items    "center"
              :font-size      "12px"
              :font-family    "var(--ant-font-family)"
              :font-weight    400}}
     opts)
   text])

(defn default [text]
  (tag text
       :style {:color      "#7972D3"
               :background "#7972D31A"}))

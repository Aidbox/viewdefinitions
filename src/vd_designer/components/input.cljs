(ns vd-designer.components.input
  (:require
    [antd :refer [Input]]))

(def width "170px")

(defn search [& {:keys [placeholder loading]}]
  [:> Input.Search {:placeholder placeholder
                    :loading     loading
                    :style       {:width width}}])

(defn fhir-path [& {:keys [placeholder]}]
  [:> Input {:placeholder placeholder
             :addon-after "expand"
             :style       {:width      "170px"
                           :font-style "italic"}}])

(defn col-name []
  [:> Input {:addon-before "||"
             :style        {:width width}}])

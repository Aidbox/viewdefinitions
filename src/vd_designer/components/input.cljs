(ns vd-designer.components.input
  (:require
    [antd :refer [Button Input Space]]
    [vd-designer.utils.react :refer [create-react-image]]))

(defn search [& {:as opts}]
  [:> Input.Search (merge-with into
                               {:style {:width "170px"}}
                               opts)])

(defn fhir-path [input-overrides button-overrides]
  [:> Space {:direction :horizontal}
   [:> Input (merge-with into
                         {:classNames {:input "default-input fhir-path-input"}
                          :style      {:width "170px"}}
                         input-overrides)]
   [:> Button (merge-with into
                          {:style {:border :none}}
                          button-overrides)
    (create-react-image "/img/expand.svg")]])

(defn col-name [& {:as opts}]
  [:> Input (merge-with into
                        {:classNames {:input "default-input"}
                         :style      {:width "170px"}}
                        opts)])

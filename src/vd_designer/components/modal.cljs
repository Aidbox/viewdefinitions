(ns vd-designer.components.modal
  (:require
   ["@ant-design/icons" :as icons]
   [antd :refer [Modal]]
   [medley.core :as medley]
   [reagent.core :as r]))

(defn modal-confirm [opts]
  (Modal.confirm
    (clj->js opts)))

(defn modal [opts content]
  [:> Modal opts content])

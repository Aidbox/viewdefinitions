(ns vd-designer.components.alert
  (:require [antd :refer [Alert]]))

(defn alert [& {:as opts}]
  [:> Alert (merge-with
             into
             {}
             opts)])

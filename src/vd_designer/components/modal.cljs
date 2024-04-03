(ns vd-designer.components.modal
  (:require
    [antd :refer [Button ConfigProvider Modal]]))

(defn modal [opts content]
  [:> Modal opts content])

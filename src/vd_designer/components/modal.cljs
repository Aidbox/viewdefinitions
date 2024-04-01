(ns vd-designer.components.modal
  (:require
    [antd :refer [Button ConfigProvider Modal]]))

(defn modal [opts content]
  [:> Modal {:title
             (or (:title opts) "")
             :open (:open opts)
             :onOk (:onOk opts)
             :onCancel (:onCancel opts)}
   content])

(ns vd-designer.components.pop-confirm
  (:require
   [antd :refer [Popconfirm]]))

(defn pop-confirm [trigger-element & {:as opts}]
  [:> Popconfirm opts
   [:<> trigger-element]])

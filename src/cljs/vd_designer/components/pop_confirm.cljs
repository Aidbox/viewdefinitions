(ns vd-designer.components.pop-confirm
  (:require
   [antd :refer [Popconfirm]]))

(defn pop-confirm [trigger-element & {:as opts}]
  [:> Popconfirm opts
   [:<> trigger-element]])

(defn auth-required [trigger-element on-confirm]
  [pop-confirm trigger-element
   {:title       "Not authorized"
    :description "To perfrom this action you need to Sign In."
    :ok-text     "Sign In"
    :cancel-text "Cancel"
    :on-confirm  on-confirm}])

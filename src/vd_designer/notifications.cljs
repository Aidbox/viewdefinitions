(ns vd-designer.notifications
  (:require [antd :refer [notification]]
            [re-frame.core :refer [reg-fx]]))

(reg-fx 
 :notification-info
 (fn [message & {placement :placement :or {placement "bottomRight"}}]
   (. notification info
      (clj->js
       {:message message
        :placement placement}))))

(reg-fx 
 :notification-error
 (fn [message & {placement :placement :or {placement "bottomRight"}}]
   (. notification error
      (clj->js
       {:message message
        :placement placement}))))

(ns vd-designer.notifications
  (:require [antd :refer [notification message]]
            [re-frame.core :refer [reg-fx]]))

(reg-fx
 :notification-error
 (fn [message & {placement :placement :or {placement "bottomRight"}}]
   (. notification error
      (clj->js
       {:message message
        :placement placement}))))

(reg-fx
 :message-success
 (fn [m]
   (. message open
      (clj->js
       {:content m
        :type "success"}))))

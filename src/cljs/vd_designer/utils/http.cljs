(ns vd-designer.utils.http
  (:require [re-frame.core :refer [reg-event-fx]]))

(reg-event-fx
  ::request
  (fn [_ [_ http-xhrio-opts]]
    {:http-xhrio http-xhrio-opts}))

(ns client.events
  (:require
   [re-frame.core :as re-frame :refer [reg-event-db reg-event-fx]]
   [client.debounce]
   [client.db :as db]))

(reg-event-fx
 ::initialize-db
 (fn [_ _]
   {:db db/default-db
    #_#_:fx [[:dispatch  [::some-event]]]}))

(reg-event-fx
 ::set-active-panel
 (fn [{:keys [db]} [_ active-panel]]
   {:db (assoc db :active-panel active-panel)}))

(reg-event-fx
 ::add-value
 (fn [{:keys [db]} [_]]
   {:db (update db :value (fn [vv]
                           (if vv
                            (not vv)
                            true)))}))

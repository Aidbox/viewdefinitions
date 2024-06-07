(ns vd-designer.polling
  (:require [re-frame.core :as rf]))

(def polling-timer (atom {}))

(rf/reg-fx
  ::set-polling-timer
  (fn [{:keys [event-vec interval]}]
    (if (and (vector? event-vec)
             (keyword? (first event-vec)))
      (swap! polling-timer assoc (first event-vec)
             (js/setInterval #(rf/dispatch event-vec) (or interval 10000)))
      (throw (js/Error. (str "invalid params: got `event-vec` - " (prn-str event-vec)))))))

(rf/reg-fx
  ::clear-polling-timer
  (fn [event-key]
    (js/clearInterval (event-key @polling-timer))
    (swap! polling-timer dissoc event-key)))

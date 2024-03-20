(ns viewdef-designer.utils.debounce
  (:require [re-frame.core  :refer [reg-fx dispatch] :as rf]))

(defn now [] (.getTime (js/Date.)))

(def registered-keys (atom nil))

(defn dispatch-if-not-superceded [{:keys [key _delay event time-received]}]
  (when (= time-received (get @registered-keys key))
    (dispatch event)))

(defn dispatch-later [{:keys [delay] :as debounce}]
  (js/setTimeout
   (fn [] (dispatch-if-not-superceded debounce))
   (or delay 300)))

(defn dispatch-debounce [debounce]
  (let [ts (now)]
    (swap! registered-keys assoc (:key debounce) ts)
    (dispatch-later (assoc debounce :time-received ts))))

(reg-fx :dispatch-debounce dispatch-debounce)

(rf/reg-event-fx
 :dispatch-debounce
 (fn [_fx [_ deb]]
   {:dispatch-debounce deb}))

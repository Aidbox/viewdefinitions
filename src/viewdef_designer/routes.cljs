(ns viewdef-designer.routes
  (:require [bidi.bidi :as bidi]
            [pushy.core :as pushy]
            [re-frame.core :as re-frame :refer [reg-event-fx reg-sub]]))

(defmulti pages identity)
(defmethod pages :default [] [:div "No page found for this route."])

(def routes
  (atom
   ["/" {""   :main
         "vd" :vd}]))

(reg-sub
 ::active-page
 (fn [db _]
   (:active-page db)))

(reg-event-fx
 ::set-active-page
 (fn [{:keys [db]} [_ active-page]]
   {:db (assoc db :active-page active-page)}))

(defn parse
  [url]
  (bidi/match-route @routes url))

(defn url-for
  [& args]
  (apply bidi/path-for (into [@routes] args)))

(defn dispatch
  [route]
  (let [page (keyword (str (name (:handler route)) "-page"))]
    (re-frame/dispatch [::set-active-page page])))

(defonce history
  (pushy/pushy dispatch parse))

(defn navigate!
  [handler]
  (pushy/set-token! history (url-for handler)))

(defn start!
  []
  (pushy/start! history))

(re-frame/reg-fx
 ::navigate
 (fn [handler]
   (navigate! handler)))

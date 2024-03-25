(ns viewdef-designer.routes
  (:require [bidi.bidi :as bidi]
            [pushy.core :as pushy]
            [re-frame.core :as re-frame :refer [reg-event-fx reg-fx reg-sub]]))

(defmulti pages identity)
(defmethod pages :default [] [:div "No page found for this route."])

(def routes
  (atom
   ["/" {"vd" :viewdef-designer.pages.view-definition.controller/main
         "" :viewdef-designer.pages.view-definitions.controller/main}]))

(reg-sub
 ::active-page
 (fn [db _]
   (:active-page db)))

(reg-event-fx
 ::set-active-page
 (fn [{:keys [db]} [_ active-page]]
   {:db (assoc db :active-page active-page)
    :fx [[:dispatch [(:active-page db) :deinit]]
         [:dispatch [active-page :init]]]}))

(defn parse
  [url]
  (bidi/match-route @routes url))

(defn url-for
  [& args]
  (apply bidi/path-for (into [@routes] args)))

(defn dispatch
  [route]
  (re-frame/dispatch [::set-active-page (:handler route)]))

(defonce history
  (pushy/pushy dispatch parse))

(defn navigate!
  [handler]
  (pushy/set-token! history (url-for handler)))

(defn start!
  []
  (pushy/start! history))

(reg-fx
 ::navigate
 (fn [handler]
   (navigate! handler)))

(reg-event-fx
 ::navigate
 (fn [_ [_ handler]]
   {::navigate handler}))

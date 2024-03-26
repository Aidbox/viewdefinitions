(ns vd-designer.routes
  (:require [bidi.bidi :as bidi]
            [pushy.core :as pushy]
            [re-frame.core :as re-frame :refer [reg-event-fx reg-fx reg-sub]]))

(defmulti pages identity)
(defmethod pages :default [] [:div "No page found for this route."])

(def routes
  (atom
    ["/" {"vd/" :vd-designer.pages.vd-form.controller/main
          ["vd/" :id] :vd-designer.pages.vd-form.controller/main
          "" :vd-designer.pages.vd-list.controller/main
          "settings" :vd-designer.pages.fhir-server-config.controller/main}]))

(reg-sub
 ::active-page
 (fn [db _]
   (:active-page db)))

(reg-event-fx
 ::set-active-page
 (fn [{:keys [db]} [_ {active-page :handler route-params :route-params}]]
   {:db (assoc db
               :active-page active-page
               :route-params route-params)
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
  (re-frame/dispatch [::set-active-page route]))

(defonce history
  (pushy/pushy dispatch parse))

(defn navigate!
  [handler]
  (pushy/set-token! history (apply url-for handler)))

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

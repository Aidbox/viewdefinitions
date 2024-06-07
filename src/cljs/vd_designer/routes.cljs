(ns vd-designer.routes
  (:require [reagent.core :as reagent]
            [vd-designer.pages.home.view :as vd-home]
            [vd-designer.pages.settings.view :as settings]
            [vd-designer.pages.settings.controller :as settings-controller]
            [vd-designer.pages.vd-form.view :as vd-form]
            [vd-designer.pages.vd-form.controller :as vd-form-controller]
            [vd-designer.pages.vd-list.view :as vd-list]
            [vd-designer.pages.vd-list.controller :as vd-list-controller]
            [reitit.frontend :as rf]
            [reitit.frontend.easy :as rfe]
            [reitit.frontend.controllers :as rfc]
            [re-frame.core :as re-frame :refer [reg-event-fx reg-fx dispatch]]))

(def reitit-routes
  (rf/router
   [["/" {:name :home
          :view vd-home/home-view}]

    ["/vds" {:name        :vd-list
             :view        vd-list/viewdefinition-list-view
             :controllers [{:start #(dispatch [::vd-list-controller/start])}]}]

    ["/vd"
     ["" {:name        :form-create
          :view        vd-form/viewdefinition-view
          :parameters  {:query {:imported boolean?}}
          :controllers [{:parameters {:query [:imported]}
                         :start      #(dispatch [::vd-form-controller/start %])
                         :stop       #(dispatch [::vd-form-controller/stop  %])}]}]
     ["/:id" {:name        :form-edit
              :view        vd-form/viewdefinition-view
              :parameters  {:path  {:id string?}}
              :controllers [{:parameters {:path [:id]}
                             :start      #(dispatch [::vd-form-controller/start %])
                             :stop       #(dispatch [::vd-form-controller/stop  %])}]}]]
    ["/settings" {:name        :settings
                  :view        settings/server-list
                  :controllers [{:start #(dispatch [::settings-controller/start])}]}]]))

(defonce match (reagent/atom nil))

(defn start-reitit []
  (rfe/start!
   reitit-routes
   (fn [new-match]
     (swap!
      match
      (fn [old-match]
        (when new-match
          (assoc new-match :controllers
                 (rfc/apply-controllers (:controllers old-match) new-match))))))
   {:use-fragment false}))


(reg-fx
 :navigate
 (fn [[route-name params]]
   (rfe/navigate route-name params)))

(reg-event-fx
 :navigate
 (fn [_ [_ handler]]
   {:navigate handler}))

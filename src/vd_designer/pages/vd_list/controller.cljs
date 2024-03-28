(ns vd-designer.pages.vd-list.controller
  (:require
    #_[vd-designer.pages.vd-list.model :as m]
    [re-frame.core :refer [reg-event-db reg-event-fx]]
    [vd-designer.http.fhir-server :as http.fhir-server]
    [vd-designer.routes :as routes]))

(def identifier ::main)

(reg-event-fx
  identifier
  (fn [{db :db} [_ phase]]
    {:fx (cond-> []
                 (= :init phase)
                 (conj [:dispatch [::get-view-definitions]])
                 #_#_(= :deinit phase)
                         (conj [:dispatch [::deinit]]))}))

(reg-event-fx
  ::get-view-definitions
  (fn [{:keys [db]} [_]]
    {:db         (assoc db :loading true)
     :http-xhrio (-> (http.fhir-server/request:get-view-definitions db)
                     (assoc :on-success [::got-view-definitions]))}))

(reg-event-fx
  ::got-view-definitions
  (fn [{:keys [db]} [_ result]]
    {:db (assoc db
           :view-definitions (:entry result)
           :loading false)}))

(reg-event-fx
  ::add-view-definition
  (fn [{:keys [_db]} _]
    {:dispatch [::routes/navigate [:vd-designer.pages.vd-form.controller/main :id ""]]}))

;; TODO: Add backend call
(reg-event-db
  ::delete-view-definition
  (fn [db [_ id]]
    (update db :view-definitions #(remove (fn [entry] (= id (-> entry :resource :id))) %))))

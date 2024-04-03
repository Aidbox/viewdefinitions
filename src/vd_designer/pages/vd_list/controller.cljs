(ns vd-designer.pages.vd-list.controller
  (:require
    [clojure.string :as str]
    [re-frame.core :refer [reg-event-db reg-event-fx]]
    [vd-designer.pages.vd-list.model :as m]
    [vd-designer.http.fhir-server :as http.fhir-server]
    [vd-designer.pages.settings.controller :as settings-controller]
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
    {:db         (assoc db ::m/view-definitions-loading true)
     :http-xhrio (-> (http.fhir-server/get-view-definitions db)
                     (assoc :on-success [::got-view-definitions-success]
                            :on-failure [::get-view-definitions-fail]))}))

(reg-event-fx
  ::got-view-definitions-success
  (fn [{:keys [db]} [_ result]]
    {:db
     (assoc db
            :view-definitions (:entry result)
            ::m/view-definitions-loading false)}))

(reg-event-fx
  ::get-view-definitions-fail
  (fn [{:keys [db]} [_]]
    {:db (-> (assoc db
                :view-definitions []
                ::m/view-definitions-loading false))}))

(reg-event-fx
  ::add-view-definition
  (fn [{:keys [_db]} _]
    {:dispatch [::routes/navigate [:vd-designer.pages.vd-form.controller/main :id ""]]}))

(reg-event-fx
  ::delete-view-definition
  (fn [{:keys [db]} [_ id]]
    {:http-xhrio (-> (http.fhir-server/delete-view-definition db id)
                     (assoc :on-success [::delete-view-definition-success id]
                            :on-failure [::delete-view-definition-failure]))}))

(reg-event-db
  ::delete-view-definition-success
  (fn [db [_ id _result]]
    (update db :view-definitions
            #(remove (fn [entry] (= id (-> entry :resource :id))) %))))

(reg-event-db
  ::delete-view-definition-failure
  (fn [db [_ result]]
    (assoc db ::m/delete-fail result)))

(reg-event-db
  ::filter-updated
  (fn [db [_ filter-phrase]]
    (if (str/blank? filter-phrase)
      (dissoc db ::filter-phrase)
      (assoc db ::filter-phrase filter-phrase))))

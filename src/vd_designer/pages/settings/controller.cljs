(ns vd-designer.pages.settings.controller
  (:require
    [lambdaisland.uri :as uri]
    [re-frame.core :refer [inject-cofx reg-event-db reg-event-fx]]
    [vd-designer.http.fhir-server :as http.fhir-server]))

(def identifier ::main)

(reg-event-fx
  identifier
  (fn [{db :db} [_ _phase]]
    {:db db}))

(reg-event-db
  ::update-fhir-server-input
  (fn [db [_ path new-val]]
    (assoc-in db [:fhir-server path] new-val)))


(reg-event-db
  ::new-server
  (fn [db [_]]
    (assoc db :original-server {})))

(reg-event-db
  ::start-edit
  (fn [db [_ server-cfg]]
    (assoc db
           :original-server server-cfg
           :fhir-server server-cfg)))

(defn add-new-server [db]
  (let [{:keys [server-name] :as new-server}
        (-> db :fhir-server (select-keys [:server-name :base-url :token]))]
    (if (some-> db :cfg/fhir-servers :servers not-empty)
      (update-in db [:cfg/fhir-servers :servers] merge {server-name new-server})
      (assoc db :cfg/fhir-servers {:servers          {server-name new-server}
                                   :used-server-name server-name}))))

(defn edit-server [db]
  (let [prev-server (:original-server db)
        {:keys [server-name] :as edited-server} (-> db :fhir-server)]
    (-> db
        (update-in [:cfg/fhir-servers :servers] dissoc (:server-name prev-server))
        (assoc-in [:cfg/fhir-servers :servers server-name] edited-server))))

(reg-event-fx
  ::add-server
  (fn [{db :db} [_]]
    (if (seq (:original-server db))
      {:db (-> (edit-server db)
               (dissoc :original-server :fhir-server))}
      {:db (-> db
               (add-new-server)
               (dissoc :original-server :fhir-server))})))

(reg-event-fx
  ::connect
  (fn [{db :db} [_ {:keys [base-url token] :as _fhir-server}]]
    {:db         (assoc db ::request-sent true)
     :http-xhrio
     (-> (http.fhir-server/get-view-definitions db)
         (assoc :uri (-> base-url uri/uri
                         (assoc :path "/ViewDefinition")
                         uri/uri-str)
                :headers {:Authorization token}
                :on-success [::connected]
                :on-failure [::not-connected]))}))

(reg-event-fx
  ::connected
  (fn [{:keys [db local-store]} [_ result]]
    {:db (dissoc db ::request-sent :edit-server :fhir-server)}))

(reg-event-fx
  ::not-connected
  (fn [{:keys [db]} [_ result]]
    {:db (assoc db :error "error!!!!!!")}))

(reg-event-db
  ::cancel-edit
  (fn [db [_]]
    (dissoc db :fhir-server :original-server)))

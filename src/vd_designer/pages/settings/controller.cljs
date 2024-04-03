(ns vd-designer.pages.settings.controller
  (:require
    [lambdaisland.uri :as uri]
    [re-frame.core :refer [inject-cofx reg-event-db reg-event-fx]]
    [vd-designer.http.fhir-server :as http]))

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
  (let [{:keys [server-name] :as new-server} (:fhir-server db)]
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
  (fn [{db :db} [_ {:keys [server-name base-url headers]}]]
    {:db (assoc db ::request-sent-by server-name)
     :http-xhrio
     [(http/get-metadata db {:uri (-> base-url uri/uri
                                      (assoc :path "/metadata")
                                      uri/uri-str)
                             :on-success [::connected server-name]
                             :on-failure [::not-connected server-name]})
      (http/get-view-definitions
        db
        {:uri (-> base-url uri/uri
                  (assoc :path "/ViewDefinition")
                  uri/uri-str)
         :headers headers
         :on-success [::connected server-name]
         :on-failure [::not-connected server-name]})]}))


(reg-event-fx
  ::connected
  (fn [{:keys [db local-store]} [_ server-name result]]
    {:db (-> db
             (assoc-in [:cfg/fhir-servers :used-server-name] server-name)
             (assoc-in [:cfg/fhir-servers :servers server-name :fhir-version] (:fhirVersion result))
             (dissoc ::request-sent-by :edit-server :fhir-server :cfg/connect-error))}))

(reg-event-fx
  ::not-connected
  (fn [{:keys [db]} [_ server-name result]]
    {:db (assoc db :cfg/connect-error {:result result
                                       :server-name server-name})}))

(reg-event-db
  ::cancel-edit
  (fn [db [_]]
    (dissoc db :fhir-server :original-server)))

(reg-event-db
  ::delete
  (fn [db [_ {:keys [server-name]}]]
    (-> db
        (update-in [:cfg/fhir-servers :servers] dissoc server-name)
        (cond-> (-> db :cfg/fhir-servers :used-server-name (= server-name))
                (update :cfg/fhir-servers dissoc :used-server-name)))))

(ns vd-designer.pages.settings.controller
  (:require
   [clojure.string :as str]
   [lambdaisland.uri :as uri]
   [re-frame.core :refer [reg-event-db reg-event-fx]]
   [vd-designer.http.fhir-server :as http]
   [vd-designer.notifications]
   [vd-designer.utils.event :as u]))

(reg-event-fx
  ::start
  (fn [{db :db} [_]]
    {:db db}))

(reg-event-db
  ::update-fhir-server-input
  (fn [db [_ path new-val]]
    (assoc-in db (into [:fhir-server] path) new-val)))

(reg-event-db
  ::add-fhir-server-header
  (fn [db [_]]
    (update-in db [:fhir-server :headers] (fnil conj []) {:name "", :value ""})))

(reg-event-db
  ::new-server
  (fn [db [_]]
    (assoc db :original-server {})))

(reg-event-db
  ::start-edit
  (fn [db [_ server-cfg]]
    (assoc db
      :original-server server-cfg
      :fhir-server (update server-cfg :headers
                           (fn [m]
                             (mapv (fn [[k v]]
                                     {:name  k
                                      :value v}) m))))))

(defn headers->map [headers]
  (reduce
    (fn [acc {:keys [name value]}]
      (assoc acc (keyword name) value))
    {} headers))

(defn add-new-server [db]
  (let [{:keys [server-name] :as new-server} (:fhir-server db)]

    (if (some-> db :cfg/fhir-servers :servers not-empty)
      (assoc-in db [:cfg/fhir-servers :servers server-name] new-server)
      (assoc db :cfg/fhir-servers {:servers          {server-name new-server}
                                   :used-server-name server-name}))))


(defn edit-server [db]
  (let [edited-server (:fhir-server db)
        server-name (:server-name edited-server)
        prev-server (:original-server db)
        used-server-name (-> db :cfg/fhir-servers :used-server-name)]
    (-> db
      (update-in [:cfg/fhir-servers :servers] dissoc (:server-name prev-server))
      (assoc-in [:cfg/fhir-servers :servers server-name] edited-server)
      (cond->
        (= (:server-name prev-server) used-server-name)
        (update :cfg/fhir-servers dissoc :used-server-name)))))

(defn remove-empty-headers [headers]
  (remove
    (fn [m]
      (and (str/blank? (:value m)) (str/blank? (:name m)))) headers))

(reg-event-fx
  ::add-server
  (fn [{db :db} [_]]
    (let [update-server-list (if (seq (:original-server db))
                               edit-server
                               add-new-server)]
      {:db (-> db
               (update-in [:fhir-server :headers]
                          (comp headers->map remove-empty-headers))
               (update-server-list)
               (dissoc :original-server :fhir-server))})))

(reg-event-fx
  ::connect
  (fn [{db :db} [_ {:keys [server-name base-url headers]}]]
    {:db (-> db
             (assoc ::request-sent-by server-name)
             (update :cfg/fhir-servers dissoc :used-server-name))
     :http-xhrio
     [(http/get-metadata db {:uri (-> base-url uri/uri
                                      (assoc :path "/metadata")
                                      uri/uri-str)
                             :on-success [::get-metadata-success server-name]
                             :on-failure [::not-connected server-name]})
      (http/get-view-definitions
        db
        {:uri (-> base-url uri/uri
                  (assoc :path "/ViewDefinition")
                  uri/uri-str)
         :headers (remove
                    (fn [[k v]]
                      (or (str/blank? (name k)) (str/blank? (name v)))) headers)

         :on-success [::get-view-definitions-success server-name]
         :on-failure [::not-connected server-name]})]}))


(reg-event-fx
  ::get-metadata-success
  (fn [{:keys [db]} [_ server-name result]]
    {:db (-> db
             (assoc-in [:cfg/fhir-servers :servers server-name :fhir-version] (:fhirVersion result)))}))

(reg-event-fx
  ::get-view-definitions-success
  (fn [{:keys [db]} [_ server-name _result]]
    {:db (-> db
             (assoc-in [:cfg/fhir-servers :used-server-name] server-name)
             (dissoc ::request-sent-by :edit-server :fhir-server :cfg/connect-error))}))


(reg-event-fx
  ::not-connected
  (fn [{:keys [db]} [_ server-name result]]
    {:db (assoc db :cfg/connect-error {:result result
                                       :server-name server-name})
     :notification-error (str "Error on connect: " (u/response->error result))}))

(reg-event-db
  ::cancel-edit
  (fn [db [_]]
    (dissoc db :fhir-server :original-server)))

(reg-event-fx
  ::delete
  (fn [{:keys [db]} [_ server-name]]
    {:db (-> db
             (update-in [:cfg/fhir-servers :servers] dissoc server-name)
             (cond-> (-> db :cfg/fhir-servers :used-server-name (= server-name))
               (update :cfg/fhir-servers dissoc :used-server-name)))
     :message-success "Deleted"}))

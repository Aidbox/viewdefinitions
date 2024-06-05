(ns vd-designer.pages.settings.controller
  (:require
   [ajax.core :as ajax]
   [clojure.string :as str]
   [lambdaisland.uri :as uri]
   [medley.core :as medley]
   [vd-designer.utils.db-utils :as db-utils]
   [re-frame.core :refer [inject-cofx reg-event-db reg-event-fx]]
   [vd-designer.http.fhir-server :as http]
   [vd-designer.notifications]
   [vd-designer.utils.event :as u]))

(reg-event-fx
 ::start
 (fn [{db :db} [_]]
   {:db db
    :fx [[:dispatch [::fetch-user-servers]]]}))

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

    (if (some-> db :cfg/fhir-servers :sandbox/servers not-empty)
      (assoc-in db [:cfg/fhir-servers :sandbox/servers server-name] new-server)
      (assoc db :cfg/fhir-servers {:sandbox/servers  {server-name new-server}
                                   :used-server-name server-name}))))

(defn edit-server [db]
  (let [edited-server (:fhir-server db)
        server-name (:server-name edited-server)
        prev-server (:original-server db)
        used-server-name (-> db :cfg/fhir-servers :used-server-name)]
    (-> db
        (update-in [:cfg/fhir-servers :sandbox/servers] dissoc (:server-name prev-server))
        (assoc-in [:cfg/fhir-servers :sandbox/servers server-name] edited-server)
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
 [(inject-cofx :get-authentication-token)]
 (fn [{:keys [db authentication-token]}
      [_ {:keys [server-name box-url headers] :as server}]]
   (cond->
     {:db (-> db
              (assoc ::request-sent-by server-name)
              (update :cfg/fhir-servers dissoc :used-server-name))
      :http-xhrio
      (if (db-utils/sandbox? db server-name)
        [(http/get-metadata db {:uri        (-> box-url uri/uri
                                                (assoc :path "/fhir/metadata")
                                                uri/uri-str)
                                :on-success [::get-metadata-success server-name]
                                :on-failure [::not-connected server-name]})
         (http/get-view-definitions
           db
           {:uri        (-> box-url uri/uri
                            (assoc :path "/fhir/ViewDefinition")
                            uri/uri-str)
            :headers    (remove
                          (fn [[k v]]
                            (or (str/blank? (name k)) (str/blank? (name v)))) headers)

            :on-success [::get-view-definitions-success server-name]
            :on-failure [::not-connected server-name]})]
        (assoc (http/get-view-definitions-user-server authentication-token server)
               :on-success [::get-view-definitions-success server-name]
               :on-failure [::not-connected server-name]))})))

(reg-event-fx
 ::get-metadata-success
 (fn [{:keys [db]} [_ server-name result]]
   {:db (-> db
            (assoc-in [:cfg/fhir-servers :sandbox/servers server-name :fhir-version] (:fhirVersion result)))}))

(reg-event-fx
 ::get-view-definitions-success
 (fn [{:keys [db]} [_ server-name _result]]
   {:db (-> db
            (assoc-in [:cfg/fhir-servers :used-server-name] server-name)
            (dissoc ::request-sent-by :edit-server :fhir-server :cfg/connect-error))}))

(reg-event-fx
 ::not-connected
 (fn [{:keys [db]} [_ server-name result]]
   {:db                 (assoc db :cfg/connect-error {:result      result
                                                      :server-name server-name})
    :notification-error (str "Error on connect: " (u/response->error result))}))

(reg-event-db
 ::cancel-edit
 (fn [db [_]]
   (dissoc db :fhir-server :original-server)))

(reg-event-fx
 ::delete
 (fn [{:keys [db]} [_ server-name]]
   {:db              (-> db
                         (update-in [:cfg/fhir-servers :sandbox/servers] dissoc server-name)
                         (cond-> (-> db :cfg/fhir-servers :used-server-name (= server-name))
                           (update :cfg/fhir-servers dissoc :used-server-name)))
    :message-success "Deleted"}))

(defn add-auth-header [{:keys [aidbox-auth-token] :as server}]
  (assoc server
         :headers {"Cookie" (str "aidbox-auth-token=" aidbox-auth-token)}))

(reg-event-db
 ::update-user-server-list
 (fn [db [_ user-server-list]]
   (->> user-server-list
        (group-by :server-name)
        (medley/map-vals (comp add-auth-header first))
        (assoc-in db [:cfg/fhir-servers :user/servers]))))

(reg-event-fx
 ::fetch-user-servers
 [(inject-cofx :get-authentication-token)]
 (fn [{:keys [authentication-token]} _]
   {; TODO: добавить флаг о том, что мы начали подгружать список user servers?

    :http-xhrio
    {:uri              "/api/aidbox/servers"
     :timeout          8000
     :format           (ajax/json-request-format)
     :response-format  (ajax/json-response-format {:keywords? true})
     :with-credentials true
     :method           :get
     :headers          {:authorization (str "Bearer " authentication-token)}
     :on-success       [::update-user-server-list]
     #_#_:on-failure [::not-connected server-name]}}))

(ns vd-designer.pages.lists.settings.controller
  (:require [medley.core :as medley]
            [re-frame.core :refer [reg-cofx reg-event-fx reg-fx reg-event-db inject-cofx]]
            [vd-designer.auth.controller :as auth]
            [vd-designer.http.backend :as backend]
            [vd-designer.http.fhir-server :as http]
            [vd-designer.pages.lists.settings.model :as m]
            [vd-designer.notifications]
            [vd-designer.polling :as polling]
            [vd-designer.utils.event :as u]))

(reg-event-fx
 ::start
 (fn [_ [_]]
   {:dispatch [::fetch-user-servers]
    ::polling/set-polling-timer {:event-vec [::fetch-user-servers]
                                 :interval  5000}}))

(reg-event-fx
 ::stop
 (fn [_ [_]]
   {::polling/clear-polling-timer ::fetch-user-servers}))

(def chosen-server-kv :chosen-server)

(reg-event-fx
 ::connect
 (fn [{:keys [db]} [_ {:keys [name] :as chosen-server}]]
   {:db (-> db (assoc ::request-sent-by name))
    :fx [[:dispatch [::delete-chosen-server]]
         [:dispatch [::auth/with-authentication
                     (fn [authentication-token]
                       (assoc (http/get-view-definitions authentication-token chosen-server)
                              :on-success [::connect-success chosen-server]
                              :on-failure [::not-connected name]))]]]}))

(reg-event-fx
 ::connect-success
 (fn [{:keys [db]} [_ chosen-server _]]
   {:fx [[:dispatch [::store-chosen-server chosen-server]]]
    :db (dissoc db ::request-sent-by :edit-server :cfg/connect-error)}))

(reg-event-fx
 ::not-connected
 (fn [{:keys [db]} [_ server-name result]]
   {:db                 (assoc db :cfg/connect-error
                               {:result      result
                                :server-name server-name})
    :notification-error (str "Error on connect: " (u/response->error result))}))

(defn add-custom-servers [db custom-servers]
  (assoc-in db [:cfg/fhir-servers  :custom-servers]
            custom-servers))

(defn add-public-servers [db public-servers]
  (assoc-in db [:cfg/fhir-servers  :public-servers] public-servers))

(defn add-portal-servers [db portal-servers]
  (assoc-in db [:cfg/fhir-servers  :portal-servers] portal-servers))

(defn add-custom-server [db custom-server]
  (update-in db [:cfg/fhir-servers :custom-servers] conj custom-server))

(defn delete-custom-server [db custom-server]
  (update-in db [:cfg/fhir-servers :custom-servers]
             (fn [servers]
               (vec (remove (fn [server] (= (:box-url server) (:box-url custom-server))) servers)))))
(reg-event-fx
 ::update-user-server-list
 (fn [{:keys [db]} [_ list-servers-body]]
   {:db (-> db
            (add-portal-servers (:portal-servers list-servers-body))
            (add-custom-servers (:custom-servers list-servers-body))
            (add-public-servers (:public-servers list-servers-body)))
    :dispatch [::use-sandbox-if-not-selected]}))

(reg-event-fx
 ::fetch-user-servers
 (fn [_ _]
   {;; TODO: add a flag when started to load user servers?
    :dispatch [::auth/with-authentication
               (fn [authentication-token]
                 (-> (backend/request:list-server authentication-token)
                     (assoc :on-success [::update-user-server-list]
                            :on-failure [::not-connected nil])))]}))

(reg-fx
 :set-chosen-server
 (fn [v]
   (.setItem (.-localStorage js/window)
              ;; TODO: keyword or string?
             chosen-server-kv
             v)))

(reg-fx
 :delete-chosen-server
 (fn []
   (.removeItem (.-localStorage js/window) chosen-server-kv)))

(reg-event-fx
 ::store-chosen-server
 (fn [{:keys [db]} [_ chosen-server]]
   (let [chosen-server (select-keys chosen-server [:server-name :name :project-id :type])]
     {:set-chosen-server chosen-server
      :db (assoc-in db [:cfg/fhir-servers chosen-server-kv] chosen-server)})))

(reg-event-fx
 ::delete-chosen-server
 (fn [{:keys [db]} [_]]
   (let [first-sandbox (m/first-public-server-name db)]
     (if first-sandbox
       {:dispatch [::store-chosen-server {:type :public-servers :server-name first-sandbox}]}
       {:delete-chosen-server true
        :db (update db :cfg/fhir-servers dissoc chosen-server-kv)}))))

(reg-cofx
 :get-chosen-server
 (fn [coeffects]
   (assoc coeffects
          chosen-server-kv
          (js->clj (.getItem js/localStorage chosen-server-kv)))))

(reg-event-fx
 ::use-sandbox-if-not-selected
 (fn [{:keys [db]} _]
   (when (m/unknown-server-selected? db)
     {:dispatch [::store-chosen-server {:type :public-servers
                                        :server-name (m/first-public-server-name db)}]})))

(reg-event-db
 ::set-editable-server
 (fn [db [_ server]]
   (assoc db ::m/editable-server server)))

(reg-event-fx
 ::open-add-server-form
 (fn [{:keys [db]} [_]]
   {:db (assoc db ::m/add-server-form-opened true)}))

(reg-event-fx
 ::open-update-server-form
 (fn [{:keys [db]} [_ server-config]]
   {:db (assoc db ::m/update-server-form-opened true)
    :fx [[:dispatch [::set-editable-server server-config]]]}))

(reg-event-db
 ::close-server-form
 (fn [db [_]]
   (assoc db ::m/update-server-form-opened false
          ::m/add-server-form-opened false)))

(defn update-headers-map [server]
  (update server :headers
          (fn [headers-vec]
            (->> headers-vec
                 (mapv #(hash-map (:name %) (:value %)))
                 (into {})))))

(reg-event-fx
 ::new-server
 (fn [_ [_ fhir-server]]
   (let [fhir-server
         (cond-> fhir-server
           (:headers fhir-server)
           (update-headers-map))]
     {:dispatch [::auth/with-authentication
                 (fn [authentication-token]
                   (assoc (backend/post-fhir-server
                           authentication-token fhir-server)
                          :on-success [::new-server-success]
                          :on-failure [::new-server-failure]))]})))

(reg-event-fx
 ::new-server-success
 (fn [{:keys [db]} [_ result]]
   {:db (add-custom-server db result)
    :fx [[:dispatch [::close-server-form]]]}))

(reg-event-fx
 ::new-server-failure
 (fn [_ [_ result]]
   {:notification-error (str "Error on adding FHIR server: " (u/response->error result))}))

(reg-event-fx
 ::update-server
 (fn [_ [_ old-settings new-settings]]
   (let [new-settings
         (cond-> new-settings
           (:headers new-settings)
           (update-headers-map))]
     {:fx
      [[:dispatch [::auth/with-authentication
                   (fn [authentication-token]
                     (assoc (backend/update-fhir-server
                             authentication-token
                             old-settings
                             new-settings)
                            :on-success [::update-server-success old-settings]
                            :on-failure [::update-server-failure]))]]
       [:dispatch [::set-editable-server nil]]]})))

(reg-event-fx
 ::update-server-success
 (fn [{:keys [db]} [_ old-settings result]]
   (let [currently-connected? (= (:server-name old-settings) (:server-name m/chosen-server))
         new-name? (not= (:server-name old-settings) (:server-name result))
         change-used-name? (and currently-connected? new-name?)]
     {:db (-> db
              (delete-custom-server old-settings)
              (add-custom-server result))
      :fx [(when change-used-name?
             [:dispatch [::store-chosen-server result]])
           [:dispatch [::close-server-form]]]})))

(reg-event-fx
 ::update-server-failure
 (fn [_ [_ result]]
   {:notification-error (str "Error on updating FHIR server: " (u/response->error result))}))

(reg-event-fx
 ::delete-custom-server
 (fn [_ [_ custom-server]]
   {:fx [[:dispatch [::auth/with-authentication
                     (fn [authentication-token]
                       (assoc (backend/delete-fhir-server
                               authentication-token custom-server)
                              :on-success [::delete-custom-server-success]
                              :on-failure [::delete-custom-server-failure]))]]
         [:dispatch [::use-sandbox-if-not-selected]]]}))

(reg-event-fx
 ::delete-custom-server-success
 (fn [{:keys [db]} [_ custom-server]]
   {:db (delete-custom-server db custom-server)}))

(reg-event-fx
 ::delete-custom-server-failure
 (fn [_ [_ result]]
   {:notification-error (str "Error on deleting FHIR server: " (u/response->error result))}))

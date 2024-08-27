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

(def used-server-name-kv :used-server-name)

(reg-event-fx
 ::connect
 (fn [{:keys [db]} [_ {:keys [server-name] :as server}]]
   {:db (-> db
            (assoc ::request-sent-by server-name))
    :fx [[:dispatch [::delete-used-server-name]]
         [:dispatch [::auth/with-authentication
                     (fn [authentication-token]
                       (assoc (http/get-view-definitions authentication-token server)
                              :on-success [::connect-success server-name]
                              :on-failure [::not-connected server-name]))]]]}))

(reg-event-fx
 ::connect-success
 (fn [{:keys [db]} [_ server-name _]]
   {:fx [[:dispatch [::store-used-server-name server-name]]]
    :db (dissoc db ::request-sent-by :edit-server :cfg/connect-error)}))

(reg-event-fx
 ::not-connected
 (fn [{:keys [db]} [_ server-name result]]
   {:db                 (assoc db :cfg/connect-error
                               {:result      result
                                :server-name server-name})
    :notification-error (str "Error on connect: " (u/response->error result))}))

(defn add-custom-servers [db custom-servers]
  (assoc-in db [:cfg/fhir-servers :user/servers :custom-servers]
            custom-servers))

(defn add-portal-boxes [db portal-boxes]
  (assoc-in db [:cfg/fhir-servers :user/servers :portal-boxes] portal-boxes))

(defn add-custom-server [db custom-server]
  (assoc-in db [:cfg/fhir-servers :user/servers :custom-servers
                (:server-name custom-server)] custom-server))

(defn delete-custom-server [db custom-server]
  (update-in db [:cfg/fhir-servers :user/servers :custom-servers]
             dissoc (:server-name custom-server)))

(reg-event-fx
 ::update-user-server-list
 (fn [{:keys [db]} [_ list-servers-body]]
   (let [portal-boxes (->> (:portal-boxes list-servers-body)
                           (group-by :server-name)
                           (medley/map-vals first))
         custom-servers
         (->> (:custom-servers list-servers-body)
              (group-by :server-name)
              (medley/map-vals first))]
     {:db (-> db
              (add-portal-boxes portal-boxes)
              (add-custom-servers custom-servers))
      :dispatch [::use-sandbox-if-not-selected]})))

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
 :set-used-server-name
 (fn [v]
   (.setItem (.-localStorage js/window)
              ;; TODO: keyword or string?
             used-server-name-kv
             v)))

(reg-fx
 :delete-used-server-name
 (fn []
   (.removeItem (.-localStorage js/window) used-server-name-kv)))

(reg-event-fx
 ::store-used-server-name
 (fn [{:keys [db]} [_ used-server-name]]
   {:set-used-server-name used-server-name
    :db (assoc-in db [:cfg/fhir-servers used-server-name-kv] used-server-name)}))

(reg-event-fx
 ::delete-used-server-name
 (fn [{:keys [db]} [_]]
   (let [first-sandbox (m/first-sandbox-server-name db)]
     (if first-sandbox
       {:dispatch [::store-used-server-name first-sandbox]}
       {:delete-used-server-name true
        :db (update db :cfg/fhir-servers dissoc used-server-name-kv)}))))

(reg-cofx
 :get-used-server-name
 (fn [coeffects]
   (assoc coeffects
          used-server-name-kv
          (js->clj (.getItem js/localStorage used-server-name-kv)))))

(reg-event-fx
 ::use-sandbox-if-not-selected
 (fn [{:keys [db]} _]
   (when (m/unknown-server-selected? db)
     {:dispatch [::store-used-server-name
                 (m/first-sandbox-server-name db)]})))

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
 [(inject-cofx :get-used-server-name)]
 (fn [{:keys [db used-server-name]} [_ old-settings result]]
   (let [currently-connected? (= (:server-name old-settings) used-server-name)
         new-name? (not= (:server-name old-settings) (:server-name result))
         change-used-name? (and currently-connected? new-name?)]
     {:db (-> db
              (delete-custom-server old-settings)
              (add-custom-server result))
    :fx [(when change-used-name?
           [:dispatch [::store-used-server-name (:server-name result)]])
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

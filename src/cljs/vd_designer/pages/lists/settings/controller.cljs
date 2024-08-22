(ns vd-designer.pages.lists.settings.controller
  (:require [medley.core :as medley]
            [re-frame.core :refer [reg-cofx reg-event-fx reg-fx reg-event-db]]
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

(reg-event-fx
 ::connect
 (fn [{:keys [db]} [_ {:keys [server-name] :as server}]]
   {:delete-used-server-name true
    :db (-> db
            (assoc ::request-sent-by server-name)
            (update :cfg/fhir-servers dissoc :used-server-name))

    :dispatch [::auth/with-authentication
               (fn [authentication-token]
                 (assoc (http/get-view-definitions authentication-token server)
                        :on-success [::connect-success server-name]
                        :on-failure [::not-connected server-name]))]}))

(reg-event-fx
 ::connect-success
 (fn [{:keys [db]} [_ server-name _result]]
   {:fx [[:dispatch [::store-used-server-name server-name]]]
    :db (dissoc db ::request-sent-by :edit-server
                :fhir-server :cfg/connect-error)}))

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

(def used-server-name-kv :used-server-name)

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
    :db                   (assoc-in db [:cfg/fhir-servers used-server-name-kv] used-server-name)}))

(reg-cofx
 :get-used-server-name
 (fn [coeffects]
   (assoc coeffects
          used-server-name-kv
          (js->clj (.getItem js/localStorage used-server-name-kv)))))

(reg-event-fx
 ::use-sandbox-if-not-selected
 (fn [{:keys [db]} _]
   ;; FIXME
   (when (or (m/unknown-server-selected? db)
             (and (not (m/unknown-server-selected? db))
                  (not (m/used-server-name db))))
     {:dispatch [::store-used-server-name
                 (m/first-sandbox-server-name db)]})))

(reg-event-db
 ::open-server-form
 (fn [db [_ ]]
   (assoc db ::m/server-form-opened true)))

(reg-event-db
 ::close-server-form
 (fn [db [_ ]]
   (assoc db ::m/server-form-opened false)))

(reg-event-fx
 ::new-server
 (fn [_ [_ fhir-server]]
   (let [fhir-server
         (cond-> fhir-server
           (:headers fhir-server)
           (update :headers
                   (fn [headers-vec]
                     (->> headers-vec
                          (mapv #(hash-map (:name %) (:value %)))
                          (into {})))))]
     {:dispatch [::auth/with-authentication
                 (fn [authentication-token]
                   (assoc (backend/post-fhir-server
                            authentication-token fhir-server)
                          :on-success [::new-server-success]
                          :on-failure [::new-server-failure]))]})))

(reg-event-db
  ::new-server-success
  (fn [db [_ result]]
    (add-custom-server db result)))

(reg-event-fx
  ::new-server-failure
  (fn [_ [_ result]]
    (println " res " result)
    {:notification-error (str "Error on adding FHIR server: " (u/response->error result))}))

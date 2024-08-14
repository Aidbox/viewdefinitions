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

(reg-event-fx
 ::update-user-server-list
 (fn [{:keys [db]} [_ user-server-list]]
   {:db (->> user-server-list
             (group-by :server-name)
             (medley/map-vals first)
             (assoc-in db [:cfg/fhir-servers :user/servers]))
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

(defn unknown-server-selected? [db]
  ;; TODO: use subs?
  (let [servers (-> db :cfg/fhir-servers :user/servers)
        used-server-name (-> db :cfg/fhir-servers :used-server-name)]
    (not (get servers used-server-name))))

(defn first-sandbox-server [servers]
 ;; TODO: may be a reason of bug one day. explicitly set sandbox = true at backend
  (->> servers
       (remove (fn [[_ s]] (:project s)))
       first
       first))

(reg-event-fx
 ::use-sandbox-if-not-selected
 (fn [{:keys [db]} _]
   (when (unknown-server-selected? db)
     {:dispatch [::store-used-server-name
                 (-> db :cfg/fhir-servers :user/servers
                     first-sandbox-server)]})))

(reg-event-db
 ::open-server-form
 (fn [db [_ ]]
   (assoc db ::m/server-form-opened true)))

(reg-event-db
 ::close-server-form
 (fn [db [_ ]]
   (assoc db ::m/server-form-opened false)))

(reg-event-db
  ::change-server-name
 (fn [db [_ ]]
   (assoc-in db [:cfg/fhir-servers :user/servers 2] 1)))

(ns vd-designer.pages.settings.controller
  (:require
    [ajax.core :as ajax]
    [medley.core :as medley]
    [re-frame.core :refer [inject-cofx reg-event-db reg-event-fx]]
    [vd-designer.http.fhir-server :as http]
    [vd-designer.notifications]
    [vd-designer.polling :as polling]
    [vd-designer.utils.event :as u]))

(reg-event-fx
 ::start
 (fn [_ [_]]
   {::polling/set-polling-timer {:event-vec [::fetch-user-servers]
                                 :interval  5000}}))

(reg-event-fx
 ::stop
 (fn [_ [_]]
   {::polling/clear-polling-timer ::fetch-user-servers}))

(reg-event-db
 ::update-fhir-server-input
 (fn [db [_ path new-val]]
   (assoc-in db (into [:fhir-server] path) new-val)))

(reg-event-db
 ::add-fhir-server-header
 (fn [db [_]]
   (update-in db [:fhir-server :headers] (fnil conj []) {:name "", :value ""})))

(reg-event-fx
 ::connect
 [(inject-cofx :get-authentication-token)]
 (fn [{:keys [db authentication-token]}
      [_ {:keys [server-name] :as server}]]
   {:db (-> db
            (assoc ::request-sent-by server-name)
            (update :cfg/fhir-servers dissoc :used-server-name))
    :http-xhrio
    (assoc (http/get-view-definitions authentication-token server)
      :on-success [::get-view-definitions-success server-name]
      :on-failure [::not-connected server-name])}))

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

(reg-event-db
 ::update-user-server-list
 (fn [db [_ user-server-list]]
   (->> user-server-list
        (group-by :server-name)
        (medley/map-vals first)
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

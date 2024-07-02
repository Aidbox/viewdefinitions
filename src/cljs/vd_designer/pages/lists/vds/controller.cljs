(ns vd-designer.pages.lists.vds.controller
  (:require
   [clojure.string :as str]
   [re-frame.core :refer [reg-event-db reg-event-fx]]
   [vd-designer.auth.controller :as auth]
   [vd-designer.utils.debounce]
   [vd-designer.http.fhir-server :as http.fhir-server]
   [vd-designer.pages.lists.settings.controller :as settings-controller]
   [vd-designer.utils.event :refer [response->error]]
   [vd-designer.pages.lists.vds.model :as m]))

(reg-event-fx
 ::start
 (fn [{db :db} [_]]
   {:fx (if (-> db :cfg/fhir-servers :user/servers)
          [[:dispatch [::get-view-definitions]]]

          [[:dispatch [::settings-controller/fetch-user-servers]]
           [:dispatch [:dispatch-debounce
                       {:key :get-vds
                        :event [::get-view-definitions]
                        :delay 1000}]]])}))

(reg-event-fx
 ::get-view-definitions
 (fn [{:keys [db]} [_]]
   {:db         (assoc db ::m/view-definitions-loading true)

    :dispatch   [::auth/with-authentication
                 (fn [authentication-token]
                   (-> (http.fhir-server/get-view-definitions
                        authentication-token
                        (http.fhir-server/active-server db))
                       (assoc :on-success [::got-view-definitions-success]
                              :on-failure [::get-view-definitions-fail])))]}))

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
 ::delete-view-definition
 (fn [{:keys [db]} [_ id]]
   {:dispatch [::auth/with-authentication
               (fn [authentication-token]
                 (-> (http.fhir-server/delete-view-definition
                      authentication-token
                      (http.fhir-server/active-server db)
                      id)
                     (assoc :on-success [::delete-view-definition-success id]
                            :on-failure [::delete-view-definition-failure])))]}))

(reg-event-fx
 ::delete-view-definition-success
 (fn [{:keys [db]} [_ id _result]]
   {:db (update db :view-definitions
                #(remove (fn [entry] (= id (-> entry :resource :id))) %))
    :message-success "Deleted"}))

(reg-event-fx
 ::delete-view-definition-failure
 (fn [{:keys [db]} [_ result]]
   {:db (assoc db ::m/delete-fail result)
    :notification-error (str "Delete failed: " (response->error result))}))

(reg-event-db
 ::filter-updated
 (fn [db [_ filter-phrase]]
   (if (str/blank? filter-phrase)
     (dissoc db ::filter-phrase)
     (assoc  db ::filter-phrase filter-phrase))))

(reg-event-db
 ::start-import
 (fn [db [_]]
   (assoc db :vd-import {})))

(reg-event-db
 ::close-import-modal
 (fn [db [_]]
   (dissoc db :vd-import)))

(reg-event-fx
 ::on-import-error
 (fn [{:keys [_]} [_ result]]
   {:notification-error result}))

(reg-event-db
 ::add-import-file
 (fn [db [_ file]]
   (assoc-in db [:vd-import :file] file)))

(reg-event-db
 ::remove-import-content
 (fn [db [_]]
   (update db :vd-import dissoc :file :text)))

(reg-event-fx
 ::import-success
 (fn [{:keys [db]} [_ vd]]
   {:db              (assoc db :current-vd vd)
    :dispatch        [::close-import-modal]
    :message-success "Import completed"
    :navigate        [:form-create {:query-params {:imported true}}]}))

(reg-event-db
 ::change-upload-text
 (fn [db [_ text]]
   (assoc-in db [:vd-import :text] text)))

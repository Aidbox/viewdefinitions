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
  ::new-server-draft
  (fn [db [_]]
    (assoc db :edit-server true
              :new-server-draft true)))

(reg-event-db
  ::start-edit
  (fn [db [_]]
    (assoc db :edit-server true)))

(reg-event-fx
  ::try-new-conn
  (fn [{db :db} [_ {:keys [base-url token] :as _fhir-server}]]
    {:db         (assoc db ::request-sent true)
     :http-xhrio (-> (http.fhir-server/get-view-definitions db)
                     (assoc :uri (-> base-url uri/uri
                                     (assoc :path "/ViewDefinition")
                                     uri/uri-str)
                            :headers {:Authorization token}
                            :on-success [::got-view-definitions]
                            #_#_:on-failure [::todo]))}))

(defn add-new-server [db set-active?]
  (let [{:keys [server-name] :as new-server} (:fhir-server db)]
    (if (some-> db :cfg/fhir-servers :servers not-empty)
      (-> db
          (update-in [:cfg/fhir-servers :servers] merge {server-name new-server})
          (cond-> set-active?
                  (assoc-in [:cfg/fhir-servers :used-server-name] server-name)))
      (assoc db :cfg/fhir-servers {:servers          {server-name new-server}
                                   :used-server-name server-name}))))

(reg-event-fx
  ::got-view-definitions
  #_[(inject-cofx :local-store :local-store/test)]
  (fn [{:keys [db local-store]} [_ result]]
    {:db (-> db (add-new-server false)                      ;; TODO: add handling of setting as active
             #_(assoc :view-definitions (:entry result))    ;;  <- if set-active: true
             (dissoc ::request-sent :new-server-draft
                     :edit-server :fhir-server ))}))

(reg-event-db
  ::cancel-edit
  (fn [db [_]]
    (dissoc db :edit-server :fhir-server)))

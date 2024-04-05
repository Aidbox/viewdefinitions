(ns vd-designer.pages.vd-form.controller
  (:require [re-frame.core :refer [reg-event-db reg-event-fx]]
            [vd-designer.http.fhir-server :as http.fhir-server]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.pages.vd-form.normalization :refer [normalize-vd]]))


(reg-event-fx
  ::start
 (fn [{db :db} [_ parameters]]
   (let [vd-id (-> parameters :path :id)]
     {:db db
      :fx (cond-> []
            :always
            (conj [:dispatch [::get-supported-resource-types]])

            vd-id
            (conj [:dispatch [::get-view-definition vd-id]]))})))

(reg-event-fx
  ::stop
  (fn [{db :db} [_]]
    {:db (dissoc db :current-vd)}))

(reg-event-fx
 ::get-supported-resource-types
 (fn [{:keys [db]} [_]]
   {:db         (assoc db :loading true)
    :http-xhrio (-> (http.fhir-server/get-metadata db)
                    (assoc :on-success [::get-supported-resource-types-success]))}))

(reg-event-db
 ::get-supported-resource-types-success
 (fn [db [_ resp-body]]
   (let [resources (->> resp-body :rest (mapcat :resource) (mapv :type) set)]
     (assoc db :resources resources))))

(reg-event-fx
 ::get-view-definition
 (fn [{:keys [db]} [_ vd-id]]
   {:db         (assoc db :loading true)
    :http-xhrio (-> (http.fhir-server/get-view-definition db vd-id)
                    (assoc :on-success [::choose-vd]))}))

(reg-event-fx
 ::choose-vd
 (fn [{:keys [db]} [_ vd-id]]
   {:fx [[:dispatch [::eval-view-definition-data]]]
    :db (assoc db :current-vd (update vd-id :select normalize-vd))}))

(reg-event-fx
 ::eval-view-definition-data
 (fn [{:keys [db]} _]
   (let [view-definition (:current-vd db)]
     {:db         (assoc db :loading true)
      :http-xhrio (-> (http.fhir-server/aidbox-rpc db {:method 'sof/eval-view
                                                       :params {:limit 100
                                                                :view  view-definition}})
                      (assoc :on-success [::on-eval-view-definitions-success]))})))

(reg-event-db
 ::on-eval-view-definitions-success
 (fn [db [_ result]]
   (assoc db ::m/resource-data (:result result))))

(reg-event-db
 ::change-input-value
 (fn [db [_ path value]]
   (assoc-in db (into [:current-vd] path) value)))

(reg-event-db
 ::add-element-into-array
 (fn [db [_ path default-value]]
   (update-in db (into [:current-vd] path) (fnil conj []) (or default-value {}))))

(defn vec-remove
  "remove elem in coll"
  [node key]
  (into (subvec node 0 key)
        (subvec node (inc key))))

(defn remove-node [node key]
  (cond
    (map? node)    (dissoc node key)
    (vector? node) (vec-remove node key)))

(reg-event-db
 ::change-vd-resource
 (fn [db [_ value]]
   (assoc-in db [:current-vd :resource] value)))

(reg-event-db
 ::change-vd-name
 (fn [db [_ value]]
   (assoc-in db [:current-vd :name] value)))

(reg-event-db
 ::delete-tree-element
 (fn [db [_ path]]
   (update-in db
              (into [:current-vd] (pop path))
              remove-node
              (peek path))))

(reg-event-fx
  ::save-view-definition
 (fn [{:keys [db]} [_]]
   (let [view-definition (:current-vd db)]
     {:db (assoc db ::m/save-view-definition-loading true)
      :http-xhrio
      (-> (http.fhir-server/put-view-definition
            db
            (:id view-definition)
            view-definition)
          (assoc :on-success [::save-view-definition-success]
                 :on-failure [::save-view-definition-failure]))})))

(reg-event-fx
  ::save-view-definition-success
 (fn [{:keys [db]} [_ result]]
   {:db (-> db
            (assoc :current-vd result)
            (dissoc ::m/save-view-definition-loading))}))

(reg-event-fx
  ::save-view-definition-failure
 (fn [{:keys [db]} [_ _result]]
   #_"TODO: handle it and render the error"
   {:db db}))

(ns vd-designer.pages.vd-form.controller
  (:require [re-frame.core :refer [reg-event-db reg-event-fx]]
            [vd-designer.http.fhir-server :as http.fhir-server]
            [vd-designer.pages.vd-form.model :as m]))

(def identifier ::main)

(reg-event-fx
 identifier
 (fn [{db :db} [_ phase]]
   (let [vd-id (-> db :route-params :id)]
     (if (= :init phase)
       {:db db
        :fx (cond-> []
              :always
              (conj [:dispatch [::get-supported-resource-types]])

              vd-id
              (conj [:dispatch [::get-view-definition (-> db :route-params :id)]]))}
       {:db (dissoc db :current-vd)}))))

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

(defn normalize-view [view]
  view)

(reg-event-fx
 ::choose-vd
 (fn [{:keys [db]} [_ vd-id]]
   {:fx [[:dispatch [::eval-view-definition-data]]]
    :db (assoc db :current-vd (normalize-view vd-id))}))

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

(reg-event-db
 ::add-element-into-map
 (fn [db [_ path k default-value]]
   (update-in db (into [:current-vd] path) assoc k (or default-value ""))))

(defn vec-remove
  "remove elem in coll"
  [pos coll]
  (into (subvec coll 0 pos) (subvec coll (inc pos))))

(defn remove-node [node key]
  (cond
    (map? node)
    (dissoc node key)

    (vector? node)
    (vec-remove key node)))

(reg-event-db
 ::change-vd-resource
 (fn [db [_ value]]
   (assoc-in db [:current-vd :resource] value)))

(reg-event-db
 ::change-vd-name
 (fn [db [_ value]]
   (assoc-in db [:current-vd :name] value)))

(reg-event-db
 ::delete-node
 (fn [db [_ path]]
   (update-in db
              (into [:current-vd] (butlast path))
              remove-node (last path))))



; {:forEach "path"
   ;; :column [{...}]
   ;; }

; {:forEach "path"
;; :select [{:column [{...}]}]
; }



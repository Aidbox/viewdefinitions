(ns vd-designer.pages.vd-form.controller
  (:require [clojure.string :as str]
            [re-frame.core :refer [reg-event-db reg-event-fx]]
            [vd-designer.http.fhir-server :as http.fhir-server]
            [vd-designer.pages.vd-form.fhir-schema :refer [get-select-path]]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.pages.vd-form.normalization :refer [normalize-vd]]
            [vd-designer.pages.vd-form.uuid-decoration :refer [decorate
                                                               remove-decoration
                                                               uuid->idx]]))


#_"status is required"
(defn set-view-definition-status [db]
  (let [vd (:current-vd db)]
    (if (not (:status vd))
      (assoc-in db [:current-vd :status] "unknown")
      db)))

(reg-event-fx
 ::start
 (fn [{db :db} [_ parameters]]
   (let [vd-id (-> parameters :path :id)]
     {:db (if vd-id db (set-view-definition-status db))
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
                    (assoc :on-success [::choose-vd]
                           :on-failure [::on-vd-error]))}))

(reg-event-fx
 ::choose-vd
 (fn [{:keys [db]} [_ view]]
   (let [decorated-view (-> view
                            (update :select normalize-vd)
                            (decorate))]
     {:fx [[:dispatch [::reset-vd-error]]
           [:dispatch [::eval-view-definition-data]]
           [:dispatch [::update-tree-expanded-nodes
                       (->> (get-select-path decorated-view)
                            (into [[:constant] [:where] [:select]])
                            (mapv str))]]]
      :db (assoc db :current-vd decorated-view)})))

(reg-event-fx
 ::eval-view-definition-data
 (fn [{:keys [db]} _]
   (let [view-definition (remove-decoration (:current-vd db))]
     {:db         (assoc db :loading true)
      :http-xhrio (-> (http.fhir-server/aidbox-rpc db {:method 'sof/eval-view
                                                       :params {:limit 100
                                                                :view  view-definition}})
                      (assoc :on-success [::on-eval-view-definitions-success]))})))

(reg-event-db
 ::reset-vd-error
 (fn [db [_]]
   (dissoc db ::m/current-vd-error)))

(reg-event-db
 ::on-vd-error
 (fn [db [_ result]]
   (assoc db ::m/current-vd-error (or (-> result :response :error)
                                      (-> result :response :text :div)))))

(reg-event-db
 ::on-eval-view-definitions-success
 (fn [db [_ result]]
   (assoc db ::m/resource-data (:result result))))

(reg-event-db
 ::change-input-value
 (fn [db [_ path value]]
   (let [real-path (uuid->idx path (:current-vd db))]
     (assoc-in db (into [:current-vd] real-path) value))))


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
 ::update-tree-expanded-nodes
 (fn [db [_ expanded]]
   (assoc-in db [:current-tree-expanded-nodes] expanded)))

(reg-event-fx
 ::add-tree-element
 (fn [{:keys [db]} [_ path default-value]]
   (let [value (decorate (or default-value {}))
         mk-expanded-path (fn [[k v]]
                            (-> path
                                (conj (:tree/key value) k)
                                (str)))]
     {:db (let [real-path (uuid->idx path (:current-vd db))]
            (update-in db
                       (into [:current-vd] real-path)
                       (fnil conj [])
                       value))
      :fx [[:dispatch-later
            [{:ms       100
              :dispatch [::update-tree-expanded-nodes
                         (into (:current-tree-expanded-nodes db)
                               (mapv mk-expanded-path default-value))]}]]]})))

(reg-event-fx
 ::delete-tree-element
 (fn [{:keys [db]} [_ path & [node-types]]]
   (let [mk-collapse-paths #(str/replace (str (conj path %)) #"[\[\]]" "")]
     {:fx [(when-not (nil? node-types)
             [:dispatch [::update-tree-expanded-nodes
                         (remove (fn [expanded]
                                   (some #(str/starts-with? (subs expanded 1) %)
                                         (mapv mk-collapse-paths node-types)))
                                 (:current-tree-expanded-nodes db))]])]
      :db (let [real-path (uuid->idx path (:current-vd db))]
            (update-in db
                       (into [:current-vd] (pop real-path))
                       remove-node
                       (peek real-path)))})))

(reg-event-fx
 ::save-view-definition
 (fn [{:keys [db]} [_]]
   (let [view-definition (remove-decoration (:current-vd db))
         req (if (:id view-definition)
               (http.fhir-server/put-view-definition
                db
                (:id view-definition)
                view-definition)
               (http.fhir-server/post-view-definition
                db
                view-definition))]
     {:db (assoc db ::m/save-view-definition-loading true)
      :http-xhrio (assoc req
                         :on-success [::save-view-definition-success]
                         :on-failure [::save-view-definition-failure])})))

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

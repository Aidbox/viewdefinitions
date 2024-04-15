(ns vd-designer.pages.vd-form.controller
  (:require [vd-designer.utils.utils :as utils]
            [medley.core :as medley]
            [day8.re-frame.tracing :refer-macros [fn-traced]]
            [re-frame.core :refer [reg-event-db reg-event-fx]]
            [vd-designer.http.fhir-server :as http.fhir-server]
            [vd-designer.pages.vd-form.fhir-schema :refer [get-select-path]]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.pages.vd-form.normalization :refer [normalize-vd]]
            [vd-designer.pages.vd-form.uuid-decoration :refer [decorate
                                                               remove-decoration
                                                               uuid->idx]]
            [vd-designer.utils.event :refer [response->error]]))

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
     {:db (cond-> db
            :alway
            (assoc ::m/language :language/yaml)

            (not vd-id)
            (set-view-definition-status))
      :fx (cond-> []
            :always
            (conj [:dispatch [::get-supported-resource-types]])

            vd-id
            (conj [:dispatch [::get-view-definition vd-id]]))})))

(reg-event-fx
 ::stop
 (fn [{db :db} [_]]
   {:db (dissoc db :current-vd ::m/resource-data)}))

(reg-event-fx
 ::get-supported-resource-types
 (fn [{:keys [db]} [_]]
   {:db         (assoc db :loading true)
    :http-xhrio (-> (http.fhir-server/get-metadata db)
                    (assoc :on-success [::get-supported-resource-types-success])
                    (assoc :on-failure [::on-vd-error]))}))

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
                            (into #{[:constant] [:where] [:select]}))]]]
      :db (assoc db :current-vd decorated-view)})))

(reg-event-fx
 ::eval-view-definition-data
 (fn [{:keys [db]} _]
   (let [view-definition (remove-decoration (:current-vd db))]
     {:db         (assoc db ::m/eval-loading true)
      :http-xhrio (-> (http.fhir-server/aidbox-rpc db {:method 'sof/eval-view
                                                       :params {:limit 100
                                                                :view  view-definition}})
                      (assoc :on-success [::on-eval-view-definition-success]
                             :on-failure [::on-eval-view-definition-error]))})))

(reg-event-db
 ::reset-vd-error
 (fn [db [_]]
   (dissoc db ::m/current-vd-error)))

(reg-event-db
 ::on-vd-error
 (fn-traced [db [_ result]]
            (assoc db ::m/current-vd-error (response->error result))))

(reg-event-db
 ::on-eval-view-definition-success
 (fn [db [_ result]]
   (assoc db
          ::m/resource-data (:result result)
          ::m/eval-loading false)))

(reg-event-fx
 ::on-eval-view-definition-error
 (fn [{:keys [db]} [_ result]]
   {:db (assoc db ::m/eval-loading false)
    :notification-error (str "Error on run: " (response->error result))}))

(reg-event-db
 ::change-input-value
 (fn [db [_ path value]]
   (let [real-path (uuid->idx path (:current-vd db))]
     (assoc-in db (into [:current-vd] real-path) value))))

(reg-event-db
 ::change-input-value-merge
 (fn [db [_ path value]]
   (let [real-path (uuid->idx path (:current-vd db))]
     (update-in db
                (into [:current-vd] real-path)
                medley/deep-merge value))))

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
 ::toggle-expand-collapse
 (fn [db [_ path]]
   (if (-> db :current-tree-expanded-nodes (contains? path))
     (update db :current-tree-expanded-nodes disj path)
     (update db :current-tree-expanded-nodes conj path))))

(reg-event-db
 ::update-tree-expanded-nodes
 (fn [db [_ expanded]]
   (assoc db :current-tree-expanded-nodes (set expanded))))

(reg-event-fx
 ::add-tree-element
 (fn [{:keys [db]} [_ path default-value]]
   (let [value (decorate (or default-value {}))
         mk-expanded-path (fn [[k _]]
                            (conj path (:tree/key value) k))]
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
 (fn [{:keys [db]} [_ path]]
   {:fx [[:dispatch [::update-tree-expanded-nodes
                     (->> (:current-tree-expanded-nodes db)
                          (remove #(utils/vector-starts-with % path)))]]]
    :db (let [real-path (uuid->idx path (:current-vd db))]
          (update-in db
                     (into [:current-vd] (pop real-path))
                     remove-node
                     (peek real-path)))}))

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
     {:db (assoc db
                 ::m/save-view-definition-loading true
                 ::m/save-loading true)
      :http-xhrio (assoc req
                         :on-success [::save-view-definition-success]
                         :on-failure [::save-view-definition-failure])})))

(reg-event-fx
 ::save-view-definition-success
 (fn [{:keys [db]} [_ result]]
   {:db (-> db
            (assoc :current-vd result ::m/save-loading false)
            (dissoc ::m/save-view-definition-loading))
    :message-success "Saved!"}))

(reg-event-fx
 ::save-view-definition-failure
 (fn [{:keys [db]} [_ result]]
   {:db (assoc db ::m/save-loading false)
    :notification-error (str "Error on save: " (response->error result))}))

(reg-event-db
 ::change-language
 (fn [db [_ lang]]
   (assoc db ::m/language lang)))

(reg-event-fx
 ::toggle-settings-opened-id
 (fn [{:keys [db]} [_ settings-opened-id]]
   {:db
    (if (= settings-opened-id (::m/settings-opened-id db))
      (assoc db ::m/settings-opened-id nil)
      (assoc db ::m/settings-opened-id settings-opened-id))}))

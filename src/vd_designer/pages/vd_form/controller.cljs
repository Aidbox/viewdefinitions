(ns vd-designer.pages.vd-form.controller
  (:require [day8.re-frame.tracing :refer-macros [fn-traced]]
            [medley.core :as medley]
            [re-frame.core :refer [reg-event-db reg-event-fx]]
            [vd-designer.http.fhir-server :as http.fhir-server]
            [vd-designer.pages.vd-form.fhir-schema :refer [get-constant-type
                                                           get-select-path]]
            [vd-designer.pages.vd-form.form.normalization :refer [normalize-vd]]
            [vd-designer.pages.vd-form.form.uuid-decoration :refer [decorate
                                                                    remove-decoration
                                                                    uuid->idx]]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.utils.event :refer [response->error]]
            [vd-designer.utils.string :as str.utils]
            [vd-designer.utils.utils :as utils]))

#_"status is required"
(defn set-view-definition-status [db]
  (let [vd (:current-vd db)]
    (if (not (:status vd))
      (assoc-in db [:current-vd :status] "unknown")
      db)))

(reg-event-fx
 ::start
 (fn [{db :db} [_ parameters]]
   (let [vd-id     (-> parameters :path  :id)
         imported? (-> parameters :query :imported)]
     {:db (cond-> db
            :always
            (assoc ::m/language :language/yaml)

            (not vd-id)
            (set-view-definition-status))
      :fx (cond-> []
            :always
            (conj [:dispatch [::get-supported-resource-types]])

            imported?
            (conj [:dispatch [::process-import]])

            vd-id
            (conj [:dispatch [::get-view-definition vd-id]]))})))

(reg-event-fx
 ::stop
 (fn [{db :db} [_]]
   {:db (dissoc db :current-vd ::m/resource-data ::m/language)}))

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
 ::process-import
 (fn [{:keys [db]} [_]]
   {:db       (assoc db :loading true)
    :dispatch [::choose-vd (:current-vd db)]}))

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
                            (into m/tree-root-keys))]]]
      :db (assoc db :current-vd decorated-view :loading false)})))

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
   (let [value (decorate default-value)
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

(defn remove-node [node key]
  (cond
    (map? node) (dissoc node key)
    (vector? node) (utils/remove-by-index node key)))

(defn remove-tree-element [vd path]
  (update-in vd (pop path) remove-node (peek path)))

(defn insert-tree-element-at [vd path element]
  (update-in vd (pop path) utils/insert-at (peek path) element))

(defn insert-tree-element-after [vd path element]
  (update-in vd (pop path) utils/insert-after (peek path) element))

(reg-event-fx
  ::delete-tree-element
  (fn [{:keys [db]} [_ path]]
    {:fx [[:dispatch [::update-tree-expanded-nodes
                      (->> (:current-tree-expanded-nodes db)
                           (remove #(utils/vector-starts-with % path)))]]]
     :db (let [real-path (uuid->idx path (:current-vd db))]
           (update db :current-vd remove-tree-element real-path))}))

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
 (fn [{:keys [db]} [_ _result]]
   {:db (-> db
            (assoc  ::m/save-loading false)
            (dissoc ::m/save-view-definition-loading))
    :message-success "Saved"}))

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

(reg-event-db
 ::normalize-constant-value
 (fn [db [_ path]]
   (let [real-path    (-> (into [:current-vd] path)
                          (uuid->idx db))
         constant-map (get-in db real-path)
         current-type (get-constant-type constant-map)]
     (assoc-in db real-path
               (-> constant-map
                   (dissoc current-type)
                   (assoc (keyword (:type constant-map))
                          (current-type   constant-map))
                   (dissoc :type))))))

(defn calc-real-path [db node]
  (-> (into [:current-vd] node)
      (uuid->idx db)))

(defn leafs-on-same-level? [path-from path-to]
  (= (pop path-from) (pop path-to)))

(defn nodes-on-same-level? [path-from path-to]
  (or
    ;; head
    (= (pop (pop path-from)) path-to)
    (and
      (= (count path-to) (count path-from))
      (= (pop (pop path-from)) (pop (pop path-to))))))

(defn dec-last-elem [v]
  (-> v pop
      (conj (dec (peek v)))))

(defn leaf-not-there-yet? [path-from path-to]
  (not= (dec (peek path-from))
        (peek path-to)))

(defn inserting-to-head? [path-to]
  (-> path-to peek keyword?))

(defn move-leaf [vd path-from path-to]
  (let [moving-leaf (get-in vd path-from)]
    (if (leafs-on-same-level? path-from path-to)
      (cond-> vd
        (leaf-not-there-yet? path-from path-to)
        (-> (remove-tree-element path-from)
            (insert-tree-element-after (dec-last-elem path-to) moving-leaf)))
      (if (inserting-to-head? path-to)
        (-> vd
            (remove-tree-element path-from)
            (insert-tree-element-at (conj path-to 0) moving-leaf))
        (-> vd
            (remove-tree-element path-from)
            (insert-tree-element-after path-to moving-leaf))))))

(defn dec-node-index [path]
  ;;[:select 1 :unionAll] -> [:select 0 :unionAll]
  (update path (dec (dec (count path))) dec))

(defn inserting-to-node-head? [path-from path-to]
  (-> path-from pop pop (= path-to)))

(defn move-node [vd path-from path-to]
  (let [moving-node (get-in vd (pop path-from))]
    (if (nodes-on-same-level? path-from path-to)
      (let [inserting-to-head? (inserting-to-node-head? path-from path-to)
            path-to* (if inserting-to-head?
                       (conj path-to 0)
                       (conj (dec-node-index path-to) 0))]
        (-> vd
            (remove-tree-element (pop path-from))
            (insert-tree-element-at
              path-to*
              moving-node)))
      (-> vd
          (insert-tree-element-at (conj path-to 0)
                                  moving-node)
          (remove-tree-element (pop path-from))))))

(defn move
  "Assuming, vd is normalized and decorated.
   Paths contain indexes: [:select 0 ...]"
  [vd path-from path-to]
    (if (number? (peek path-from))
      (move-leaf vd path-from path-to)
      (move-node vd path-from path-to)))

(defn move* [vd path-from path-to]
  (move vd (uuid->idx path-from vd) (uuid->idx path-to vd)))

(reg-event-db
  ::change-tree-elements-order
  (fn [db [_ from-node to-node]]
    (-> db (calc-real-path from-node) js/console.log)
    (-> db (calc-real-path to-node) js/console.log)
    (update db :current-vd move* from-node to-node)))

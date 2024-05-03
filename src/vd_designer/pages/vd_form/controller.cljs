(ns vd-designer.pages.vd-form.controller
  (:require
    [clojure.string :as str]
    [clojure.set :as set] 
    [shadow.resource :as rc]
    [medley.core :as medley]
    [re-frame.core :refer [reg-event-db reg-event-fx]]
    [vd-designer.http.fhir-server :as http.fhir-server]
    [vd-designer.pages.vd-form.fhir-schema :refer [get-constant-type
                                                   get-select-path]] 
    [vd-designer.utils.fhir-spec :as utils.fhir-spec]
    [vd-designer.pages.vd-form.form.normalization :refer [normalize-vd]]
    [vd-designer.pages.vd-form.form.uuid-decoration :refer [decorate
                                                            remove-decoration
                                                            uuid->idx]]
    [vd-designer.pages.vd-form.model :as m]
    [vd-designer.utils.event :refer [response->error]]
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
     (autocomplete/init)
     {:db (cond-> db
            :always
            (assoc ::m/language :language/yaml)

            (not vd-id)
            (set-view-definition-status)

            ;; TODO: rework
            :always
            (assoc :spec-map (utils.fhir-spec/spec-map (rc/inline "fhir_schema.ndjson"))))
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

(defn contains-blank-string? [element]
 (cond
    (string? element) (str/blank? element)
    (map? element) (some (fn [[_ v]] (contains-blank-string? v)) element)
    (vector? element) (some contains-blank-string? element)
    :else false))

(defn empty-inputs-in-vd? [vd]
  (contains-blank-string?
    #_"ignore non necessary fields if somehow they ended up to be blank strings"
    (select-keys vd [:constant :where :select :column :name :resource])))

(def required-fields #{:name :resource :select})

(defn missing-required-fields [vd]
  (set/difference required-fields (set (keys vd))))

(reg-event-fx
 ::eval-view-definition-data
 (fn [{:keys [db]} _]
   (let [view-definition (remove-decoration (:current-vd db))
         empty-fields? (empty-inputs-in-vd? view-definition)
         missing-required-fields (missing-required-fields view-definition)]
     (cond
       (seq missing-required-fields)
       {:db         (assoc db ::m/empty-inputs? true)
        :notification-error
        (let [fields (mapv name missing-required-fields)
              fields-str (str/join ", " fields)]
          (utils.string/format
            "Missing field%s: %s" (if (> (count fields) 1) "s" "") fields-str))}

       empty-fields?
       {:db         (assoc db ::m/empty-inputs? true)}

       :else
       {:db         (-> (assoc db ::m/eval-loading true)
                        (dissoc ::m/empty-inputs?))
        :http-xhrio (-> (http.fhir-server/aidbox-rpc db {:method 'sof/eval-view
                                                         :params {:limit 100
                                                                  :view  view-definition}})
                        (assoc :on-success [::on-eval-view-definition-success]
                               :on-failure [::on-eval-view-definition-error]))}))))

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
 (fn-traced [db [_ path value]]
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

(defn insert-tree-element-after [vd path element]
  (update-in vd (pop path) utils/insert-after (peek path) element))

(defn insert-tree-element-as-1st-child [vd path element]
  (update-in vd path utils/insert-at 0 element))

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

<<<<<<< HEAD
(defn leafs-on-same-level? [path-from path-to]
  (= (pop path-from) (pop path-to)))

(defn dec-last-elem [v]
  (-> v pop
      (conj (dec (peek v)))))

(defn leaf-insertion-to-head? [path-to]
  (-> path-to peek keyword?))

(defn move-leaf [vd path-from path-to]
  (let [moving-leaf (get-in vd path-from)
        insert (cond
                 (leafs-on-same-level? path-from path-to)
                 #(insert-tree-element-after % (dec-last-elem path-to) moving-leaf)

                 (leaf-insertion-to-head? path-to)
                 #(insert-tree-element-as-1st-child % path-to moving-leaf)

                 :else
                 #(insert-tree-element-after % path-to moving-leaf))]
    (-> vd
        (remove-tree-element path-from)
        (insert))))

(defn inserting-to-node-head? [moving-node-path path-to]
  (-> moving-node-path pop (= path-to)))

(defn adjust-indexes-of-path-to [path-from path-to]
  (let [path-from-root (-> path-from pop pop)]
    (if
      (<= (count path-to)
          (count path-from-root))
      path-to

      (let [node-index (-> path-from pop peek)
            destination-root (subvec path-to 0 (count path-from-root))
            destination-index (nth path-to (count path-from-root))]
        (if (and (= destination-root path-from-root)
                 (< node-index destination-index))
          (update path-to (count path-from-root) dec)
          path-to)))))

(defn move-node
  [vd path-from path-to drop-position]
  (let [moving-node-path (pop path-from)
        moving-node (get-in vd moving-node-path)
        path-to*
        (if (inserting-to-node-head? moving-node-path path-to)
          path-to
          (adjust-indexes-of-path-to path-from path-to))]

    (if (= 0 drop-position)
      (-> vd
          (remove-tree-element moving-node-path)
          (insert-tree-element-as-1st-child path-to* moving-node))
      (-> vd
          (remove-tree-element moving-node-path)
          (insert-tree-element-after (pop path-to*) moving-node)))))

(defn move
  "Assuming, vd is normalized and decorated.
   Paths contain indexes: [:select 0 ...]"
   ([vd path-from path-to]
    (move vd path-from path-to 0))
   ([vd path-from path-to drop-position]
    (if (number? (peek path-from))
      (move-leaf vd path-from path-to)
      (move-node vd path-from path-to drop-position))))

(defn move* [vd path-from path-to drop-position]
  (move vd (uuid->idx path-from vd) (uuid->idx path-to vd) drop-position))

(reg-event-db
  ::change-tree-elements-order
  (fn [db [_ from-node to-node drop-position]]
    (update db :current-vd move* from-node to-node drop-position)))

(reg-event-db
  ::change-draggable-node
  (fn [db [_ draggable]]
    (assoc db ::m/draggable-node draggable)))

(reg-event-db
 ::tree-sitter-load-success
 (fn [db [_ parser-instance]]
   (assoc db ::m/parser-instance parser-instance)))

(reg-event-fx
 ::tree-sitter-load-error
 (fn [{db :db} [_ error-msg]]
   {:notification-error error-msg}))

(defn cursor-diff [old-ctx new-ctx]
  {:startIndex (:selection-start old-ctx)
   :oldEndIndex (:selection-end old-ctx)
   :newEndIndex (:selection-end new-ctx)})

(defn autocomplete [parser spec-ctx old-ctx new-ctx]
  (if (not= (:id old-ctx) (:id new-ctx))
    (autocomplete/suggest spec-ctx parser nil new-ctx)
    (let [new-tree (autocomplete/edit (:tree old-ctx) (cursor-diff old-ctx new-ctx))]
      (autocomplete/suggest spec-ctx parser new-tree new-ctx))))

(defn cons-prev-text
  "Since round trip of input causes input lag,
   suggested values should already contain text before suggestion was selected"
  [prev-text options]
  (mapv (fn [option]
          (let [chars-to-cut (utils/tail-head-intersection
                               prev-text (:value option))]
            (update option :value #(->> (subs % chars-to-cut)
                                        (str prev-text)))))
        options))

(reg-event-fx
  ::update-autocomplete-text
  (fn [{{old-ctx    ::m/autocomplete-ctx
         parser     ::m/parser-instance
         current-vd :current-vd
         spec-map   :spec-map
         :as        db} :db}
       [_ {:keys [text] :as new-ctx}]]
    ;; call edit
    (let [new-ctx
          (assoc new-ctx :resource-type (:resource current-vd))

          {:keys [tree options]}
          (autocomplete parser {:spec-map spec-map} old-ctx new-ctx)]
      ;; (js/console.log (. ^Node (. tree -rootNode) toString))
      {:db (-> db
               (update ::m/autocomplete-ctx (assoc new-ctx :tree tree))
               (assoc ::m/autocomplete-options
                      (->> (into (:fields options)
                                 (:functions options))
                           (cons-prev-text text))))})))

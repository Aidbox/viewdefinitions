(ns vd-designer.pages.form.controller
  (:require [vd-designer.utils.tag-manager :as tag-manager]
            [ajax.core :as ajax]
            [clojure.set :as set :refer [rename-keys]]
            [clojure.string :as str]
            [clojure.walk :as walk]
            [medley.core :as medley]
            [re-frame.core :refer [dispatch reg-event-db reg-event-fx reg-fx]]
            [vd-designer.auth.controller :as auth]
            [vd-designer.http.backend :as backend]
            [vd-designer.http.fhir-server :as http.fhir-server]
            [vd-designer.pages.form.fhir-schema :as fhir-schema]
            [vd-designer.pages.form.fhirpath-autocomplete.antlr :as antlr]
            [vd-designer.pages.form.form.normalization :as normalization]
            [vd-designer.pages.form.form.uuid-decoration :as decoration]
            [vd-designer.pages.form.form.input-references :as input-references]
            [vd-designer.pages.form.model :as m]
            [vd-designer.pages.lists.settings.model :as settings-model]
            [vd-designer.utils.event :as u]
            [vd-designer.pages.lists.settings.controller]
            [vd-designer.utils.fhir-spec :as utils.fhir-spec]
            [vd-designer.utils.string :as utils.string]
            [vd-designer.utils.utils :as utils]
            [vd-designer.pages.form.view-definition-jsonschema :as vd-jsonschema]
            [vd-designer.utils.yaml :as yaml]))

#_"status is required"
(defn set-view-definition-status [db]
  (let [vd (:current-vd db)]
    (if (not (:status vd))
      (assoc-in db [:current-vd :status] "unknown")
      db)))

(defn ready-server-event-fx [vd-id]
  (cond-> [[:dispatch [::get-supported-resource-types]]]
    vd-id (conj [:dispatch [::get-view-definition vd-id]])))



(reg-event-fx
 ::start
 (fn [{db :db} [_ parameters]]
   (let [vd-id     (-> parameters :path  :id)
         imported? (-> parameters :query :imported)]
     {:db (cond-> db
            :always
            (assoc ::m/language :language/yaml
                   ::m/resource-language :language/yaml)

            (not vd-id)
            (set-view-definition-status)

            :always
            (assoc :spec-map {})

            :always
            (assoc ::m/resource-value {:value {}})

            :always
            (assoc ::m/code-validation-severity 0)

            :always
            (assoc ::m/left-panel-active-tab "form")

            :always
            (assoc ::m/view-definition-jsonschema
                   {:uri "/viewdefinition_jsonschema.json"
                    :fileMatch ["*"]
                    :schema vd-jsonschema/schema}))
      :fx (cond-> (if (-> db :cfg/fhir-servers  empty?)
                    [[:dispatch [::fetch-user-servers vd-id]]]
                    (ready-server-event-fx vd-id))

            imported?
            (conj [:dispatch [::process-import]])

            :always
            (conj [:dispatch [::load-fhir-schemas]]))})))

(reg-event-fx
 ::fetch-user-servers
 (fn [_ [_ vd-id]]
   {:dispatch [::auth/with-authentication
               (fn [authentication-token]
                 (-> (backend/request:list-server authentication-token)
                     (assoc :on-success [::got-server-list vd-id])))]}))

(reg-event-fx
 ::got-server-list
  ;; TODO: decide what if expected server is not in the list?
 (fn [{:keys [db]} [_ vd-id user-server-list]]
    ;; TODO: remove code duplication
   {:db (->> user-server-list
             (group-by :server-name)
             (medley/map-vals first)
             (assoc-in db [:cfg/fhir-servers ]))
    :fx (ready-server-event-fx vd-id)}))

(reg-event-fx
 ::stop
 (fn [{db :db} [_]]
   {:db (dissoc db :current-vd ::m/resource-data ::m/language)}))

(reg-event-fx
 ::load-fhir-schemas
 (fn [_ _]
   {:http-xhrio {:uri "/fhir_schemas.json"
                 :timeout 8000
                 :format (ajax/json-request-format)
                 :response-format  (ajax/json-response-format {:keywords? true})
                 :on-success [::load-fhir-schemas-success]
                 :on-failure [::load-fhir-schemas-error]}}))

(reg-event-db
 ::load-fhir-schemas-success
 (fn [db [_ schemas]]
   (assoc db :spec-map (clj->js (utils.fhir-spec/spec-map schemas)))))

(reg-event-fx
 ::load-fhir-schemas-error
 (fn [_ _]
   {:notification-error "Error on downloading fhir schemas!"}))

(reg-event-fx
 ::get-supported-resource-types
 (fn [{:keys [db]} [_]]
   {:db         (assoc db :loading true)
    :http-xhrio (-> (http.fhir-server/get-metadata (http.fhir-server/active-server db))
                    (assoc :on-success [::get-supported-resource-types-success])
                    (assoc :on-failure [::on-vd-error]))}))

(def skip-resources
  #{"DisabledIndex"
    "SubsSubscription"
    "AzureContainer"
    "LoaderFile"
    "AidboxSubscription"
    "AidboxQuery"
    "AuditMessage"
    "App"
    "AidboxConfig"
    "AlphaSDC"
    "SearchParameter"
    "Hl7v2Config"
    "CodeSystem"
    "GcpServiceAccount"
    "TerminologyBundleFile"
    "Concept"
    "AidboxJobStatus"
    "Module"
    "Hl7v2Message"
    "Operation"
    "User"
    "FtrConfig"
    "BulkExportStatus"
    "TokenIntrospector"
    "SDCWorkflowVersion"
    "Attribute"
    "AccessPolicy"
    "AuthConfig"
    "SDCAddendum"
    "ConceptMap"
    "AidboxTask"
    "SDCDocument"
    "Role"
    "Grant"
    "ui_snippet"
    "ViewDefinition"
    "AidboxWorkflow"
    "SearchQuery"
    "Mapping"
    "AidboxTaskLog"
    "AidboxArchive"
    "PGSequence"
    "Lambda"
    "SDCFormMetadata"
    "SubsNotification"
    "AzureAccount"
    "IndexCreationJob"
    "SchedulerRuleStatus"
    "FlatImportStatus"
    "SeedImport"
    "ConceptMapRule"
    "SDCWorkflow"
    "Entity"
    "NotificationTemplate"
    "WebPushSubscription"
    "Registration"
    "AwsAccount"
    "AidboxProfile"
    "QuestionnaireTheme"
    "BatchValidationRun"
    "AidboxMigration"
    "AidboxJob"
    "Notification"
    "IdentityProvider"
    "ui_history"
    "Session"
    "BulkImportStatus"
    "SDCFormVersion"
    "Notebook"
    "Search"
    "Scope"
    "DebugSchema"
    "Client"
    "BatchValidationError"})

(reg-event-db
 ::get-supported-resource-types-success
 (fn [db [_ resp-body]]
   (let [resources (->> resp-body :rest (mapcat :resource) (mapv :type) set)]
     (assoc db :resources (set/difference resources skip-resources)))))

(reg-event-fx
 ::get-view-definition
 (fn [{:keys [db]} [_ vd-id]]
   {:db         (assoc db :loading true)

    :dispatch   [::auth/with-authentication
                 (fn [authentication-token]
                   (-> (http.fhir-server/get-view-definition-user-server
                        authentication-token
                        (http.fhir-server/active-server db) vd-id)
                       (assoc :on-success [::choose-vd]
                              :on-failure [::on-vd-error])))]}))

(reg-event-fx
 ::process-import
 (fn [{:keys [db]} [_]]
   {:db       (assoc db :loading true)
    :dispatch [::choose-vd (:current-vd db)]}))

(declare collect-all-node-paths*)

(defn concat-paths [path v]
  (->> (collect-all-node-paths* v)
       (remove empty?)
       (mapv #(into [path] %))))

(defn collect-all-node-paths* [vd]
  (cond (map? vd)
        (mapcat
         (fn [[k v]]
           (cond
             (or (= k :forEach)
                 (= k :forEachOrNull))
             (concat-paths :select (:select vd))

             (= k :column)
             [[:column]]

             (or (= k :select)
                 (= k :unionAll))
             (into
              [[k]]
              (concat-paths k v))

             :else []))
         vd)

        (vector? vd)
        (mapcat
         (fn [item]
           (let [k (:tree/key item)]
             (into
              [[k]]
              (concat-paths k item))))
         vd)))

(defn collect-all-node-paths [vd]
  (into #{} (collect-all-node-paths* vd)))

(reg-event-fx
 ::choose-vd
 (fn [{:keys [db]} [_ view]]
   (let [[view-definition refs] (-> view
                                    (update :select normalization/normalize-vd)
                                    (decoration/decorate)
                                    (input-references/replace-inputs-with-references))]
     {:fx [[:dispatch [::reset-vd-error]]
           [:dispatch [::eval-view-definition-data]]
           [:dispatch [::update-tree-expanded-nodes
                       (-> m/tree-root-keys
                           (into (collect-all-node-paths view-definition))
                           (set/difference m/do-not-expand-tree-keys))]]
           [:dispatch [::load-resource (:resource view-definition)]]]
      :db (-> db
              (assoc :current-vd view-definition :loading false)
              (assoc ::m/tree-inputs refs))})))

(reg-event-db
 ::set-resource-loading
 (fn [db [_ value]]
   (assoc db ::m/resource-loading? value)))

(reg-event-fx
 ::load-resource
 (fn [{:keys [db]} [_ resource-type]]
   (let [search-request (get db ::m/resource-search-request)]
     {:fx [[:dispatch [::set-resource-loading true]]
           [:dispatch [::auth/with-authentication
                       (fn [authentication-token]
                         (assoc (http.fhir-server/get-resource authentication-token
                                                               (http.fhir-server/active-server db)
                                                               resource-type
                                                               search-request)
                                :on-success [::get-resource-success]
                                :on-failure [::get-resource-failure]))]]]})))

(reg-event-fx
 ::get-resource-success
 (fn [{:keys [db]} [_ resource-value]]
   {:db (assoc db ::m/resource-value {:value resource-value})
    :dispatch [::set-resource-loading false]}))

(reg-event-fx
 ::get-resource-failure
 (fn [{:keys [db]} [_ resource-value]]
   (let [error-msg (-> resource-value :response (get "error"))]
     {:db (assoc db ::m/resource-value {:error error-msg})
      :dispatch [::set-resource-loading false]
      :notification-error error-msg})))

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

(defn strip-empty-select-nodes [vd]
  (update
   vd
   :select
   (fn [select]
     (let [blank? #(and (%1 %2) (str/blank? (%1 %2)))]
       (walk/postwalk
        (fn [f]
          (cond
            (map? f)
            (if (or (blank? :forEach f)
                    (blank? :forEachOrNull f)
                    (blank? :name f)
                    (blank? :path f))
              nil
              f)

            (map-entry? f)
            f

            (vector? f)
            (filterv identity f)

            :else f))
        select)))))

(defn strip-empty-where-nodes [vd]
  (let [blank? #(and (%1 %2) (str/blank? (%1 %2)))
        vd (update vd :where (fn [where] (remove #(blank? :path %) where)))]
    (if (seq (:where vd))
      vd
      (dissoc vd :where))))

(defn strip-empty-collections [vd]
  (medley/remove-kv
   (fn [k v]
     (and (not (= k :select))
          (coll? v)
          (empty? v)))
   vd))

;; remove when #4390 is resolves
(defn remove-meta [vd]
  (dissoc vd :meta))

(defn lower-case-resource-in-sandbox [vd sandbox?]
  (if (and sandbox? (:resource vd))
    (update vd :resource str/lower-case)
    vd))

(reg-event-fx
 ::eval-view-definition-data
 (fn [{:keys [db]} _]
   (if (= (::m/left-panel-active-tab db) :left-panel-tab/code)
     {:dispatch [::eval-view-definition-code]}
     {:dispatch [::eval-view-definition-tree]})))

(reg-event-fx
 ::eval-view-definition-tree
 (fn [{:keys [db]} _]
   (tag-manager/data-layer
    {:dataLayer {:event         "vd_run"
                 :resource-type (get (:current-vd db) :resource "")}})
   (let [view-definition (-> (:current-vd db)
                             decoration/remove-decoration
                             (input-references/replace-inputs-with-values (::m/tree-inputs db))
                             strip-empty-collections
                             remove-meta
                             strip-empty-select-nodes
                             strip-empty-where-nodes)
         missing-required-fields (missing-required-fields view-definition)]
     (cond
       (seq missing-required-fields)
       {:db         (assoc db ::m/empty-inputs? true)
        :notification-error
        (let [fields (mapv name missing-required-fields)
              fields-str (str/join ", " fields)]
          (utils.string/format
           "Missing field%s: %s" (if (> (count fields) 1) "s" "") fields-str))}

       :else
       {:db         (-> (assoc db ::m/eval-loading true)
                        (dissoc ::m/empty-inputs?))

        :dispatch   [::auth/with-authentication
                     (fn [authentication-token]
                       (-> (http.fhir-server/eval-view-definition-user-server
                            authentication-token
                            (http.fhir-server/active-server db)
                            view-definition)
                           (assoc :on-success [::on-eval-view-definition-success]
                                  :on-failure [::on-eval-view-definition-error])))]}))))

(reg-event-fx
 ::eval-view-definition-code
 (fn [{:keys [db]} _]
   (tag-manager/data-layer
    {:dataLayer {:event         "vd_run"
                 :resource-type (get (:current-vd db) :resource "")}})
   (let [sandbox? (settings-model/in-sandbox? db)
         view-definition (-> (::m/view-definition-code db)
                             yaml/try-parse
                             (js->clj :keywordize-keys true)
                             strip-empty-select-nodes
                             strip-empty-where-nodes)
         missing-required-fields (missing-required-fields view-definition)]
     (cond
       (seq missing-required-fields)
       {:notification-error
        (let [fields (mapv name missing-required-fields)
              fields-str (str/join ", " fields)]
          (utils.string/format
           "Missing field%s: %s" (if (> (count fields) 1) "s" "") fields-str))}

       :else
       {:db         (assoc db ::m/eval-loading true)

        :dispatch   [::auth/with-authentication
                     (fn [authentication-token]
                       (-> (http.fhir-server/eval-view-definition-user-server
                            authentication-token
                            (http.fhir-server/active-server db)
                            view-definition)
                           (assoc :on-success [::on-eval-view-definition-success]
                                  :on-failure [::on-eval-view-definition-error])))]}))))

(reg-event-db
 ::reset-vd-error
 (fn [db [_]]
   (dissoc db ::m/current-vd-error)))

(reg-event-db
 ::on-vd-error
 (fn [db [_ result]]
   (assoc db ::m/current-vd-error (u/response->error result))))

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
    :notification-error (str "Error on run: " (u/response->error result))}))

(reg-event-db
 ::change-input-value
 (fn [db [_ path value]]
   (let [real-path (decoration/uuid->idx path (:current-vd db))]
     (assoc-in db (into [:current-vd] real-path) value))))

(def empty-coll?
  (every-pred coll? empty?))

(defn merge-and-strip [m1 m2]
  (->> (medley/deep-merge m1 m2)
       (medley/remove-vals (some-fn str/blank? empty-coll?))))

(reg-event-db
 ::change-input-value-merge
 (fn [db [_ path value]]
   (let [real-path (decoration/uuid->idx path (:current-vd db))]
     (update-in db
                (into [:current-vd] real-path)
                merge-and-strip value))))

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

(reg-event-db
 ::set-input-focus
 (fn [db [_ node-id]]
   (assoc db ::m/input-focus node-id)))

(defn get-node-default-value
  "Adds new node into current-vd with inputs uuids,
   creates new tree-inputs with uuids.
   Returns node with tree/key and input keys with uuids
   and vector with new tree-inputs."
  [kind]
  (case kind
    :column
    (let [[name-ref name-input] (input-references/create-reference)
          [path-ref path-input] (input-references/create-reference :fhirpath)]
      [(decoration/decorate {:column  [{:name name-ref :path path-ref}]})
       {name-ref name-input path-ref path-input}
       path-ref])
    :forEach
    (let [[ref input] (input-references/create-reference)]
      [(decoration/decorate {:forEach ref :select []})
       {ref input}
       ref])
    :forEachOrNull
    (let [[ref input] (input-references/create-reference)]
      [(decoration/decorate {:forEachOrNull ref :select []})
       {ref input}
       ref])
    :unionAll
    [(decoration/decorate {:unionAll []})
     {}
     nil]))

(reg-event-fx
 ::add-tree-node
 (fn [{:keys [db]} [_ path kind]]
   (let [[node-value new-inputs autofocus-ref] (get-node-default-value kind)]
     {:db (let [real-path (decoration/uuid->idx path (:current-vd db))]
            (-> db
                (update-in
                 (into [:current-vd] real-path)
                 (fnil conj []) node-value)
                (update ::m/tree-inputs merge new-inputs)))
      :fx [[:dispatch-later
            [{:ms       100
              :dispatch [::update-tree-expanded-nodes
                         (into
                          (:current-tree-expanded-nodes db)
                          (conj
                           (mapv
                            (fn [[k _]]
                              (conj path (:tree/key node-value) k))
                            node-value)
                           (conj path (:tree/key node-value))))]}]]
           [:dispatch [::set-input-focus autofocus-ref]]]})))

(defn get-leaf-default-value [kind]
  (case kind
    :constant
    (let [[name-ref name-input] (input-references/create-reference)
          [value-ref value-input] (input-references/create-reference)]
      [(decoration/decorate {:name name-ref :valueString value-ref})
       {name-ref name-input value-ref value-input}
       name-ref])
    :where
    (let [[path-ref path-input] (input-references/create-where-reference)]
      [(decoration/decorate {:path path-ref})
       {path-ref path-input}
       path-ref])
    :column
    (let [[name-ref name-input] (input-references/create-reference)
          [path-ref path-input] (input-references/create-reference :fhirpath)]
      [(decoration/decorate {:name name-ref :path path-ref})
       {name-ref name-input path-ref path-input}
       path-ref])))

(reg-event-fx
 ::add-tree-leaf
 (fn [{:keys [db]} [_ path kind]]
   (let [[node-value new-inputs focus-ref] (get-leaf-default-value kind)]
     {:db (let [real-path (decoration/uuid->idx path (:current-vd db))]
            (-> db
                (update-in
                 (into [:current-vd] real-path)
                 (fnil conj []) node-value)
                (update ::m/tree-inputs merge new-inputs)))
      :fx [[:dispatch [::set-input-focus focus-ref]]]})))

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

(reg-event-db
 ::convert-foreach
 (fn [db [_ path from to]]
   (let [real-path (into [:current-vd] (decoration/uuid->idx path (:current-vd db)))]
     (update-in db real-path rename-keys {from to}))))

(reg-event-fx
 ::delete-tree-element
 (fn [{:keys [db]} [_ path]]
   {:fx [[:dispatch [::update-tree-expanded-nodes
                     (->> (:current-tree-expanded-nodes db)
                          (remove #(utils/vector-starts-with % path)))]]]
    :db (let [real-path (decoration/uuid->idx path (:current-vd db))]
          (update db :current-vd remove-tree-element real-path))}))

(reg-event-fx
 ::save-view-definition
 (fn [{:keys [db]} [_]]
   (tag-manager/data-layer
    {:dataLayer {:event         "vd_save"
                 :resource-type (get (:current-vd db) :resource "")}})
   (let [refs (::m/tree-inputs db)
         view-definition (-> (:current-vd db)
                             decoration/remove-decoration
                             (input-references/replace-inputs-with-values refs)
                             strip-empty-collections
                             remove-meta)
         empty-fields? (empty-inputs-in-vd? view-definition)]
     (if empty-fields?
       {:db (assoc db ::m/empty-inputs? true)}
       {:db (-> db
                (assoc ::m/save-view-definition-loading true
                       ::m/save-loading true)
                (dissoc ::m/empty-inputs?))

        :dispatch [::auth/with-authentication
                   (fn [authentication-token]
                     (assoc (cond->
                             (http.fhir-server/post-view-definition
                              authentication-token
                              (http.fhir-server/active-server db)
                              view-definition)
                              (:id view-definition)
                              (assoc-in [:params :vd-id] (:id view-definition)))
                            :on-success [::save-view-definition-success]
                            :on-failure [::save-view-definition-failure]))]}))))

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
    :notification-error (str "Error on save: " (u/response->error result))}))

(defn format-code [code lang]
  (case lang
    :language/yaml (yaml/edn->yaml code)
    :language/json (-> code clj->js (js/JSON.stringify nil 2))
    ""))

(defn format-vd-code [code lang]
  (case lang
    :language/yaml (-> code js/JSON.parse yaml/stringify)
    :language/json (-> code yaml/str->yaml (js/JSON.stringify nil 2))
    ""))

(reg-event-db
 ::change-language
 (fn [db [_ lang]]
   (assoc db
          ::m/language lang
          ::m/editor-id (random-uuid)
          ::m/view-definition-code
          (format-vd-code (::m/view-definition-code db) lang))))

(reg-event-db
 ::change-resource-language
 (fn [db [_ lang]]
   (assoc db ::m/resource-language lang)))

(reg-event-fx
 ::toggle-settings-opened-id
 (fn [{:keys [db]} [_ settings-opened-id]]
   {:db
    (if (= settings-opened-id (::m/settings-opened-id db))
      (assoc db ::m/settings-opened-id nil)
      (assoc db ::m/settings-opened-id settings-opened-id))}))

(defn cast-value [constant-type v]
  (case constant-type
    :valueBoolean
    (not (or (= "false" v)
             (str/blank? v)))

    (:valueInteger :valueInteger64)
    (js/parseInt v)

    :valueDecimal
    (js/parseFloat v)

    (:valuePositiveInt :valueUnsignedInt)
    (-> v js/parseInt abs)

    (str v)))

(defn- constant-type->input-type [constant-type]
  (case constant-type
    (:valueDecimal
     :valueInteger
     :valueInteger64
     :valuePositiveInt
     :valueUnsignedInt) :number

    :valueBoolean       :boolean
    :text))

(reg-event-db
 ::normalize-constant-value
 (fn [db [_ path]]
   (let [real-path    (-> (into [:current-vd] path)
                          (decoration/uuid->idx db))
         constant-map (get-in db real-path)
         current-type (fhir-schema/get-constant-type constant-map)
         new-type (keyword (:type constant-map))
         current-ref (get constant-map current-type)
         current-value (-> db ::m/tree-inputs (get current-ref) :value)
         new-value (cast-value new-type current-value)
         input-type (constant-type->input-type new-type)]
     (-> db
         (assoc-in real-path
                   (-> constant-map
                       (dissoc current-type)
                       (assoc new-type current-ref)
                       (dissoc :type)))
         (assoc-in [::m/tree-inputs current-ref :type]
                   input-type)
         (assoc-in [::m/tree-inputs current-ref :value]
                   new-value)))))

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
  (move vd (decoration/uuid->idx path-from vd) (decoration/uuid->idx path-to vd) drop-position))

(reg-event-db
 ::change-tree-elements-order
 (fn [db [_ from-node to-node drop-position]]
   (update db :current-vd move* from-node to-node drop-position)))

(defn convert-constants [constant]
  (when-let [type-fhir (fhir-schema/get-constant-type constant)] ; valueString
    (let [type (subs (name type-fhir) 5) ;String
          type (str (str/lower-case (subs type 0 1)) (subs type 1)) ; string
          value (type-fhir constant)
          casted-value (cast-value type-fhir value)]
      {:name (:name constant)
       :type type
       :value casted-value})))

(reg-event-db
 ::update-autocomplete-options
 (fn [db [_ data]]
   (assoc db ::m/autocomplete-options data)))

(reg-fx
 ::call-autocomplete
 (fn [[args autocomplete-options]]
   (-> (js/Promise.resolve
        (antlr/complete args))
       (.then #(dispatch [::update-autocomplete-options
                          {:options %
                           :ref (:ref autocomplete-options)
                           :request autocomplete-options}]))
       (.catch #(js/console.error %)))))

(reg-event-fx
 ::update-autocomplete-text
 (fn [{{spec-map   :spec-map
        current-vd :current-vd} :db}
      [_ {:keys [text cursor-start _cursor-end fhirpath-prefix] :as new-ctx}]]
   {::call-autocomplete [{:type (:resource current-vd)
                          :fhirSchemas spec-map
                          :forEachExpressions fhirpath-prefix
                          :externalConstants (mapv convert-constants (:constant current-vd))
                          :fhirpath text
                          :cursor cursor-start}
                         (assoc new-ctx :resource-type (:resource current-vd))]}))

(reg-event-db
 ::set-input-text
 (fn [db [_ input-id value]]
   (assoc-in db [::m/tree-inputs input-id :value] value)))

(reg-event-db
 ::update-input-text
 (fn [db [_ input-id f]]
   (update-in db [::m/tree-inputs input-id :value] f)))

(reg-event-fx
 ::on-form-tab-clicked
 (fn [{:keys [db]} _]
   (let [new-db (assoc db ::m/left-panel-active-tab :left-panel-tab/form)]
     (when (not= (::m/left-panel-active-tab db) :left-panel-tab/form)
       (if (::m/code-dirty? db)
         (try
           (let [vd (-> (::m/view-definition-code db)
                        (yaml/yaml->edn)
                        (js->clj :keywordize-keys true))]
             {:fx [[:dispatch [::choose-vd vd]]]
              :db (assoc new-db ::m/code-dirty? false)})
           (catch js/Error e
             {:db new-db
              :notification-error (.-message e)}))
         {:db new-db})))))

(reg-event-db
 ::on-code-tab-clicked
 (fn [db _]
   (when (not= (::m/left-panel-active-tab db) :left-panel-tab/code)
     (let [language (::m/language db)]
       (-> db
           (assoc ::m/left-panel-active-tab :left-panel-tab/code)
           (assoc ::m/editor-id (str (random-uuid)))
           (assoc ::m/view-definition-code
                  (-> (:current-vd db)
                      decoration/remove-decoration
                      (input-references/replace-inputs-with-values (::m/tree-inputs db))
                      (format-code language))))))))

(reg-event-db
 ::on-sql-tab-clicked
 (fn [db _]
   (assoc db ::m/left-panel-active-tab :left-panel-tab/sql)))

(reg-event-db
 ::set-code-dirty
 (fn [db [_ value]]
   (assoc db ::m/code-dirty? value)))

(reg-event-db
 ::set-view-definition-code
 (fn [db [_ value]]
   (assoc db ::m/view-definition-code value)))

(reg-event-db
 ::set-code-validation-severity
 (fn [db [_ severity]]
   (assoc db ::m/code-validation-severity severity)))

(reg-event-db
 ::set-table-panel-size
 (fn [db [_ size]]
   (assoc db ::m/table-panel-size size)))

(reg-event-fx
 ::search-resource
 (fn [{:keys [db]} [_]]
   (let [resource-type (get-in db [:current-vd :resource])
         search-request (get db ::m/resource-search-request)]
     (when-not (str/blank? resource-type)
       {:fx [[:dispatch [::set-resource-loading true]]
             [:dispatch [::auth/with-authentication
                         (fn [authentication-token]
                           (assoc (http.fhir-server/get-resource authentication-token
                                                                 (http.fhir-server/active-server db)
                                                                 resource-type
                                                                 search-request)
                                  :on-success [::get-resource-success]
                                  :on-failure [::get-resource-failure]))]]]}))))

(reg-event-db
 ::set-resource-search-request
 (fn [db [_ request]]
   (assoc db ::m/resource-search-request request)))

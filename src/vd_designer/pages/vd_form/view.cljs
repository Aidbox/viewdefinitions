(ns vd-designer.pages.vd-form.view
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Col Row]]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.components.button :as button]
            [vd-designer.components.collapse :refer [collapse collapse-item]]
            [vd-designer.components.dropdown :refer [dropdown dropdown-item]]
            [vd-designer.components.input :as input]
            [vd-designer.components.monaco-editor :as monaco]
            [vd-designer.components.select :refer [select]]
            [vd-designer.components.table :refer [table]]
            [vd-designer.components.tabs :refer [tab-item tabs]]
            [vd-designer.components.tag :as tag]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.routes :as routes]
            [vd-designer.utils.event :as u]
            [vd-designer.utils.react :refer [create-react-image
                                             js-obj->clj-map]]
            [vd-designer.utils.yaml :as yaml]))

(def vd-spec
  {"url" "http://fhir.aidbox.app/fhir/StructureDefinition/ViewDefinition|1.0.0",
   "datatype" "ViewDefinition",
   "elements" {"resource" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                           "datatype" "string"},
               "url" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                      "datatype" "string"},
               "experimental" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/boolean|1.0.0",
                               "datatype" "boolean"},
               "constant" {"array" true,
                           "elements" {"name" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                                               "datatype" "string"},
                                       "value" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                                                "datatype" "string"}},
                           "required" ["name" "value"]},
               "where" {"array" true,
                        "elements" {"path" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                                            "datatype" "string"},
                                    "description" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                                                   "datatype" "string"}},
                        "required" ["path"]},
               "id" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                     "datatype" "string"},
               "name" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                       "datatype" "string"},
               "extension" {"array" true, "isOpen" true},
               "select" {"array" true,
                         "elements" {"forEachOrNull" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                                                      "datatype" "string"},
                                     "forEach" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                                                "datatype" "string"},

                                     "unionAll" {"array" true
                                                 "elementReference" ["http://fhir.aidbox.app/fhir/StructureDefinition/ViewDefinition|1.0.0"
                                                                     "elements"
                                                                     "select"]},
                                     "column" {"array" true
                                               "elements" {"name" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                                                                   "datatype" "string"}
                                                           "hello" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                                                                    "datatype" "string"}
                                                           "path" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                                                                   "datatype" "string"}}},
                                     "select" {"elementReference" ["http://fhir.aidbox.app/fhir/StructureDefinition/ViewDefinition|1.0.0"
                                                                   "elements"
                                                                   "select"]}},
                         "constraints" {"exclusive-104" {"expression" "(%context.path| %context.forEach).count() <= 1",
                                                         "severity" "error"}}},
               "status" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                         "datatype" "string",
                         "constraints" {"enum-103" {"expression" "%context.subsetOf('draft' | 'active' | 'retired' | 'unknown')",
                                                    "severity" "error"}}},
               "identifier" {"isOpen" true},
               "title" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                        "datatype" "string"},
               "copyright" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                            "datatype" "string"},
               "publisher" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                            "datatype" "string"},
               "version" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                          "datatype" "string"},
               "meta" {"isOpen" true},
               "date" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/dateTime|1.0.0",
                       "datatype" "dateTime"},
               "useContext" {"array" true, "isOpen" true},
               "resourceType" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                               "datatype" "string"},
               "contact" {"array" true, "isOpen" true},
               "description" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                              "datatype" "string"}},
   "required" ["select" "status" "resource"]})


(defn resolve-reference [{spec-map :spec-map} spec]
  (if-let [ref (get spec "elementReference")]
    (get-in spec-map ref)
    spec))

(defn resolve-path [ctx & next-steps]
  (resolve-reference
   ctx
   (reduce
    (fn [spec step]
      (if-let [next-spec (get spec step)]
        next-spec
        (some-> (resolve-reference ctx spec)
                (get step))))
    (:spec ctx)
    (into (:spec-path ctx) next-steps))))

(defn spec-map? [ctx next-step]
  (resolve-path ctx next-step "elements"))

(defn spec->elements [ctx]
  (resolve-path ctx "elements"))

(defn spec-field? [ctx next-step]
  (resolve-path ctx next-step "datatype"))

(defn spec-array? [ctx next-step]
  (resolve-path ctx next-step "array"))

(defn add-spec-path [ctx k]
  (update ctx :spec-path conj k))

(def dropdown-items
  {:column (dropdown-item "column" "/img/form/column.svg")
   :forEach (dropdown-item "forEach" "/img/form/forEach.svg")
   :forEachOrNull (dropdown-item "forEachOrNull" "/img/form/forEach.svg")
   :unionAll (dropdown-item "unionAll" "/img/form/unionAll.svg")})

(defn new-select
  "Dropdown with actions for new select"
  [& {:keys [items on-select] :as opts}]
  (let [items-to-render (->> items
                             (mapv #(get dropdown-items %
                                         (dropdown-item % "/img/form/column.svg")))
                             (interpose {:type "divider"})
                             vec)]
    (dropdown "select"
              :menu {:items items-to-render
                     :onClick on-select}
              opts)))

(declare render-block)

(defn select-field-render [name]
  (case name
    :forEach [tag/foreach]
    :forEachOrNull [tag/foreach]

    [:> Row
     (create-react-image "/img/form/column.svg")
     [:span name]]))



(defn render-field [ctx name value]
  [:div {:class "vd-form-row"
         :style {:padding-left "12px"
                 #_#_:border-top "1px solid #E4E4E4"
                 :padding-top "4px"
                 :padding-bottom "4px"}}
   [:> Row {:align "middle"
            :justify "space-between"}
    [select-field-render name]
    [:> Row {:align "middle"}
     [input/fhir-path {:on-change
                       #(dispatch [::c/change-input-value
                                   (conj (:value-path ctx) name)
                                   (u/target-value %)])
                       :value value}]
     [button/delete {:onClick #(dispatch [::c/delete-node (conj (:value-path ctx) name)])}]]]])

(defn key->tag [key]
  (get {:select [tag/select]
        :column [tag/column]
        :unionAll [tag/union-all]}
       key
       [tag/default key]))

(defn add-value-path [ctx k]
  (update ctx :value-path conj k))

(defn render-map [ctx map-key map-value]
  [:div {:style {:padding-left "12px"}}
   [collapse
    {:items
     [(collapse-item
       [:> Row {:justify "space-between"
                :align "middle"
                :class "vd-form-row"
                :style {:padding-top "4px"
                        :padding-bottom "4px"
                        #_#_:border-top "1px solid #E4E4E4"}}
        [:> Row {:align "middle"}
         (key->tag map-key)
         (let [elements (filter #(not (get map-value %))
                                (map keyword (keys (spec->elements ctx))))]
           (when (seq elements)
             (new-select {:items (map keyword elements)
                          :on-select (fn [e]
                                       (let [k (:key (js-obj->clj-map e))
                                             elements (resolve-path ctx "elements" k)
                                             default-value (cond
                                                             (get elements "array") [{}]
                                                             (get elements "elements") {}
                                                             :else "")]
                                         (dispatch [::c/add-element-into-map (:value-path ctx) (keyword k) default-value])))})))]
        [button/delete {:onClick #(dispatch [::c/delete-node (:value-path ctx)])}]]
       [:<>
        (for [[k v] map-value]
          ^{:key (conj (:spec-path ctx) k)}
          [render-block (add-spec-path ctx "elements") k v])])]}]])

(defn render-array [ctx k value]
  [:div {:style {:padding-left "12px"}}
   [:div {:style {:padding-top "4px"
                  :padding-bottom "4px"
                  #_#_:border-top "1px solid #E4E4E4"}}
    [:> Row {:justify "space-between"
             :align "middle"}
     (key->tag k)
     (when-not (= [:select] (:value-path ctx))
       [button/delete {:onClick #(dispatch [::c/delete-node (:value-path ctx)])}])]
    (map-indexed
     (fn [idx element]
       ^{:key (conj (:value-path ctx) idx)}
       [render-map (add-value-path ctx idx) "ITEM" element])
     value)
    [button/add (name k)
     {:onClick #(dispatch [::c/add-element-into-array (:value-path ctx)])}]]])

(defn render-block [ctx k v]
  (cond
    (spec-array? ctx (name k))
    [render-array (-> ctx
                      (add-spec-path (name k))
                      (add-value-path (keyword k))) k v]

    (spec-map? ctx (name k))
    [render-map (-> ctx
                    (add-spec-path (name k))
                    (add-value-path (keyword k))) k v]

    (spec-field? ctx (name k))
    [render-field (add-spec-path ctx (name k)) k v]

    :else
    [:div "not found"]))

(defn create-render-context []
  {:spec-path ["elements"]
   :spec vd-spec
   :spec-map (hash-map (get vd-spec "url") vd-spec)
   :value-path []})

(defn vd-row [col1 col2]
  [:> Row {:align "middle" :class "vd-form-row"}
   [:> Col {:span 8} col1]
   [:> Col {:span 16} col2]])

(defn form []
  (let [vd-form @(subscribe [::m/current-vd])
        ctx (create-render-context)]
    [:div
     [vd-row
      [tag/default "name"]
      [input/col-name {:value       (:name vd-form)
                       :placeholder "ViewDefinition1"
                       :onChange    (fn [e] (dispatch [::c/change-vd-name (u/target-value e)]))}]]

     [vd-row
      [tag/resource]
      [select :placeholder "Resource type"
       :options @(subscribe [::m/get-all-supported-resources])
       :value (:resource vd-form)
       :onSelect #(dispatch [::c/change-vd-resource %])]]

     [collapse
      :items [(collapse-item [tag/constant] [render-block ctx "constant" (:constant vd-form)])]]

     [collapse
      :items [(collapse-item [tag/where]    [render-block ctx "where" (:where vd-form)])]]

     [collapse
      :items [(collapse-item [tag/select]   [render-block ctx "select" (:select vd-form)])]]]))

(defn editor []
  (let [current-vd @(subscribe [::m/current-vd])]
    [:div
     {:style {:height "600px" :width "100%"}}
     [monaco/monaco {:id "vd-yaml"
                     :value (yaml/edn->yaml current-vd)
                     :schemas []
                     #_#_:onChange (fn [value & _] (dispatch [::c/set-schema value]))
                     #_#_:onValidate (fn [markers] (dispatch [::c/set-monaco-markers (js->clj markers)]))}]]))

(defn viewdefinition-view []
  (let [resources @(subscribe [::m/view-definition-data])]
    [:> Row {:gutter 32}
     [:> Col {:span 12}
      [button/button "Run" {:onClick #(dispatch [::c/eval-view-definition-data])}]
      [tabs {:items [(tab-item {:key      "form"
                                :label    "Form"
                                :children [form]
                                :icon     (r/create-element icons/EditOutlined)})
                     (tab-item {:key      "yaml"
                                :label    "YAML"
                                :children [editor]
                                :icon     (r/create-element icons/CodeOutlined)})]}]]
     [:> Col {:span 12}
      [table (:data resources)]]]))

(defmethod routes/pages ::c/main [] [viewdefinition-view])

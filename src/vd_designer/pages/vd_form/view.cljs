(ns vd-designer.pages.vd-form.view
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Col Row]]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.components.button :as button]
            [vd-designer.components.monaco-editor :as monaco]
            [vd-designer.components.table :refer [table]]
            [vd-designer.components.tabs :refer [tab-item tabs]]
            [vd-designer.components.tag :as tag]
            [vd-designer.components.tree :refer [tree tree-item]]
            [vd-designer.pages.vd-form.components :refer [add-element-button
                                                          add-select-button
                                                          column-leaf
                                                          constant-leaf
                                                          foreach-expr-leaf
                                                          name-input
                                                          resource-input
                                                          where-leaf]]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.routes :as routes]
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

(declare render-block)

(defn add-value-path [ctx k]
  (update ctx :value-path conj k))

(defn drop-value-path [ctx]
  (update ctx :value-path pop))

(defn create-render-context []
  {:spec-path ["elements"]
   :spec vd-spec
   :spec-map (hash-map (get vd-spec "url") vd-spec)
   :value-path []})


;;;; Tree

(declare select->node)

(defn mapv-indexed [& args]
  (vec (apply map-indexed args)))

(defn node-constant [ctx items]
  (let [key (str "constant-" (:value-path ctx))]
    (js/console.debug (str "node constant items: " items))
    (tree-item key
               [tag/constant]
               (conj (mapv-indexed (fn [idx constant]
                                     (let [ctx (add-value-path ctx idx)]
                                       (tree-item (:value-path ctx) (constant-leaf ctx constant)))) items)
                     (tree-item (str "add-constant-" key)
                                [add-element-button "constant" ctx])))))

(defn node-where [ctx items]
  (let [key (str "where-" (:value-path ctx))]
    (js/console.debug (str "node where items: " items))
    (tree-item key
               [tag/where]
               (conj (mapv-indexed (fn [idx where]
                                     (let [ctx (add-value-path ctx idx)]
                                       (tree-item (:value-path ctx) (where-leaf ctx where)))) items)
                     (tree-item (str "add-where-" key)
                                [add-element-button "where" ctx])))))

(defn node-select [ctx items]
  (let [key (str "select-" (:value-path ctx))]
    (js/console.debug (str "node select items: " items))
    (tree-item key
               [tag/select]
               (conj (mapv-indexed #(select->node (add-value-path ctx %1) %2) items)
                     (tree-item (str "add-select-" key)
                                [add-select-button ctx])))))

(defn node-column [ctx items]
  (let [key (str "column-" (:value-path ctx))]
    (js/console.debug (str "node-column items: " items))
    (tree-item key
               [tag/column]
               (conj (mapv-indexed (fn [idx column]
                                     (let [ctx (add-value-path ctx idx)]
                                       (tree-item (:value-path ctx) (column-leaf ctx column)))) items)
                     (tree-item (str "add-column-" key)
                                [add-element-button "column" ctx])))))

(defn node-foreach [kind ctx path {:keys [select]}]
  (let [key (str kind "-" (:value-path ctx))
        ctx (drop-value-path ctx)]
    (js/console.debug (str kind " path " path))
    (js/console.debug (str kind " select " select))
    (tree-item key
               [tag/foreach kind]
               [(tree-item (str (:value-path ctx) "-path")
                           (foreach-expr-leaf ctx kind path))
                (node-select (add-value-path ctx :select) select)])))

(defn node-union-all [ctx items]
  (let [key (str "union-all-" (:value-path ctx))]
    (js/console.debug (str "union all items: " items))
    (tree-item key
               [tag/union-all]
               (conj (mapv-indexed #(select->node (add-value-path ctx %1) %2) items)
                     (tree-item (str "add-union-all-" key) [add-select-button ctx])))))

(defn select->node [ctx element]
  (js/console.debug (str "select->node (ctx): " (:value-path ctx)))
  (js/console.debug (str "select->node: " element))
  (let [key (key (first element))]
    ((condp = key
       :column        node-column
       :forEach       (partial node-foreach :forEach)
       :forEachOrNull (partial node-foreach :forEachOrNull)
       :unionAll      node-union-all
       :select        node-select)
     (add-value-path ctx key)
     (key element)
     element)))

(defn form []
  (let [vd-form @(subscribe [::m/current-vd])
        ctx (create-render-context)]
    [:div
     [tree
      :onSelect (fn [selected-keys info] (js/console.log "selected" selected-keys info))
      :defaultExpandAll true
      :treeData [(tree-item "name"     (name-input vd-form))
                 (tree-item "resource" (resource-input vd-form))

                 (node-constant (add-value-path ctx :constant) (:constant vd-form))
                 (node-where    (add-value-path ctx :where)    (:where vd-form))
                 (node-select   (add-value-path ctx :select)   (:select vd-form))]]]))

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

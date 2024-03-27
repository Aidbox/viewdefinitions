(ns vd-designer.pages.vd-form.view
  (:require [antd :refer [Col Row]]
            [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.components.collapse :refer [collapse collapse-item]]
            [vd-designer.components.dropdown :as dropdown]
            [vd-designer.components.select :refer [select]]
            [vd-designer.components.table :refer [table]]
            [vd-designer.components.tag :as tag]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.model :as model]
            [vd-designer.routes :as routes]
            [vd-designer.utils.yaml :as yaml]
            [vd-designer.components.monaco-editor :as monaco]
            [vd-designer.utils.event :as u]))

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

(def label-component-style
  {:color "#7972D3"
   :font-family "Inter"
   :margin-left "1px"
   :padding-left "12px"
   :padding-right "12px"
   :padding-top "4px"
   :padding-bottom "4px"
   :font-size   "14px"
   :font-weight "400"
   :line-height "20px"
   :margin-bottom "6px"
   :bg "#7972D31A"
   :border-none true
   :rounded true})

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

(defn render-field [ctx name value]
  [:div
   [:button {:on-click #(dispatch [::c/delete-node (conj (:value-path ctx) name)]) } "DELETE FIELD"]
   [:span name]
   #_[:span (str (:value-path ctx))]
   [:input {:on-change
            #(dispatch [::c/change-input-value (conj (:value-path ctx) name) (u/target-value %)])
            :value value}]])

(defn add-value-path [ctx k]
  (update ctx :value-path conj k))

(defn render-map [ctx map-key map-value]
  [:div
   [:button {:on-click #(dispatch [::c/delete-node (:value-path ctx)]) } "DELETE NODE"]
   map-key
   (for [[k _] (spec->elements ctx)]
     (when-not (get map-value (keyword k))
       (let [element (resolve-path ctx "elements" k)]
         ^{:key (conj (:value-path :ctx) k)}
         [:button
          {:on-click #(dispatch [::c/add-element-into-map
                                 (:value-path ctx)
                                 (keyword k)
                                 (cond
                                   (get element "array") [{}]
                                   (get element "elements") {}
                                   :else "")])}
          (str k)])))
   [:<>
    (for [[k v] map-value]
      ^{:key (conj (:spec-path ctx) k)}
      [render-block (add-spec-path ctx "elements") k v])]])

(defn render-array [ctx k value]
  [:div
   (when-not (= [:select] (:value-path ctx))
     [:button {:on-click #(dispatch [::c/delete-node (:value-path ctx)]) } "DELETE ARRAY"])
   k
   (map-indexed
     (fn [idx element]
       ^{:key (conj (:value-path ctx) idx)}
       [render-map (add-value-path ctx idx) k element])
     value)

   [:button {:on-click #(dispatch [::c/add-element-into-array (:value-path ctx)])} (str k)]])

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

(defn form []
  (let [vd-form @(subscribe [::m/current-vd])
        ctx (create-render-context)]
    [:div
     [:div
      [:input {:value (:name vd-form)
               :placeholder "ViewDefinition1"
               :on-change   (fn [e] (dispatch [::c/change-vd-name (u/target-value e)]))}]
      [:button {:on-click #(dispatch [::c/eval-view-definition])}
       "Run"]]

     [:div
      [:div
       [:label {:class label-component-style} "RESOURCE"]
       [:input {:value (:resource vd-form)
                :on-change (fn [e] (dispatch [::c/change-vd-resource (u/target-value e)]))}]]]
     [:div
      [render-block ctx "constant" (:constant vd-form)]]
     [:div
      [:label {:class label-component-style} "WHERE"]
      [render-block ctx "where" (:where vd-form)] ]
     [:div
      [render-block ctx "select" (:select vd-form)]]]))

(defn vd-input []
  (let [current-vd @(subscribe [::m/current-vd])]
    [:div
     {:style {:height "500px" :width "500px"}}
     [monaco/monaco {:id "vd-yaml"
                     :value (yaml/edn->yaml current-vd)
                     :schemas []
                     #_#_:onChange (fn [value & _] (dispatch [::c/set-schema value]))
                     #_#_:onValidate (fn [markers] (dispatch [::c/set-monaco-markers (js->clj markers)]))}]]))

(defn viewdefinition-view []
  (let [resources @(subscribe [::m/view-definition-data])
        mode @(subscribe [::m/mode])]
    [:div
     [:button {:on-click #(dispatch [::c/change-mode :form])}  "Form"]
     [:button {:on-click #(dispatch [::c/change-mode :yaml])}"YAML"]
     [:div
      (when (= mode :form) [form])
      (when (= mode :yaml) [vd-input])
      #_[table/table (:data resources)]]]))

(defmethod routes/pages ::c/main [] [viewdefinition-view])

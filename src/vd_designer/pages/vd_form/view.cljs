(ns vd-designer.pages.vd-form.view
  (:require [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.routes :as routes]
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
                                                           "path" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
                                                                   "datatype" "string"}
                                                           "hello" {"type" "http://fhir.aidbox.app/fhir/StructureDefinition/string|1.0.0",
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

(defn resolve-path [ctx & next-steps]
  (reduce
   (fn [spec step]
     (if-let [next-spec (get spec step)]
       next-spec
       (if-let [ref (get spec "elementReference")]
         (get (get-in (:spec-map ctx) ref) step)
         nil)))
   (:spec ctx)
   (into (:spec-path ctx) next-steps)))

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

(defn render-column [column-spec column]
  [:div column])

(defn render-field [ctx name value]
  [:div
   [:span name]
   [:input {:value value}]])

(defn render-map [ctx map-key map-value]
  [:div map-key 
   (for [[k _] (spec->elements ctx)]
     (when-not (get map-value (keyword k))
       [:button k]))
   [:<>
    (for [[k v] map-value]
      [render-block (add-spec-path ctx "elements") k v])]])

(defn render-array [ctx name value]
  [:div name
   (for [element value]
     (render-map ctx name element))])

(defn render-block [ctx k v]
  (cond 
    (spec-array? ctx (name k))
    [render-array (add-spec-path ctx (name k)) k v]

    (spec-map? ctx (name k))
    [render-map (add-spec-path ctx (name k)) k v]

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
      [:input {:id          "view-def-name"
               :s/invalid?  false
               :placeholder "ViewDefinition1"
               :on-change   (fn [e] (dispatch [::c/select-view-definition-name (u/target-value e)]))}]
      [:button {:on-click (fn [e] (dispatch [::c/eval-view-definition]))}
       "Run"]]

     [:div
      [:div
       [:label {:class label-component-style} "RESOURCE"]]
      "Not found"]
     [:div
      [:label {:class label-component-style} "CONSTANT"]]
     [:div
      [:label {:class label-component-style} "WHERE"]]
     [:div
      [render-block ctx "select" (:select vd-form)]]]))

(defn header []
  (let [vd-id @(subscribe [::m/chosen-vd-name])]
    [:button
     {:on-click (fn [_e] (dispatch [::routes/navigate [:vd-designer.pages.vd-list.controller/main]]))}
     (str "ViewDefinitions/" vd-id)]))

(defn viewdefinition-view []
  (let [resources @(subscribe [::m/view-definition-data])]
    [:div
     [header]
     [:div
      [form]
      #_[table/table (:data resources)]]]))

(defmethod routes/pages ::c/main [] [viewdefinition-view])
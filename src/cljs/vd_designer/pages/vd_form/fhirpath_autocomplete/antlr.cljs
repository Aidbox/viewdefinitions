(ns vd-designer.pages.vd-form.fhirpath-autocomplete.antlr
  (:require ["fhirpath-autocomplete-ts" :as autocomplete]
            [vd-designer.interop :as interop]))


(defn get-kind [kind]
  (get {2 :function
        5 :field
        7 :class
        12 :value
        24 :operator} kind))

(defn complete [spec-map {:keys [type expressions fhirpath cursor constants]}]
  ;; (prn "const" constants)
  ;; (prn "expr" expressions)
  (->> (autocomplete/suggest spec-map type (clj->js expressions) fhirpath cursor #_(clj->js constants))
       (.-items)
       (mapv #(-> %
                  (interop/obj->clj)
                  (update :kind get-kind)))))

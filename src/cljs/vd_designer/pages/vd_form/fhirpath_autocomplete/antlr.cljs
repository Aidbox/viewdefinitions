(ns vd-designer.pages.vd-form.fhirpath-autocomplete.antlr
  (:require ["fhirpath-autocomplete-ts" :as autocomplete]))


(defn complete [spec-map type expressions fhirpath cursor]
  (autocomplete/suggest spec-map type (clj->js expressions) fhirpath cursor))
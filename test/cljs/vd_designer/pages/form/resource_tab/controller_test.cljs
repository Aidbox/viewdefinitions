(ns vd-designer.pages.form.resource-tab.controller-test
  (:require [cljs.test :as t :refer [is]]
            [vd-designer.pages.form.resource-tab.controller :as sut]
            [matcher-combinators.test :refer [match?]]))

(t/deftest fhir-schema-to-ant-tree-test

  (is (match?
        [{:option-name "a" 1 2} {:option-name "b" 3 4}]
        (sut/flat-elements {:elements {:a {1 2} :b {3 4}}})))

  (is (match?
        [{:option-name "Observation" :key "observation"
          :children [{:option-name "someOpt" :key "observation-someopt"}
                     {:option-name "another" :key "observation-another"}]}]
        (sut/fhir-schema->options "Observation"
          {:id "Obs"
           :required ["status", "code"]
           :elements {:someOpt {:type "Period" :summary true :choiceOf "value"}
                      :another {:type "Reference"
                                :refers ["http://hl7.org/fhir/StructureDefinition/DocumentReference",
                                         "http://hl7.org/fhir/StructureDefinition/ImagingStudy",
                                         "http://hl7.org/fhir/StructureDefinition/Media",
                                         "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse",
                                         "http://hl7.org/fhir/StructureDefinition/Observation",
                                         "http://hl7.org/fhir/StructureDefinition/MolecularSequence"]}}})))
  )

(comment
  (t/run-tests 'vd-designer.pages.form.resource-tab.controller-test))



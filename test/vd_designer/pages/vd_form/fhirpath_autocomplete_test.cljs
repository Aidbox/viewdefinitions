(ns vd-designer.pages.vd-form.fhirpath-autocomplete-test
  (:require
   [cljs.test :refer-macros [deftest testing is run-test run-tests]]
   [matcher-combinators.test :refer [match?]]
   [matcher-combinators.matchers :as m]
   [vd-designer.pages.vd-form.fhirpath-autocomplete :as fhirpath]
   [vd-designer.pages.vd-form.fhir-schema :as fhirschema]))

(def period-fhirschema
  {:constraints
   {:per-1
    {:human "If present, start SHALL have a lower value than end",
     :severity "error",
     :expression
     "start.hasValue().not() or end.hasValue().not() or (start <= end)"}},
   :derivation "specialization",
   :type "Period",
   :elements
   {:start {:scalar true, :summary true, :type "dateTime"},
    :end {:scalar true, :summary true, :type "dateTime"}},
   :id "Period",
   :kind "complex-type",
   :url "http://hl7.org/fhir/StructureDefinition/Period",
   :base "http://hl7.org/fhir/StructureDefinition/Element",
   :package-meta
   {:name "hl7.fhir. r4.core",
    :version "4.0.1",
    :path "/tmp/lw-fhir-schema-repository/hl7.fhir.r4.core#4.0.1"}})


(def humanname-fhirschema
  {:id "HumanName",
   :url "http://hl7.org/fhir/StructureDefinition/HumanName",
   :package-meta
   {:name "hl7.fhir.r4.core",
    :version "4.0.1",
    :path "/tmp/lw-fhir-schema-repository/hl7.fhir.r4.core#4.0.1"},
   :base "http://hl7.org/fhir/StructureDefinition/Element",
   :kind "complex-    type",
   :type "HumanName",
   :derivation "specialization",
   :elements
   {:use
    {:binding
     {:valueSet "http://hl7.org/fhir/ValueSet/name-use",
      :strength "required",
      :codesystems ["http://hl7.org/fhir/name-use"]},
     :scalar true,
     :summary true,
     :modifier true,
     :type "code"},
    :text {:scalar true, :summary true, :type "string"},
    :family {:scalar true, :summary true, :type "string"},
    :given {:summary true, :type "string", :array true},
    :prefix {:summary true, :type "string", :array true},
    :suffix {:summary true, :type "string", :array true},
    :period {:scalar true, :summary true, :type "Period"}}})


(def patient-fhirschema
  {:id "Patient",
   :url "http://hl7.org/fhir/StructureDefinition/Patient",
   :package-meta
   {:name "hl7.fhir.r4.core",
    :version "4.0.1",
    :path "/tmp/lw-fhir-schema-repository/hl7.fhir.r4.core#4.0.1"},
   :base "http://hl7.org/fhir/StructureDefinition/DomainResource",
   :kind "resource",
   :type "Patient",
   :derivation "specialization",
   :elements
   {:multipleBirthBoolean
    {:scalar true, :type "boolean", :choiceOf "multipleBirth"},
    :address {:summary true, :type "Address", :array true},
    :deceasedDateTime
    {:scalar true,
     :summary true,
     :modifier true,
     :type "dateTime",
     :choiceOf "deceased"},
    :managingOrganization
    {:refers ["http://hl7.org/fhir/StructureDefinition/Organization"],
     :scalar true,
     :summary true,
     :type "Reference"},
    :deceasedBoolean
    {:scalar true,
     :summary true,
     :modifier true,
     :type "boolean",
     :choiceOf "deceased"},
    :name {:summary true, :type "HumanName", :array true},
    :birthDate {:scalar true, :summary true, :type "date"},
    :multipleBirthInteger
    {:scalar true, :type "integer", :choiceOf "multipleBirth"},
    :multipleBirth
    {:choices ["multipleBirthBoolean" "multipleBirthInteger"],
     :scalar true},
    :deceased
    {:choices ["deceasedBoolean" "deceasedDateTime"], :scalar true},
    :photo {:type "Attachment", :array true},
    :link
    {:summary true,
     :modifier true,
     :required ["other" "type"],
     :type "BackboneElement",
     :array true,
     :elements
     {:other
      {:refers
       ["http://hl7.org/fhir/StructureDefinition/Patient"
        "http://hl7.org/fhir/StructureDefinition/RelatedPerson"],
       :scalar true,
       :summary true,
       :type "Reference"},
      :type
      {:binding
       {:valueSet "http://hl7.org/fhir/ValueSet/link-type",
        :strength "required",
        :codesystems ["http://hl7.org/fhir/link-type"]},
       :scalar true,
       :summary true,
       :type "code"}}},
    :active
    {:scalar true, :summary true, :modifier true, :type "boolean"},
    :communication
    {:required ["language"],
     :type "BackboneElement",
     :array true,
     :elements
     {:language
      {:binding
       {:valueSet "http://hl7.org/fhir/ValueSet/languages",
        :strength "preferred"},
       :scalar true,
       :type "CodeableConcept"},
      :preferred {:scalar true, :type "boolean"}}},
    :identifier {:summary true, :type "Identifier", :array true},
    :telecom {:summary true, :type "ContactPoint", :array true},
    :generalPractitioner
    {:refers
     ["http://hl7.org/fhir/StructureDefinition/Organization"
      "http://hl7.org/fhir/StructureDefinition/Practitioner"
      "http://hl7.org/fhir/StructureDefinition/PractitionerRole"],
     :type "Reference",
     :array true},
    :gender
    {:binding
     {:valueSet "http://hl7.org/fhir/ValueSet/administrative-gender",
      :strength "required",
      :codesystems ["http://hl7.org/fhir/administrative-gender"]},
     :scalar true,
     :summary true,
     :type "code"},
    :maritalStatus
    {:binding
     {:valueSet "http://hl7.org/fhir/ValueSet/marital-status",
      :strength "extensible"},
     :scalar true,
     :type "CodeableConcept"},
    :contact
    {:constraints
     {:pat-1
      {:human
       "SHALL at least contain a contact's details or a reference to an organization",
       :severity "error",
       :expression
       "name.exists() or telecom.exists() or address.exists() or organization.exists()"}},
     :type "BackboneElement",
     :array true,
     :elements
     {:relationship
      {:binding
       {:valueSet
        "http://hl7.org/fhir/ValueSet/patient-contactrelationship",
        :strength "extensible"},
       :type "CodeableConcept",
       :array true},
      :name {:scalar true, :type "HumanName"},
      :telecom {:type "ContactPoint", :array true},
      :address {:scalar true, :type "Address"},
      :gender
      {:binding
       {:valueSet "http://hl7.org/fhir/ValueSet/administrative-gender",
        :strength "required",
        :codesystems ["http://hl7.org/fhir/administrative-gender"]},
       :scalar true,
       :type "code"},
      :organization
      {:refers ["http://hl7.org/fhir/StructureDefinition/Organization"],
       :scalar true,
       :type "Reference"},
      :period {:scalar true, :type "Period"}}}}})

(def test-spec
  {:spec-map {"Period" period-fhirschema
              "http://hl7.org/fhir/StructureDefinition/Period" period-fhirschema
              "HumanName" humanname-fhirschema
              "http://hl7.org/fhir/StructureDefinition/HumanName" humanname-fhirschema
              "Patient" patient-fhirschema
              "http://hl7.org/fhir/StructureDefinition/Patient" patient-fhirschema}})

(deftest find-part-with-carret-test
  (testing "Empty string"
    (is (match? 0
                (fhirpath/find-part-with-carret [""] 0)))
    (is (match? -1 
                (fhirpath/find-part-with-carret [""] 1))))
  (testing "One element"
    (is (match? 0
                (fhirpath/find-part-with-carret ["name"] 2)))
    (is (match? 0
                (fhirpath/find-part-with-carret ["name"] 0)))
    (is (match? 0 
                (fhirpath/find-part-with-carret ["name"] 4)))
    (is (match? -1 
                (fhirpath/find-part-with-carret ["name"] 7))))
  (testing "Several elements"
    (is (match? 0
                (fhirpath/find-part-with-carret ["name" "family"] 2)))
    (is (match? 0
                (fhirpath/find-part-with-carret ["name" "family"] 0)))
    (is (match? 0
                (fhirpath/find-part-with-carret ["name" "family"] 4)))
    (is (match? 1
                (fhirpath/find-part-with-carret ["name" "family"] 6)))
    (is (match? 1
                (fhirpath/find-part-with-carret ["name" "family"] 11)))
    (is (match? -1
                (fhirpath/find-part-with-carret ["name" "family"] 12)))))

(comment
  (run-test find-part-with-carret-test))

(deftest autocomplete-test
  (testing "Autocomplete doesn't work on selection region"
    (is (match?
         {:fields []
          :functions []}
         (fhirpath/autocomplete
          test-spec
          {:text "name."
           :selection-start 0
           :selection-end 3
           :type "Patient"}))))
  (testing "Autocomplete fields"
    (testing "Base Patient '|' autocomplete"
      (is (match?
           {:fields (m/embeds [{:label "name" :value "name"}
                               {:label "active" :value "active"}])}
           (fhirpath/autocomplete
            test-spec
            {:text ""
             :selection-start 0
             :selection-end 0
             :type "Patient"}))))
    (testing "Base Patient 'n|' autocomplete"
      (is (match?
           {:fields [{:label "name" :value "name"}]}
           (fhirpath/autocomplete
            test-spec
            {:text "n"
             :selection-start 1
             :selection-end 1
             :type "Patient"}))))
    (testing "base patient '|n' autocomplete"
      (is (match?
           {:fields (m/embeds [{:label "name" :value "name"}
                               {:label "active" :value "active"}])}
           (fhirpath/autocomplete
            test-spec
            {:text "n"
             :selection-start 0
             :selection-end 0
             :type "Patient"}))))
    (testing "Base Patient 'name.|' autocomplete"
      (is (match?
           {:fields (m/embeds [{:label "family" :value "family"}
                               {:label "given" :value "given"}])}
           (fhirpath/autocomplete
            test-spec
            {:text "name."
             :selection-start 5
             :selection-end 5
             :type "Patient"}))))
    (testing "Base Patient 'name.f|' autocomplete"
      (is (match?
           {:fields [{:label "family" :value "family"}]}
           (fhirpath/autocomplete
            test-spec
            {:text "name.f"
             :selection-start 6
             :selection-end 6
             :type "Patient"}))))
    (testing "Base Patient 'name.fg|' autocomplete"
      (is (match?
           {:fields []}
           (fhirpath/autocomplete
            test-spec
            {:text "name.fg"
             :selection-start 7
             :selection-end 7
             :type "Patient"}))))
    (testing "Base Patient '|name.f' autocomplete"
      (is (match?
           {:fields (m/embeds [{:label "name" :value "name"}
                               {:label "active" :value "active"}])}
           (fhirpath/autocomplete
            test-spec
            {:text "name.f"
             :selection-start 0
             :selection-end 0
             :type "Patient"}))))
    (testing "Base Patient 'n|ame.f' autocomplete"
      (is (match?
           {:fields (m/embeds [{:label "name" :value "name"}])}
           (fhirpath/autocomplete
            test-spec
            {:text "name.f"
             :selection-start 1
             :selection-end 1
             :type "Patient"}))))
    (testing "Base Patient 'name.period.|' autocomplete"
      (is (match?
           {:fields (m/embeds [{:label "start" :value "start"}
                               {:label "end" :value "end"}])}
           (fhirpath/autocomplete
            test-spec
            {:text "name.period.|"
             :selection-start 12
             :selection-end 12
             :type "Patient"})))))
  (testing "Autocomplete functions"
    (testing "Base Patient 'name.where|()' autocomplete"
      (is (match?
            {:functions []
             :fields    []}
            (fhirpath/autocomplete
              test-spec
              {:text "name.where()"
               :selection-start 10
               :selection-end 10
               :type "Patient"}))))
    (testing "Base Patient 'name.|' autocomplete"
      (is (match?
           {:functions (m/embeds [{:label "empty" :value "empty()" :cursor 7}])}
           (fhirpath/autocomplete
            test-spec
            {:text "name."
             :selection-start 5
             :selection-end 5
             :type "Patient"}))))
    (testing "Base Patient 'name.f|' autocomplete"
      (is (match?
           {:functions (m/embeds [{:label "first" :value "first()" :cursor 7}])}
           (fhirpath/autocomplete
            test-spec
            {:text "name.f"
             :selection-start 6
             :selection-end 6
             :type "Patient"}))))
    (testing "Base Patient 'name.fb|' autocomplete"
      (is (match?
           {:functions []}
           (fhirpath/autocomplete
            test-spec
            {:text "name.fb"
             :selection-start 7
             :selection-end 7
             :type "Patient"})))))
  (testing "Autocomplete inside functions"
    ;; TODO: add test cases for 'name.where(|'
    (testing "Base Patient 'name.where(|)' autocomplete"
      (is (match?
           {:fields (m/embeds [{:label "family" :value "family"}
                               {:label "given" :value "given"}])
            :functions (m/embeds [{:label "empty" :value "empty()" :cursor 7}])}
           (fhirpath/autocomplete
            test-spec
            {:text "name.where()"
             :selection-start 11 
             :selection-end 11
             :type "Patient"}))))
    (testing "Base Patient 'name.exists(|)' autocomplete"
      (is (match?
            {:fields (m/embeds [{:label "family" :value "family"}
                                {:label "given" :value "given"}])
             :functions (m/embeds [{:label "empty"
                                    :value "empty()"
                                    :cursor 7}])}
            (fhirpath/autocomplete
              test-spec
              {:text "name.exists()"
               :selection-start 12
               :selection-end 12
               :type "Patient"}))))

    #_(testing "Base Patient 'name.where(period.where(|))' autocomplete"
      (is (match?
            {:fields (m/embeds [{:label "start" :value "start"}
                                {:label "end" :value "end"}])
             :functions (m/embeds [{:label "empty"
                                    :value "empty()"
                                    :cursor 7}])}
            (fhirpath/autocomplete
              test-spec
              {:text            "name.where(period.where())"
               :selection-start 24
               :selection-end   24
               :type            "Patient"}))))
    ))

(comment
  (run-test fhirpath-autocomplete-test))


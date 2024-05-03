(ns vd-designer.pages.vd-form.fhirpath-autocomplete.fhirpath-autocomplete-test
  (:require
    [cljs.test :refer-macros [deftest testing is are run-test run-tests]]
    [clojure.string :as str]
    [matcher-combinators.matchers :as m]
    [matcher-combinators.test :refer [match?]]
    [shadow.resource :as rc]
    [vd-designer.pages.vd-form.fhirpath-autocomplete.autocomplete :as fhirpath]
    [vd-designer.utils.fhir-spec :as utils.fhir-spec]))


(comment
  "normative"
  "name.where().family"

  ;; 1. Register events on keyleft and keyright
  ;; 2. Use autocomplete on old tree on cursor position changing
  ;; 3. 

  )

(deftest split-fhirpath-test
  (is (match? [""]
              (fhirpath/split-fhirpath "")))
  (is (match? ["name"]
              (fhirpath/split-fhirpath "name")))
  (is (match? ["name" ""]
              (fhirpath/split-fhirpath "name.")))
  (is (match? ["name" "family"]
              (fhirpath/split-fhirpath "name.family"))))

(deftest find-part-with-cursor-test
  (testing "Empty string"
    (is (match? 0
                (fhirpath/find-part-with-cursor [""] 0)))
    (is (match? -1
                (fhirpath/find-part-with-cursor [""] 1))))
  (testing "One element"
    (is (match? 0
                (fhirpath/find-part-with-cursor ["name"] 2)))
    (is (match? 0
                (fhirpath/find-part-with-cursor ["name"] 0)))
    (is (match? 0
                (fhirpath/find-part-with-cursor ["name"] 4)))
    (is (match? -1
                (fhirpath/find-part-with-cursor ["name"] 7))))
  (testing "Several elements"
    (is (match? 0
                (fhirpath/find-part-with-cursor ["name" "family"] 2)))
    (is (match? 0
                (fhirpath/find-part-with-cursor ["name" "family"] 0)))
    (is (match? 0
                (fhirpath/find-part-with-cursor ["name" "family"] 4)))
    (is (match? 1
                (fhirpath/find-part-with-cursor ["name" "family"] 6)))
    (is (match? 1
                (fhirpath/find-part-with-cursor ["name" "family"] 11)))
    (is (match? -1
                (fhirpath/find-part-with-cursor ["name" "family"] 12)))))

(comment
  (run-test find-part-with-cursor-test))

(def test-spec
  {:spec-map (utils.fhir-spec/spec-map (rc/inline "fhir_schema.ndjson"))})

(defn pattern->map [pattern]
  (let [cursor-idx (str/index-of pattern "|")]
    {:selection-start cursor-idx
     :selection-end   cursor-idx
     :text            (str/replace pattern "|" "")}))

#_(defn test-autocomplete [expectation resource-type text]
  (is (match? expectation
              (fhirpath/autocomplete
                test-spec
                (assoc (pattern->map text)
                  :type resource-type)))))

#_(deftest autocomplete-test
  (testing "Autocomplete doesn't work on selection region"
    (is (match?
          {:fields    []
           :functions []}
          (fhirpath/autocomplete
            test-spec
            {:text            "name."
             :selection-start 0
             :selection-end   3
             :type            "Patient"}))))

  (testing "patient"
    (testing "fields"
      (are [exp text]
        (test-autocomplete exp "Patient" text)

        {:fields (m/embeds [{:label "name" :value "name"}
                            {:label "active" :value "active"}])}
        "|"

        {:fields [{:label "name" :value "name"}]}
        "n|"

        {:fields (m/embeds [{:label "name" :value "name"}
                            {:label "active" :value "active"}])}
        "|n"

        {:fields (m/embeds [{:label "family" :value "family"}
                            {:label "given" :value "given"}])}
        "name.|"

        {:fields [{:label "family" :value "family"}]}
        "name.f|"

        {:fields []}
        "name.fg|"

        {:fields (m/embeds [{:label "name" :value "name"}
                            {:label "active" :value "active"}])}
        "|name.f"

        {:fields (m/embeds [{:label "name" :value "name"}])}
        "n|ame.f"

        {:fields (m/embeds [{:label "start" :value "start"}
                            {:label "end" :value "end"}])}
        "name.period.|"))
    (testing "functions"
      (are [exp text]
        (test-autocomplete exp "Patient" text)

        {:functions (m/embeds [{:label "where" :value "where()" :cursor 6}])}
        "name.where|()"

        {:functions (m/embeds [{:label "empty" :value "empty()" :cursor 7}])}
        "name.|"

        {:functions (m/embeds [{:label "first" :value "first()" :cursor 7}])}
        "name.f|"

        {:functions []}
        "name.fb|"))

    (testing "inside functions"
      (are [exp text]
        (test-autocomplete exp "Patient" text)

        {:fields    (m/embeds [{:label "family" :value "family"}
                               {:label "given" :value "given"}])
         :functions (m/embeds [{:label "empty" :value "empty()" :cursor 7}])}
        "name.where(|)"

        {:fields    (m/embeds [{:label "family" :value "family"}])
         :functions (m/embeds [{:label "first" :value "first()" :cursor 7}])}
        "name.where(|)"

        {:fields    []
         :functions []}
        "name.where(fg|)"

        {:fields    (m/embeds [{:label "start" :value "start"}
                               {:label "end" :value "end"}])
         :functions (m/embeds [{:label  "empty"
                                :value  "empty()"
                                :cursor 7}])}
        "name.where(period.|)"

        {:fields    (m/embeds [{:label "family" :value "family"}
                               {:label "given" :value "given"}])
         :functions (m/embeds [{:label  "empty"
                                :value  "empty()"
                                :cursor 7}])}
        "name.exists(|)"

        {:fields    (m/embeds [{:label "start" :value "start"}
                               {:label "end" :value "end"}])
         :functions (m/embeds [{:label  "empty"
                                :value  "empty()"
                                :cursor 7}])}
        "name.where(period.where(|))"

        #_#_{:fields    (m/embeds [{:label "family" :value "family"}])
             :functions (m/embeds [{:label  "first"
                                    :value  "first()"
                                    :cursor 7}])}
                "name.where(period.empty() and f|)"))))

(comment
  (run-test autocomplete-test)
  (run-tests 'vd-designer.pages.vd-form.fhirpath-autocomplete-test))

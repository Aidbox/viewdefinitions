(ns vd-designer.autocomplete-test
  (:require [cljs.test :refer-macros [deftest is testing run-tests run-test]]
            [vd-designer.pages.form.components :as u]
            ;; [clojure.string :as str]
            ;; [clojure.core]
            ;; [vd-designer.pages.form.fhirpath-autocomplete.antlr :as antlr]
            ;; [vd-designer.utils.fhir-spec :as utils.fhir-spec]
            [matcher-combinators.test :refer [match?]])
  ;; (:require-macros [vd-designer.interop :refer [inline-resource]])
  )

(defn options-name [{:keys [text cursor-start]} [start end]]
  (u/->ui-options
   {:text text :cursor-start cursor-start}
   [{:label "name",
     :kind :field
     :detail "HumanName"
     :textEdit {:range {:start {:character start}
                        :end   {:character end}}
                :newText "name"}}]))

(defn options-where [{:keys [text cursor-start]} [start end]]
  (u/->ui-options
   {:text text :cursor-start cursor-start}
   [{:label "where",
     :kind :method
     :detail nil
     :textEdit {:range {:start {:character start}
                        :end   {:character end}}
                :newText "where($0)"}}]))

(deftest ui-options-field-test
  ;; | => name|
  (is (match?
       [{:value "name"
         :cursor 4}]
       (options-name {:text "" :cursor-start 0} [0 0])))

  ;; na| → name|
  (is (match?
       [{:value "name" :cursor 4}]
       (options-name {:text "na" :cursor-start 2} [0 2])))

  ;; name.fa| → name.family|
  (is (match?
       [{:value "name.family" :cursor 11}]
       (u/->ui-options
        {:text "name.fa" :cursor-start 7}
        [{:label "family",
          :kind :field
          :detail "string"
          :textEdit {:range {:start {:character 5}
                             :end   {:character 7}}
                     :newText "family"}}])))

  ;; name| → name|
  (is (match?
       [{:value "name" :cursor 4}]
       (options-name {:text "name" :cursor-start 4} [0 4])))

  ;; name.|family → name.family|
  (is (match?
       [{:value "name.family" :cursor 11}]
       (u/->ui-options
        {:text "name.family" :cursor-start 5}
        [{:label "family",
          :kind :field
          :detail "string"
          :textEdit {:range {:start {:character 5}
                             :end   {:character 11}}
                     :newText "family"}}])))

  ;;  na|me → name|
  (is (match?
       [{:value "name" :cursor 4}]
       (options-name {:text "name" :cursor-start 2} [0 4])))

  ;; na|m → name|
  (is (match?
       [{:value "name" :cursor 4}]
       (options-name {:text "nam" :cursor-start 2} [0 3])))

  ;; na|e → name|
  (is (match?
       [{:value "name" :cursor 4}]
       (options-name {:text "nae" :cursor-start 2} [0 3])))

  ;; na|mes → name|
  (is (match?
       [{:value "name" :cursor 4}]
       (options-name {:text "names" :cursor-start 2} [0 5]))))

(deftest ui-options-function-test
  ;; | → where(|)
  (is (match?
       [{:value "where()" :cursor 6}]
       (options-where {:text "" :cursor-start 0} [0 0])))

  ;; name.wh| → name.where(|)
  (is (match?
       [{:value "name.where()" :cursor 11}]
       (options-where {:text "name.wh" :cursor-start 7} [5 7])))

  ;; name.where| → name.where(|)
  (is (match?
       [{:value "name.where()" :cursor 11}]
       (u/->ui-options
        {:text "name.where" :cursor-start 10}
        [{:label "where",
          :kind :method
          :detail nil
          :textEdit {:range {:start {:character 5}
                             :end   {:character 10}}
                     :newText "where($0)"}}])))

  ;; name.|where → name.where(|)
  (is (match?
       [{:value "name.where()" :cursor 11}]
       (options-where {:text "name.where" :cursor-start 5} [5 10])))

  (is (=
       3
       (u/new-cursor-idx 8 "name.wher" "wher")))

  (is (=
       0
       (u/new-cursor-idx 0 "name.wher" "name")))

  (is (=
       1
       (u/new-cursor-idx 1 "name.wher" "name")))

  (is (=
       0
       (u/new-cursor-idx 5 "name.wher" "wher")))

  ;; name.whe|r → name.where(|)
  (is (match?
       [{:value "name.where()" :cursor 11}]
       (options-where {:text "name.wher" :cursor-start 8} [5 9])))

  ;; name.whe|e → name.where(|)
  (is (match?
       [{:value "name.where()" :cursor 11}]
       (options-where {:text "name.whee" :cursor-start 8} [5 9])))

  ;; name.whe|rein → name.where(|)
  (is (match?
       [{:value "name.where()" :cursor 11}]
       (options-where {:text "name.wherein" :cursor-start 8} [5 12])))

  (testing "with ()"
    ;; 	name.where|() → name.where(|)
    (is (match?
         [{:value "name.where()" :cursor 11}]
         (u/->ui-options
          {:text "name.where()" :cursor-start 10}
          [{:label "where",
            :kind :method
            :detail nil
            :textEdit {:range {:start {:character 5}
                               :end   {:character 10}}
                       :newText "where($0)"}}])))

    (is (match?
         [{:value "name.first()" :cursor 12}]
         (u/->ui-options
          {:text "name.first()" :cursor-start 5}
          [{:label "first",
            :kind :method
            :detail nil
            :textEdit {:range {:start {:character 5}
                               :end   {:character 10}}
                       :newText "first()"}}])))

    ;; name.whe|re → name.where(|)
    (is (match?
         [{:value "name.where()" :cursor 11}]
         (options-where {:text "name.where" :cursor-start 8} [5 10])))

    ;; 	name.|where() → name.where(|)
    (is (match?
         [{:value "name.where()" :cursor 11}]
         (u/->ui-options
          {:text "name.where()" :cursor-start 5}
          [{:label "where",
            :kind :method
            :detail nil
            :textEdit {:range {:start {:character 5}
                               :end   {:character 10}}
                       :newText "where($0)"}}])))

    ;; name.whe|re() → name.where(|)
    (is (match?
         [{:value "name.where()" :cursor 11}]
         (options-where {:text "name.where()" :cursor-start 8} [5 10])))


    ;; name.|where(expr) → name.where(expr)|
    (is (match?
         [{:value "name.where(expr)"
           :cursor 16}]
         (options-where {:text "name.where(expr)" :cursor-start 5}
                        [5 10])))

    ;; name.whe|re(expr) → name.where(expr)|
    (is (match?
         [{:value "name.where(expr)"
           :cursor 16}]
         (options-where {:text "name.where(expr)" :cursor-start 8}
                        [5 10])))

    ;; name.|where(expr).abc => name.where(expr)|.abc
    (is (match?
         [{:value "name.where(expr).abc"
           :cursor 16}]
         (options-where {:text "name.where(expr).abc" :cursor-start 5}
                        [5 10])))

    ;; name.|first().abc => name.first()|.abc
    (is (match?
         [{:value "name.first().abc"
           :cursor 12}]
         (u/->ui-options
          {:text "name.first().abc" :cursor-start 5}
          [{:label "first",
            :kind :method
            :detail nil
            :textEdit {:range {:start {:character 5}
                               :end   {:character 10}}
                       :newText "first()"}}])))

    ;; 	name.whe|re( → name.where(|)
    ;; TODO: is it ok?
    #_(is (match?
           [{:value "name.where()" :cursor 11}]
           (options-where {:text "name.where(" :cursor-start 8} [5 10])))))


;; (def json (inline-resource "fhir_schema.ndjson"))
;; (def spec (clj->js (utils.fhir-spec/spec-map (utils.fhir-spec/spec json))))

;; (defn ui-opts [text]
;;   ;; text and cursor are repeated, we have to do it
;;   (let [cursor-start (str/index-of text "|")
;;         text (str/replace text "|" "")
;;         options (antlr/complete
;;                   {:type "Patient"
;;                    :fhirschemas spec
;;                    :forEachExpressions []
;;                    :externalConstants [{:type "string" :value "abcde" :name "abcde"}]
;;                    :fhirpath text
;;                    :cursor cursor-start})]
;;     (mapv #(dissoc % :label)
;;           (u/->ui-options
;;             {:text text :cursor-start cursor-start}
;;             options))))

;; (deftest autocomplete-with-fhir-spec
;;   (is (match? [{:value "name.where()", :cursor 11}]
;;               (ui-opts "name.where|")))
;;
;;   (is (> (count (ui-opts "name.|ofType()")) 1))
;;
;;   (is (match?
;;        [{:label-option "deceasedDateTime",
;;          :value "deceased.ofType(dateTime)",
;;          :cursor 25}
;;         {:label-option "deceasedBoolean",
;;          :value "deceased.ofType(boolean)",
;;          :cursor 24}]
;;         (ui-opts "decea|")))
;;
;;   (is (> (count (ui-opts "|name.ofType()")) 1))
;;
;;   (is (match?
;;         [{:label-option "deceasedDateTime",
;;           :value "deceased.ofType(dateTime)",
;;           :cursor 25}]
;;         (ui-opts "deceasedDateTime|")))
;;
;;   (is (match?
;;         [{:label-option "where",
;;           :value "name.where()",
;;           :cursor 11}]
;;         (ui-opts "name.wh|ere")))
;;
;;   (testing "constants"
;;
;;     (is (match?
;;           [{:value "%abcde",
;;             :cursor 6}]
;;           (ui-opts "%a|")))
;;
;;     ;;TODO: newtext returns no %
;;     #_(is (match?
;;           [{:value "%abcde",
;;             :cursor 6}]
;;           (ui-opts "abcd|")))
;;
;;     (is (match?
;;           [{:value "%`abcde`",
;;             :cursor 8}]
;;           (ui-opts "%`ab|")))
;;
;;
;;
;;     (is (match?
;;           [{:value "name.where(use=%abcde)",
;;             :cursor 21}]
;;           (ui-opts "name.where(use=%ab|)")))
;;
;;     (is (match?
;;           [{:value "name.where(use = %abcde)",
;;             :cursor 23}]
;;           (ui-opts "name.where(use = %ab|)")))
;;
;;     ;;TODO: textedit end should be 19, not 20
;;     #_(is (match?
;;           [{:value "name.where(use=%`abcde`)",
;;             :cursor 23}]
;;           (ui-opts "name.where(use=%`ab|)")))
;;
;;     ;;TODO: textedit end should be 19, not 20
;;     #_(is (match?
;;           [{:value "name.where(use=%'abcde')",
;;             :cursor 23}]
;;           (ui-opts "name.where(use=%'ab|)")))
;;
;;     ;;
;;
;;     (testing "name.where(use = %name_use).exists() by steps"
;;       (is (match?
;;             [{:value "name", :cursor 4}]
;;             (ui-opts "na|")))
;;
;;       (is (match?
;;             [{:value "name.where()", :cursor 11}]
;;             (ui-opts "name.whe|")))
;;
;;       (is (match?
;;             [{:value "name.where(use)", :cursor 14}]
;;             (ui-opts "name.where(us|)")))
;;
;;       (is (match?
;;             [{:value "name.where(use =%abcde)", :cursor 22}]
;;             (ui-opts "name.where(use =%|)")))
;;
;;       (is (match?
;;             [{:value "name.where(use = %abcde)", :cursor 23}]
;;             (ui-opts "name.where(use = %|)")))
;;
;;       (is (match?
;;             [{:value "name.where(use = %abcde)", :cursor 23}]
;;             (ui-opts "name.where(use = %ab|)")))
;;
;;       ;; TODO: end should be 19, not 20
;;       #_(is (match?
;;               [{:value "name.where(use = %'abcde')", :cursor 25}]
;;               (ui-opts "name.where(use = %'|)")))
;;
;;       ;; TODO: end should be 21, not 22
;;       #_(is (match?
;;               [{:value "name.where(use = %'abcde')", :cursor 25}]
;;               (ui-opts "name.where(use = %'ab|)")))
;;
;;       ;; TODO: end should be 19, not 20
;;       #_(is (match?
;;               [{:value "name.where(use = %`abcde`)", :cursor 25}]
;;               (ui-opts "name.where(use = %`|)")))
;;
;;       ;; TODO: end should be 21, not 22
;;       #_(is (match?
;;               [{:value "name.where(use = %`abcde`)", :cursor 25}]
;;               (ui-opts "name.where(use = %`ab|)")))
;;
;;       ;; TODO: name.where(use = |) suggests things like name.where(use = given)??
;;       ;; TODO: how to handle name.where(use |) ? now suggests use, given etc
;;
;;       )
;;
;;
;;     (testing "name.where(use = %'name_use') by steps")
;;
;;     )
;;
;;
;;
;;
;;   (is (= [] (ui-opts "hello|")))
;;   (is (= [] (ui-opts "where|")))
;;
;;   #_(is (= [] (ui-opts "NAM|")))
;;   (is (match? [{:value "name"}] (ui-opts "nam|")))
;;
;;   ;; why?
;;   #_(is (= [] (ui-opts "name.use.where|")))
;;   )

(comment
  (run-test ui-options-field-test)
  (run-test ui-options-function-test)
  ;; (run-test autocomplete-with-fhir-spec)
  (run-tests))

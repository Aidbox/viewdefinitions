(ns vd-designer.autocomplete-test
  (:require [cljs.test :refer-macros [deftest is testing run-tests run-test]]
            [vd-designer.pages.vd-form.components :as u]
            [clojure.string :as str]
            ;; [clojure.core]
            [vd-designer.pages.vd-form.fhirpath-autocomplete.antlr :as antlr]
            [vd-designer.utils.fhir-spec :as utils.fhir-spec]
            [matcher-combinators.test :refer [match?]])
  (:require-macros [vd-designer.interop :refer [inline-resource]])
  )

#_(deftest autocomplete-test

  ;; | => name|
    (match?
     (c/autocomplete-new "" 0)
     {:result
      [{:label "name",
        :kind :field
        :detail "HumanName"
        :textEdit {:range {:start {:line 0 :character 0}
                           :end   {:line 0 :character 3}}
                   :newText "name"}}]})

  ;; | => where(|)
    (match?
     (c/autocomplete-new "" 0)
     {:result
      ;;        0123
      [{:label "where(...)",
        :kind :function
        :detail nil
        :textEdit {:range {:start {:line 0 :character 0}
                           :end   {:line 0 :character 6}}
                   :newText "where($0)"}}]})

  ;; | => 0
  ;; n| => 1
  ;; na| => 2
  ;; na| => name|
    (match?
     (c/autocomplete-new "na" 2)
     {:result
      [{:label "name",
        :kind :function
        :detail nil
        :textEdit {:range {:start {:line 0 :character 0}
                           :end   {:line 0 :character 4}}
                   :newText "name"}}]})

  ;; name.fa| => name.family|
    (match?
     (c/autocomplete-new "name.fa" 7)
     {:result
      [{:label "family",
        :kind :function
        :detail "string"
        :textEdit {:range {:start {:character 5}
                           :end   {:character 11}}
                   :newText "family"}}]})

  ;; name| → name|
    (match?
     (c/autocomplete-new "name" 1)
     {:result []})

  ;; name.where| → name.where(|)
    (match?
     (c/autocomplete-new "name.where" 10)
     {:result [{:label "where(...)",
                :kind :function
                :detail nil
                :textEdit {:range {:start {:character 5}
                                   :end   {:character 12}}
                           :newText "where($0)"}}]})

  ;; 	name.where(|  → name.where(|)
    (match?
     (c/autocomplete-new "name.where(" 11)
     {:result [{:label "where(...)",
                :kind :function
                :detail nil
                :textEdit {:range {:start {:character 5}
                                   :end   {:character 12}}
                           :newText "where($0)"}}]})

  ;; 	name.where(|) no suggestions should be displayed (yet)
    (match?
     (c/autocomplete-new "name.where()" 11)
     {:result []})

  ;; name.where()| no suggestions should be displayed
    (match?
     (c/autocomplete-new "name.where()" 12)
     {:result []})

  ;; елси вернулся результат без $0 => каретка в end результат

;; name.|family → name.family| ?????
    (match?
     (c/autocomplete-new "name.|family" 5)
     {:result [;; ????????
               {:label "family",
                :kind :field
                :detail "string"
                :textEdit {:range {:start {:character :todo}
                                   :end   {:character :todo}}
                           :newText "family"}}]})

  ;; name.|where → name.where(|)
    (match?
     (c/autocomplete-new "name.where" 5)
     {:result [{:label "where(...)",
                :kind :function
                :detail nil
                :textEdit {:range {:start {:character 5}
                                   :end   {:character 12}}
                           :newText "where($0)"}}]})

  ;; name.|where( → name.where(|)
    (match?
     (c/autocomplete-new "name.where" 5)
     {:result [{:label "where(...)",
                :kind :function
                :detail nil
                :textEdit {:range {:start {:character 5}
                                   :end   {:character 12}}
                           :newText "where($0)"}}]})

  ;; name.|where() → name.where(|)
    (match?
     (c/autocomplete-new "name.where()" 5)
     {:result [{:label "where(...)",
                :kind :function
                :detail nil
                :textEdit {:range {:start {:character 5}
                                   :end   {:character 12}}
                           :newText "where($0)"}}]})

  ;; name.|where(expr) → name.where|(expr)
    (match?
     (c/autocomplete-new "name.where(expr)" 5)
     {:result [{:label "where",
                :kind :function
                :detail nil
                :textEdit {:range {:start {:character 5}
                                   :end   {:character :todo}}
                           :newText "where(expr)"}}]})

  ;; na|me → name|
    (match?
     (c/autocomplete-new "name" 2)
     {:result [;;; ???????
               ]})

  ;; name.whe|re → name.where(|)
    (match?
     (c/autocomplete-new "name.where" 8)
     {:result [{:label "where(...)",
                :kind :function
                :detail nil
                :textEdit {:range {:start {:character 5}
                                   :end   {:character 12}}
                           :newText "where($0)"}}]})

  ;; name.whe|re( → name.where(|)
    (match?
     (c/autocomplete-new "name.where(" 8)
     {:result [{:label "where(...)",
                :kind :function
                :detail nil
                :textEdit {:range {:start {:character 5}
                                   :end   {:character 12}}
                           :newText "where($0)"}}]})

  ;; name.whe|re() → name.where(|)
    (match?
     (c/autocomplete-new "name.where(" 8)
     {:result [{:label "where",
                :kind :function
                :detail nil
                :textEdit {:range {:start {:character 5}
                                   :end   {:character 12}}
                           :newText "where($0)"}}]})

  ;; name.whe|re(expr) → name.where(expr)|
    (match?
     (c/autocomplete-new "name.where(" 8)
     {:result []})

;; na|m → name|
    (match?
     (c/autocomplete-new "na|m" 2)
     {:result [{:label "name",
                :kind :field
                :detail "HumanName"
                :textEdit {:range {:start {:character 0}
                                   :end   {:character 4}}
                           :newText "name"}}]})

  ;; name.whe|r → name.where(|)
    (match?
     (c/autocomplete-new "name.whe|r" 8)
     {:result [{:label "where(...)",
                :kind :function
                :detail nil
                :textEdit {:range {:start {:character 6}
                                   :end   {:character 12}}
                           :newText "where($0)"}}]})

  ;; na|e → name|e
    (match?
     (c/autocomplete-new "nae" 2)
     {:result [{:label "name",
                :kind :field
                :detail "HumanName"
                :textEdit {:range {:start {:character 0}
                                   :end   {:character 4}}
                           :newText "name"}}]})

  ;; name.whe|e → name.where(|)e
    (match?
     (c/autocomplete-new "name.whe|e" 7)
     {:result [{:label "where",
                :kind :function
                :detail nil
                :textEdit {:range {:start {:character 7}
                                   :end   {:character 11}}
                           :newText "where($0)"}}]})

  ;; na|mes → name|mes
    (match?
     (c/autocomplete-new "names" 2)
     {:result [{:label "name",
                :kind :field
                :detail "HumanName"
                :textEdit {:range {:start {:character 0}
                                   :end   {:character 4}}
                           :newText "name"}}]})

  ;; name.whe|rein → name.where(|)rein
    (match?
     (c/autocomplete-new "name.wherein" 8)
     {:result [{:label "where",
                :kind :function
                :detail nil
                :textEdit {:range {:start {:character 5}
                                   :end   {:character 12}}
                           :newText "where($0)"}}]}))

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
     :kind :function
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
          :kind :function
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
            :kind :function
            :detail nil
            :textEdit {:range {:start {:character 5}
                               :end   {:character 10}}
                       :newText "where($0)"}}])))

    (is (match?
         [{:value "name.first()" :cursor 12}]
         (u/->ui-options
          {:text "name.first()" :cursor-start 5}
          [{:label "first",
            :kind :function
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
            :kind :function
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
              :kind :function
              :detail nil
              :textEdit {:range {:start {:character 5}
                                 :end   {:character 10}}
                         :newText "first()"}}])))

    ;; 	name.whe|re( → name.where(|)
    ;; TODO: is it ok?
    #_(is (match?
          [{:value "name.where()" :cursor 11}]
          (options-where {:text "name.where(" :cursor-start 8} [5 10])))))


(def json (inline-resource "fhir_schema.ndjson"))
(def spec (clj->js (utils.fhir-spec/spec-map (utils.fhir-spec/spec json))))

(defn ui-opts [text]
  ;; text and cursor are repeated, we have to do it
  (let [cursor-start (str/index-of text "|")
        text (str/replace text "|" "")
        options (antlr/complete spec "Patient" [] text cursor-start)]
    (mapv #(dissoc % :label)
          (u/->ui-options
            {:text text :cursor-start cursor-start}
            options))))

(deftest autocomplete-with-fhir-spec
  (is (match? [{:value "name.where()", :cursor 11}]
              (ui-opts "name.where|")))

  (is (> (count (ui-opts "name.|ofType()")) 1))

  (is (match?
       [{:label-option "deceasedDateTime",
         :value "deceased.ofType(dateTime)",
         :cursor 25}
        {:label-option "deceasedBoolean",
         :value "deceased.ofType(boolean)",
         :cursor 24}]
        (ui-opts "decea|")))

  (is (> (count (ui-opts "|name.ofType()")) 1))

  (is (match?
        [{:label-option "deceasedDateTime",
          :value "deceased.ofType(dateTime)",
          :cursor 25}]
        (ui-opts "deceasedDateTime|")))

  (is (match?
        [{:label-option "where",
          :value "name.where()",
          :cursor 11}]
        (ui-opts "name.wh|ere")))

  (is (= [] (ui-opts "hello|")))
  (is (= [] (ui-opts "where|")))
  ;; why?
  #_(is (= [] (ui-opts "name.use.where|")))
  )

(comment
  (run-test ui-options-field-test)
  (run-test ui-options-function-test)
  (run-tests))

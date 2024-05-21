(ns vd-designer.autocomplete-test
  (:require [cljs.test :refer-macros [deftest is testing run-tests run-test]]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.components :as u]
            [clojure.core]
            [matcher-combinators.test :refer [match?]]
            [vd-designer.utils.utils :refer [insert-after
                                             insert-at
                                             remove-by-index]]))

#_(deftest autocomplete-test

  ;; before : ""
  ;; start = 0 end = 0 text = "hui"
  ;; => hui

  ;; before : "h"
  ;; start = 0 end = 0 text = "ui"
  ;; => uih

  ;; before : "h"
  ;; start = 1 end = 1 text = "ui"
  ;; => hui

  ;; CASE
  ;; |names => name|names
  ;; REQUEST: text = names, cursor-position = 0
  ;; RESPONSE: start = 0,
  ;;           end = 4

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

    ;; 	name.whe|re() → name.where(|)
    (is (match?
         [{:value "name.where()" :cursor 11}]
         (options-where {:text "name.where()" :cursor-start 8} [5 10])))

    ;; name.whe|re(expr) → name.where(expr)|
    (is (match?
         [{:value "name.where(expr)"
            ;; TODO: cursor is not working
           #_#_:cursor 16}]
         (options-where {:text "name.where(expr)" :cursor-start 8}
                        [5 10])))

    (is (= "name.where(expr).hui"
           (u/change-text-function "name.where(expr).hui"
                                   {:newText "where($0)"
                                    :kind :function
                                    :range {:start {:character 5}
                                            :end   {:character 10}}})))
    (is (= "name.first().hui"
           (u/change-text-function "name.first().hui"
                                   {:newText "first()"
                                    :range {:start {:character 5}
                                            :end   {:character 10}}})))

;; TODO: how to do it?
    #_(is (= "name.where(expr)"
             (u/change-text "name.where(expr"
                            {:newText "where($0)"
                             :range {:start {:character 5}
                                     :end   {:character 10}}})))

    ;; 	TODO: name.|where(expr) → name.where(expr)|
    ;; 	name.whe|re( → name.where(|)
    ;; TODO: fix this
    #_(is (match?
           [{:value "name.where()" :cursor 11}]
           (options-where {:text "name.where(" :cursor-start 8} [5 10])))))

(comment
  (run-test ui-options-field-test)
  (run-test ui-options-function-test)
  (run-tests))

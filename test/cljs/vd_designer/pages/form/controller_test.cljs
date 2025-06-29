(ns vd-designer.pages.form.controller-test
  (:require
   [cljs.test :refer-macros [deftest is run-test testing run-tests]]
   [matcher-combinators.test :refer [match?]]
   [vd-designer.pages.form.controller :refer [move collect-all-node-paths] :as sut]))

(deftest move-test
  (testing "Same level leafs"
    (is (match?
         {:select [{:column ['leaf-2
                             'leaf-1]}]}
         (move
          {:select [{:column ['leaf-1
                              'leaf-2]}]}
          [:select 0 :column 0]
          [:select 0 :column 1])))

    (is (match?
         {:select [{:column ['leaf-2
                             'leaf-1]}]}
         (move
          {:select [{:column ['leaf-1
                              'leaf-2]}]}
          [:select 0 :column 1]
          [:select 0 :column])))

    (testing "1 2 3 -> 2 1 3"
      (is (match?
           {:select [{:column ['leaf-2
                               'leaf-1
                               'leaf-3]}]}
           (move
            {:select [{:column ['leaf-1
                                'leaf-2
                                'leaf-3]}]}
            [:select 0 :column 1]
            [:select 0 :column]))))

    (testing "1 2 3 -> 2 3 1"
      (is (match?
           {:select [{:column ['leaf-2
                               'leaf-3
                               'leaf-1]}]}
           (move
            {:select [{:column ['leaf-1
                                'leaf-2
                                'leaf-3]}]}
            [:select 0 :column 0]
            [:select 0 :column 2]))))

    (testing "1 2 3 -> 1 3 2"
      (is (match?
           {:select [{:column ['leaf-1
                               'leaf-3
                               'leaf-2]}]}
           (move
            {:select [{:column ['leaf-1
                                'leaf-2
                                'leaf-3]}]}
            [:select 0 :column 1]
            [:select 0 :column 2]))))

    (testing "1 2 3 -> 3 1 2"
      (is (match?
           {:select [{:column ['leaf-3
                               'leaf-1
                               'leaf-2]}]}
           (move
            {:select [{:column ['leaf-1
                                'leaf-2
                                'leaf-3]}]}
            [:select 0 :column 2]
            [:select 0 :column])))))

  (testing "Different level leafs"
    (testing "[1][] -> [][1]"
      (is (match?
           {:select [{:column []}
                     {:column ['leaf-1]}]}
           (move
            {:select [{:column ['leaf-1]}
                      {:column []}]}
            [:select 0 :column 0]
            [:select 1 :column]))))

    (testing "[1][2] -> [][1 2]"
      (is (match?
           {:select [{:column []}
                     {:column ['leaf-1
                               'leaf-2]}]}
           (move
            {:select [{:column ['leaf-1]}
                      {:column ['leaf-2]}]}
            [:select 0 :column 0]
            [:select 1 :column]))))

    (testing "[1 2 3][4] -> [1 2 4 3][]"
      (is (match?
           {:select [{:column ['leaf-1
                               'leaf-2
                               'leaf-4
                               'leaf-3]}
                     {:column []}]}
           (move
            {:select [{:column ['leaf-1
                                'leaf-2
                                'leaf-3]}
                      {:column ['leaf-4]}]}
            [:select 1 :column 0]
            [:select 0 :column 1])))))

  (testing "Nodes"
    (testing "to head"
      (is (match?
           {:select [{:column [2]}
                     {:column [1]}]}
           (move
            {:select [{:column [1]}
                      {:column [2]}]}
            [:select 1 :column]
            [:select]))))

    (testing "column to unionAll"
      (is (match?
           {:select [{:unionAll [{:column [1]}]}]}
           (move
            {:select [{:column [1]}
                      {:unionAll []}]}
            [:select 0 :column]
            [:select 1 :unionAll])))
      (is (match?
           {:select [{:unionAll [{:column [1]} {:column [2]}]}]}
           (move
            {:select [{:column [1]}
                      {:unionAll [{:column [2]}]}]}
            [:select 0 :column]
            [:select 1 :unionAll]))))

    (testing "forEach to unionAll"
      (doseq [foreach [:forEach :forEachOrNull]]
        (is (match?
             {:select [{:unionAll [{foreach "name"}]}]}
             (move
              {:select [{foreach "name"}
                        {:unionAll []}]}
              [:select 0 foreach]
              [:select 1 :unionAll])))
        (is (match?
             {:select [{:unionAll [{foreach "name"}
                                   {:column [1]}]}]}
             (move
              {:select [{foreach "name"}
                        {:unionAll [{:column [1]}]}]}
              [:select 0 foreach]
              [:select 1 :unionAll])))))

    (testing "column to forEach"
      (is (match?
           {:select [{:unionAll [{:forEach "name"
                                  :select  [{:column [1]}
                                            {:column [2]}]}]}]}
           (move
            {:select [{:column [1]}
                      {:unionAll [{:forEach "name"
                                   :select  [{:column [2]}]}]}]}
            [:select 0 :column]
            [:select 1 :unionAll 0 :select]))))

    (testing "nested cases"
      (is (match?
           {:select
            [{:forEach  'expr
              :select   [{:unionAll [{:column   [1 2]
                                      :tree/key 'k1}]
                          :tree/key 'k2}]
              :tree/key 'k3}]}
           (move {:select
                  [{:column   [1 2]
                    :tree/key 'k1}
                   {:forEach  'expr
                    :select   [{:unionAll []
                                :tree/key 'k2}]
                    :tree/key 'k3}]}
                 [:select 0 :column]
                 [:select 1 :select 0 :unionAll])))

      (is (match?
           {:select [{:unionAll [{:column ['leaf1
                                           'leaf2]
                                  :tree/key 'k1}
                                 {:column ['leaf3]
                                  :tree/key 'k2}]
                      :tree/key 'k3
                      :select nil}
                     {:forEach 'expr
                      :select []
                      :tree/key 'k5}]}

           (move {:select [{:forEach 'expr
                            :select [{:unionAll [{:column ['leaf1
                                                           'leaf2]
                                                  :tree/key 'k1}
                                                 {:column ['leaf3]
                                                  :tree/key 'k2}]
                                      :tree/key 'k3
                                      :select nil}]
                            :tree/key 'k5}]}
                 [:select 0 :select 0 :unionAll]
                 [:select])))))

  (is
   (match?
    {:select [{:unionAll
               [{:unionAll
                 [{:column
                   [{:name "" :path ""}]}
                  {:forEach ""
                   :select
                   [{:column [{:name "" :path ""}]}
                    {:column [{:name "" :path ""}]}
                    {:column [{:name "" :path ""}]}]}]}]}]}

    (move
     {:select [{:column [{:name "" :path ""}]}
               {:unionAll
                [{:unionAll
                  [{:column [{:name "" :path ""}]}
                   {:forEach ""
                    :select
                    [{:column [{:name "" :path ""}]}
                     {:column [{:name "" :path ""}]}]}]}]}]}
     [:select 0 :column]
     [:select 1 :unionAll 0 :unionAll 1 :select 0 :column] 1))))

(deftest empty-inputs-in-vd-test

  (is (= true (sut/empty-inputs-in-vd? {:select [{:column [{:path "" :name "1"}]}]})))

  (is (not= true (sut/empty-inputs-in-vd? {:select [{:column [{:path "1" :name "1"}]}]})))

  (is (= true (sut/empty-inputs-in-vd? {:name ""
                                        :resource ""
                                        :select [{:column [{:path "1" :name "1"}]}]}))))

(comment
  (run-test move-test)
  (run-tests))

(deftest strip-empty-collections-test
  (is (match?
       {:title    'title
        :resource "Patient"
        :select   ['col]}
       (sut/strip-empty-collections
        {:fhirVersion []
         :title       'title
         :extension   []
         :resource    "Patient"
         :select      ['col]})))

  (is (match?
       {:title    'title
        :resource "Patient"
        :select   []}
       (sut/strip-empty-collections
        {:title       'title
         :resource    "Patient"
         :select      []}))))

(deftest merge-and-strip-test
  (testing "just merging"
    (is (match?
         {:a 1, :b 2, :c 3}
         (sut/merge-and-strip {:a 1, :b 2}
                              {:c 3}))))
  (testing "overriding"
    (is (match?
         {:a 1, :b 3}
         (sut/merge-and-strip {:a 1, :b 2}
                              {:b 3}))))
  (testing "string erasing"
    (is (match?
         {:a 1}
         (sut/merge-and-strip {:a 1, :b "test"}
                              {:b ""})))
    (is (match?
         {:a 1}
         (sut/merge-and-strip {:a 1, :b "test"}
                              {:b nil}))))
  (testing "stripping empty collection"
    (is (match?
         {:a 1}
         (sut/merge-and-strip {:a 1, :b [1 2], :c {:d 3}}
                              {:b [], :c {}})))))

(deftest strip-empty-select-nodes-test
  (testing "strip empty column"
    (is (match?
         {:select [{:column []}]}
         (sut/strip-empty-select-nodes {:select [{:column [{:name "" :path "path"}]}]})))
    (is (match?
         {:select [{:column []}]}
         (sut/strip-empty-select-nodes {:select [{:column [{:name "name" :path ""}]}]})))
    (is (match?
         {:select [{:column [{:name "name" :path "path"}]}]}
         (sut/strip-empty-select-nodes {:select [{:column [{:name "name" :path "path"}]}]})))
    (is (match?
         {:select [{:column []}]}
         (sut/strip-empty-select-nodes {:select [{:column [{:name "" :path ""}]}]})))
    (is (match?
         {:select [{:column [{:name "name" :path "path"}]}]}
         (sut/strip-empty-select-nodes {:select [{:column [{:name "name" :path "path"}
                                                           {:name "" :path ""}]}]}))))
  (testing "strip empty forEach"
    (is (match?
         {:select []}
         (sut/strip-empty-select-nodes
          {:select
           [{:forEach ""
             :select  [{:column [{:name "a" :path "$this"}]}]}]})))
    (is (match?
         {:select []}
         (sut/strip-empty-select-nodes
          {:select
           [{:forEach ""
             :select  [{:column [{:name "a" :path "$this"}]}]}]})))
    (is (match?
         {:select
          [{:forEach "name"
            :select  [{:column []}]}]}
         (sut/strip-empty-select-nodes
          {:select
           [{:forEach "name"
             :select  [{:column [{:name "a" :path ""}]}]}]})))))

(deftest strip-empty-where-nodes-test
  (testing "strip empty where"
    (is (match?
         {}
         (sut/strip-empty-where-nodes {:where []}))))
  (testing "strip non empty where with empty node"
    (is (match?
         {}
         (sut/strip-empty-where-nodes {:where [{:path ""}]}))))
  (testing "strip non empty where with non empty node"
    (is (match?
         {:where [{:path "name"}]}
         (sut/strip-empty-where-nodes {:where [{:path "name"}]})))
    (is (match?
         {:where [{:path "name"}]}
         (sut/strip-empty-where-nodes {:where [{:path "name"}
                                               {:path ""}]})))))

(deftest collect-all-node-paths-test
  (testing "where, constant ignored"
    (is
     (=
      #{}
      (collect-all-node-paths {:where [{:tree/key 0}]
                               :constant [{:tree/key 1}]}))))

  (testing "one col"
    (is
     (=
      #{[:select 0 :column] [:select 0] [:select]}
      (collect-all-node-paths {:select [{:column []
                                         :tree/key 0}]}))))

  (testing "two cols"
    (is (=
         #{[:select 0 :column]
           [:select 1]
           [:select 0]
           [:select 1 :column]
           [:select]}
         (collect-all-node-paths {:select [{:column [{}]
                                            :tree/key 0}
                                           {:column [{}]
                                            :tree/key 1}]}))))

  (testing "col in foreach"
    (is (=
         #{[:select 0]
           [:select 0 :select 1 :column]
           [:select 0 :select]
           [:select]
           [:select 0 :select 1]}
         (collect-all-node-paths {:select [{:forEach "a"
                                            :select [{:column [{}]
                                                      :tree/key 1}]
                                            :tree/key 0}]}))))
  (testing "2 cols in foreach"
    (is (=
         #{[:select 0 :select 2]
           [:select 0]
           [:select 0 :select 2 :column]
           [:select 0 :select 1 :column]
           [:select 0 :select]
           [:select]
           [:select 0 :select 1]}
         (collect-all-node-paths {:select [{:forEach "a"
                                            :select [{:column [{}]
                                                      :tree/key 1}
                                                     {:column [{}]
                                                      :tree/key 2}]
                                            :tree/key 0}]}))))

  (testing "col in foreach + col"
    (is (=
         #{[:select 2 :column]
           [:select 2]
           [:select 0]
           [:select 0 :select 1 :column]
           [:select 0 :select]
           [:select]
           [:select 0 :select 1]}
         (collect-all-node-paths {:select [{:forEach "a"
                                            :select [{:column [{}]
                                                      :tree/key 1}]
                                            :tree/key 0}
                                           {:column [{}]
                                            :tree/key 2}]}))))

  (testing "unionAll"
    (is (=
         #{[:select 0 :unionAll 1 :column]
           [:select 0 :unionAll 1]
           [:select 0 :unionAll]
           [:select 0]
           [:select 0 :unionAll 2 :column]
           [:select 0 :unionAll 2]
           [:select]}
         (collect-all-node-paths {:select [{:unionAll [{:column {}
                                                        :tree/key 1}
                                                       {:column [{}]
                                                        :tree/key 2}]
                                            :tree/key 0}]})))))

(ns vd-designer.pages.vd-form.controller-test
  (:require
    [cljs.test :refer-macros [deftest is run-test testing run-tests]]
    [matcher-combinators.test :refer [match?]]
    [vd-designer.pages.vd-form.controller :refer [move] :as sut]))

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
  (run-tests)

  )

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

(ns vd-designer.pages.form.form.tree-test
  (:require [cljs.test :refer-macros [are deftest is run-test run-tests testing]]
            [vd-designer.pages.form.form.nodes.nodes :as nodes]
            [vd-designer.pages.form.form.tree :as tree]))

(deftest select->node-test
  (are [element node-type]
       (= node-type (nodes/determine-key element))

    {:select []}
    :select

    {:column []}
    :column

    {:unionAll []}
    :unionAll

    {:select  []
     :forEach "name"}
    :forEach

    {:select        []
     :forEachOrNull "name"}
    :forEach

    {:forEach "name"
     :select  []}
    :forEach))

(deftest drop-allowed?-test
  (testing "where -> where only"
    (is (tree/drop-allowed? [:where 'k1]
                            [:where]))
    (is (tree/drop-allowed? [:where 'k1]
                            [:where 'k2]))
    (is (not
         (tree/drop-allowed? [:where 'k1]
                             [:constant 'k2]))))

  (testing "constant -> constant only"
    (is (tree/drop-allowed? [:constant 'k1]
                            [:constant]))
    (is (tree/drop-allowed? [:constant 'k1]
                            [:constant 'k2]))
    (is (not
         (tree/drop-allowed? [:constant 'some-key]
                             [:where 'some-other-key]))))

  (testing "column leaf -> column leaf"
    (is (tree/drop-allowed? [:select 'k1 :column 'k2]
                            [:select 'k1 :column]))
    (is (tree/drop-allowed? [:select 'k1 :column 'k2]
                            [:select 'k1 :column 'k3]))
    (is (not
         (tree/drop-allowed? [:select 'k1 :column 'k2]
                             [:where 'k3]))))

  (testing "column node -> column node"
    (is (not
         (tree/drop-allowed? [:select 'k1 :column]
                             [:select 'k2 :column])))
    (is (not
         (tree/drop-allowed? [:select 'k1 :select 'k2 :column]
                             [:select 'k3 :column])))
    (is (not
         (tree/drop-allowed? [:select 'k1 :column]
                             [:select 'k2 :select 'k3 :column]))))

  (testing "column node -> forEach(orNull):select"
    ;; Sadly, dropping into an empty `forEach:select` is impossible by design
    (is (tree/drop-allowed? [:select 'k1 :column]
                            [:select 'k2 :select])))

  (testing "column node -> unionAll:select"
    (is (tree/drop-allowed? [:select 'k1 :column]
                            [:select 'k2 :select 'k3 :unionAll])))

  (testing "forEach(OrNull) -> unionAll:select"
    (is (tree/drop-allowed? [:select 'k1 :forEach]
                            [:select 'k2 :unionAll]))
    (is (tree/drop-allowed? [:select 'k1 :forEachOrNull]
                            [:select 'k2 :unionAll])))

  (testing "forEach(OrNull) -> forEach:select"
    (is (tree/drop-allowed? [:select 'k1 :forEach]
                            [:select 'k2 :select]))
    (is (tree/drop-allowed? [:select 'k1 :forEachOrNull]
                            [:select 'k2 :select])))

  (testing "unionAll -> unionAll:select"
    (is (tree/drop-allowed? [:select 'k1 :unionAll]
                            [:select 'k2 :unionAll])))

  (testing "change arrangement on one level"
    (testing "select 1 column -> select 0 column"
      (is (tree/drop-allowed? [:select 'k1 :column]
                              [:select]))
      (is (tree/drop-allowed? [:select 'k1 :forEach]
                              [:select]))

      (is (tree/drop-allowed? [:select 'k1 :forEachOrNull]
                              [:select]))

      (is (tree/drop-allowed? [:select 'k1 :unionAll]
                              [:select])))))

(deftest pointless-drag?-test
  (is (tree/pointless-drag?
       {:select   [{:column   [{:name 'whatever
                                :tree/key 'k2}]
                    :tree/key 'k1}]
        :tree/key 'k0}
       [:select 'k1 :column 'k2]
       [:select 'k1 :column]))

  (is (tree/pointless-drag?
       {:select   [{:column   [{:name     'n1
                                :tree/key 'k2}
                               {:name     'n2
                                :tree/key 'k3}]
                    :tree/key 'k1}]
        :tree/key 'k0}
       [:select 'k1 :column 'k3]
       [:select 'k1 :column 'k2])))

(comment
  (run-tests 'vd-designer.pages.form.form.tree-test)
  (run-test drop-allowed?-test))

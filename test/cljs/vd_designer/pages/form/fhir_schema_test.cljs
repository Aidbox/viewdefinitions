(ns vd-designer.pages.form.fhir-schema-test
  (:require [cljs.test :as t :refer [is testing deftest]]
            [vd-designer.pages.form.fhir-schema :refer [get-constant-type collect-all-node-paths]]))

(deftest constant-type-test
  (is (= :valueString  (get-constant-type {:valueString "abc"})))
  (is (= :valueBoolean (get-constant-type {:valueBoolean true})))
  (is (= nil (get-constant-type {:a 1})))
  (is (= nil (get-constant-type {}))))

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

(comment
  (t/run-tests 'vd-designer.pages.form.fhir-schema-test))

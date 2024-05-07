(ns vd-designer.pages.vd-form.components-test
  (:require [clojure.test :refer-macros [deftest testing is]]
            [matcher-combinators.test :refer [match?]]
            [vd-designer.pages.vd-form.components :as sut]))

(deftest cons-prev-text-test 
  (testing "Empty both"
    (is (match? [{:value "" :cursor 0}]
                (sut/cons-prev-text "" 0 [{:value ""}]))))
  (testing "Empty prev text"
    (is (match? [{:value "name" :cursor 4}]
                (sut/cons-prev-text "" 0 [{:value "name" :cursor 4}]))))
  (testing "Empty value"
    (is (match? [{:value "name" :cursor 4}]
                (sut/cons-prev-text "name" 4 [{:value "" :cursor 0}]))))
  (testing "Both not empty"
    (is (match? [{:value "name.family" :cursor 11}]
                (sut/cons-prev-text "name." 5 [{:value "family" :cursor 6}]))))
  (testing "Insert into a middle of text"
    (is (match? [{:value "name" :cursor 4}]
                (sut/cons-prev-text "name" 2 [{:value "me" :cursor 2}]))))
  (testing "Insert into a start of text"
    (is (match? [{:value "name" :cursor 4}]
                (sut/cons-prev-text "name" 0 [{:value "name" :cursor 4}]))))
  (testing "Insert into a start of text"
    (is (match? [{:value "namee" :cursor 4}]
                (sut/cons-prev-text "nae" 2 [{:value "me" :cursor 2}])))))
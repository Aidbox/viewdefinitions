(ns vd-designer.utils.http-test
  (:require [clojure.test :refer :all]
            [vd-designer.utils.http :refer [get-header]]))

(deftest get-header-test
  (testing "gets header value by str name"
    (is (= "test"
           (get-header {:headers {"authorization" "test"}} "Authorization")))

    (is (= "test"
           (get-header {:headers {"authorization" "test"}} "authorization")))

    (is (= "test"
           (get-header {:headers {:authorization "test"}} "Authorization")))

    (is (= "test"
           (get-header {:headers {:Authorization "test"}} "authorization"))))

  (testing "gets header value by keyword name"
    (is (= "test"
           (get-header {:headers {"authorization" "test"}} :Authorization)))

    (is (= "test"
           (get-header {:headers {"authorization" "test"}} :authorization)))

    (is (= "test"
           (get-header {:headers {:authorization "test"}} :Authorization)))

    (is (= "test"
           (get-header {:headers {:Authorization "test"}} :authorization))))

  (testing "returns nil if there is no header"
    (is (= nil
           (get-header {:headers {:Authorization "test"}} :empty)))))

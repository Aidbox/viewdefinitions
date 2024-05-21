(ns vd-designer.utils.base64-test
  (:require [clojure.test :refer :all]
            [vd-designer.utils.base64 :refer [decode encode]]))

(deftest decode-test
  (testing "Decoding a base64 encoded string"
    (is (= "hello" (decode "aGVsbG8=")))
    (is (= "Hello, World!" (decode "SGVsbG8sIFdvcmxkIQ=="))))

  (testing "Decoding an empty string"
    (is (= "" (decode ""))))

  (testing "Decoding an invalid base64 string"
    (is (thrown? java.lang.IllegalArgumentException (decode "<invalid base64>")))))

(deftest encode-test
  (testing "Encoding a string to base64"
    (is (= "aGVsbG8=" (encode "hello")))
    (is (= "SGVsbG8sIFdvcmxkIQ==" (encode "Hello, World!"))))

  (testing "Encoding an empty string"
    (is (= "" (encode "")))))

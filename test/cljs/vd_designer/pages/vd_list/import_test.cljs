(ns vd-designer.pages.lists.vds.import-test
  (:require [cljs.test :refer [deftest is testing run-tests]]
            [vd-designer.pages.lists.vds.import :refer [parse-vd]]))

(deftest parse-vd-test
  (testing "parses valid YAML string"
    (is (= {:key1 "value1" :key2 "value2"}
           (parse-vd "key1: value1\nkey2: value2"))))

  (testing "parses valid YAML string with comments"
    (is (= {:key1 "value1" :key2 "value2"}
           (parse-vd "#comment\nkey1: value1 # comment\nkey2: value2"))))

  (testing "handles empty string"
    (is (= nil (parse-vd ""))))

  (testing "parses valid JSON string"
    (is (= {:key1 "value1" :key2 "value2"}
           (parse-vd "{\"key1\":\"value1\",\n\"key2\":\"value2\"}"))))

  (testing "parses valid JSON string with comments"
    (is (= {:key1 "value1" :key2 "value2"}
           (parse-vd "//comment\n{\"key1\":\"value1\", // comment\n\"key2\":\"value2\"}"))))

  (testing "parses valid JSON string with multiline comment"
    (is (= {:key1 "value1"}
           (parse-vd "/*\ncomment\n*/\n{\"key1\":\"value1\"}")))))

(comment
  (run-tests vd-designer.pages.lists.vds.import-test))

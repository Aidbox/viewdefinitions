(ns vd-designer.pages.form.fhir-schema-test
  (:require [cljs.test :as t :refer [is]]
            [vd-designer.pages.form.fhir-schema :refer [get-constant-type]]))

(t/deftest constant-type-test
  (is (= :valueString  (get-constant-type {:valueString "abc"})))
  (is (= :valueBoolean (get-constant-type {:valueBoolean true})))
  (is (= nil (get-constant-type {:a 1})))
  (is (= nil (get-constant-type {}))))

(comment
  (t/run-tests 'vd-designer.pages.form.fhir-schema-test))

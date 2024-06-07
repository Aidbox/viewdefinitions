(ns vd-designer.pages.form.components-test
  (:require [clojure.test :refer-macros [deftest testing is run-tests]]
            [matcher-combinators.test :refer [match?]]
            [vd-designer.pages.form.components :as sut]))

(deftest fhirpath-name-test
  (is (= "multipleBirth" (sut/fhirpath-alias "multipleBirth.ofType(boolean)")))
  (is (= "name" (sut/fhirpath-alias "name")))
  (is (= "name" (sut/fhirpath-alias "name.where(h=p)")))
  (is (= "name" (sut/fhirpath-alias "name.first()"))))


(comment
  (run-tests vd-designer.pages.form.components-test))

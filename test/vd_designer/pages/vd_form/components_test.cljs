(ns vd-designer.pages.vd-form.components-test
  (:require [clojure.string :as str]
            [clojure.test :refer-macros [are deftest is testing run-test]]
            [matcher-combinators.test :refer [match?]]
            [matcher-combinators.matchers :as m]
            [vd-designer.pages.vd-form.components :refer [get-completed-text]]))

(comment
  (run-test get-completed-text-test)
  )

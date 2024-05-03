(ns vd-designer.pages.vd-form.components-test
  (:require [clojure.string :as str]
            [clojure.test :refer-macros [are deftest is testing run-test]]
            [matcher-combinators.test :refer [match?]]
            [matcher-combinators.matchers :as m]
            [vd-designer.pages.vd-form.components :refer [get-completed-text]]))

(defn res->pattern [{:keys [pos text]}]
  (str (subs text 0 pos)
       "|"
       (subs text pos)))

(deftest get-completed-text-test
  (are [pattern v exp]
    (match? (m/via res->pattern exp)
            (get-completed-text {:label      'whatever
                                 :value      (str/replace v \| "")
                                 :cursor-pos (str/index-of v \|)}
                                (str/replace pattern \| "")
                                (str/index-of pattern \|)))

    "name.fa|mily"
    "mily|"
    "name.family|"

    "name.fa|nta"
    "mily|"
    "name.family|nta"
    ))

(comment
  (run-test get-completed-text-test)
  )

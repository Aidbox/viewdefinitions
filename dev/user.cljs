(ns cljs.user
  "Commonly used symbols for easy access in the ClojureScript REPL during
  development."
  (:require
    [cljs.repl :refer (Error->map apropos dir doc error->str ex-str ex-triage
                       find-doc print-doc pst source)]
    [clojure.pprint :refer (pprint)]
    [vd-designer.pages.vd-form.controller :as sut]
    [cljs.test :refer-macros [deftest is testing run-tests]]
    [clojure.string :as str]))

(deftest normalize-view-test
  (def view-suggar
    {:resource "Patient",
     :select [{:column [{:path "id", :name "id", :type "id"}]}
              {:forEach "contact",
               :column [{:path "telecom.system",
                         :name "tel_system",
                         :type "code"}],
               :select [{:column [{:path "gender",
                                   :name "gender",
                                   :type "code"}]}],
               :unionAll [{:column [{:path "name.family",
                                     :name "name",
                                     :type "string"}]}
                          {:forEach "name.given",
                           :column [{:path "$this",
                                     :name "name",
                                     :type "string"}]}]}]})
  (def view-nested
    {:resource "Patient",
     :select [{:column [{:path "id", :name "id", :type "id"}]}
              {:forEach "contact",
               :select [{:column [{:path "gender",
                                   :name "gender",
                                   :type "code"}
                                  {:path "telecom.system",
                                   :name "tel_system",
                                   :type "code"}]}
                        {:unionAll [{:column [{:path "name.family",
                                               :name "name",
                                               :type "string"}]}
                                    {:forEach "name.given",
                                     :select [{:column
                                               [{:path "$this",
                                                 :name "name",
                                                 :type "string"}]}]}]}]}]})

  (is (= (sut/normalize-view view-suggar) view-nested))

  )

(cljs.test/run-tests)

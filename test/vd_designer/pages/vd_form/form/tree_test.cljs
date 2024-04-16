(ns vd-designer.pages.vd-form.form.tree-test
  (:require [cljs.test :as t]
            [vd-designer.pages.vd-form.form.tree :refer [determine-key]]))

(t/deftest select->node-test
  (t/are [element node-type]
         (= node-type (determine-key element))

    {:select []}
    :select

    {:column []}
    :column

    {:unionAll []}
    :unionAll

    {:select []
     :forEach "name"}
    :forEach

    {:select []
     :forEachOrNull "name"}
    :forEachOrNull

    {:forEach "name"
     :select  []}
    :forEach))

(comment
  (t/run-tests 'vd-designer.pages.vd-form.form.tree-test))

(ns vd-designer.utils.collection-test
  (:require [clojure.test :refer :all]
            [vd-designer.utils.collection :refer [conj-if-new]]))

(deftest conj-if-new-test
  (is (= [1]
         (conj-if-new nil 1)))
  (is (= [1]
         (conj-if-new [] 1)))
  (is (= [1 2 3 4 5]
         (conj-if-new [1 2 3 4 5] 3)))
  (is (= [1 2 3 4 5]
         (conj-if-new [1 2 3 4] 5))))

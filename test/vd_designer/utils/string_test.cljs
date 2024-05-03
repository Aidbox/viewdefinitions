(ns vd-designer.utils.string-test
  (:require [clojure.test :refer-macros [deftest is testing are run-test]]
            [vd-designer.utils.string :refer [tail-head-intersection]]))

(deftest tail-head-intersection-test
  (is (= 0 (tail-head-intersection nil nil)))
  (is (= 0 (tail-head-intersection "" nil)))
  (is (= 0 (tail-head-intersection nil "")))
  (is (= 0 (tail-head-intersection "" "")))
  (is (= 0 (tail-head-intersection "12" "1")))

  (is (= 1 (tail-head-intersection "a" "a")))
  (is (= 0 (tail-head-intersection "ab" "a")))
  (is (= 1 (tail-head-intersection "a" "ab")))

  (is (= 2 (tail-head-intersection ".12" "12...")))
  (is (= 3 (tail-head-intersection "name.fir" "first()")))

  (is (= 6 (tail-head-intersection "s1_ababab" "ababab()"))))

(ns vd-designer.utils.utils-test
  (:require [cljs.test :refer-macros [deftest is run-tests]]
            [vd-designer.utils.utils :refer [insert-after
                                             insert-at
                                             remove-by-index]]))

(deftest remove-by-index-test
  (is (= [2 3]
         (remove-by-index [1 2 3] 0)))
  (is (= [1 3]
         (remove-by-index [1 2 3] 1)))
  (is (= [1 2]
         (remove-by-index [1 2 3] 2)))
  (is (thrown-with-msg?
        js/Error
        #"Index out of bounds"
        (remove-by-index [1 2 3] 3))))

(deftest insert-at-test
  (is (= [5 1 2 3]
         (insert-at [1 2 3] 0 5)))
  (is (= [1 5 2 3]
         (insert-at [1 2 3] 1 5)))
  (is (= [1 2 3 5]
         (insert-at [1 2 3] 3 5)))
  (is (thrown-with-msg?
        js/Error
        #"Index out of bounds"
        (insert-at [1 2 3] 4 5))))

(deftest insert-after-test
  (is (= [1 5 2 3]
         (insert-after [1 2 3] 0 5)))
  (is (= [1 2 5 3]
         (insert-after [1 2 3] 1 5)))
  (is (= [1 2 3 5]
         (insert-after [1 2 3] 2 5)))
  (is (thrown-with-msg?
        js/Error
        #"Index out of bounds"
        (insert-after [1 2 3] 3 5))))

(comment
  (run-tests 'vd-designer.utils.utils-test)
  )

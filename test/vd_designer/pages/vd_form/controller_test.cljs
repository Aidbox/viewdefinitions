(ns vd-designer.pages.vd-form.controller-test
  (:require
    [cljs.test :refer [deftest is run-test testing]]
    [matcher-combinators.test :refer [match?]]
    [vd-designer.pages.vd-form.controller :refer [move]]))

(deftest move-test
  (testing "Same level leafs"
    (is (match?
          {:select [{:column ['leaf-2
                              'leaf-1]}]}
          (move
            {:select [{:column ['leaf-1
                                'leaf-2]}]}
            [:select 0 :column 0]
            [:select 0 :column 1])))

    (is (match?
          {:select [{:column ['leaf-1
                              'leaf-2]}]}
          (move
            {:select [{:column ['leaf-1
                                'leaf-2]}]}
            [:select 0 :column 1]
            [:select 0 :column 0])))

    ;; FIXME: in this case deletion and insertion happens anyway
    (is (match?
          {:select [{:column ['leaf-1
                              'leaf-2]}]}
          (move
            {:select [{:column ['leaf-1
                                'leaf-2]}]}
            [:select 0 :column 0]
            [:select 0 :column])))

    (is (match?
          {:select [{:column ['leaf-2
                              'leaf-1]}]}
          (move
            {:select [{:column ['leaf-1
                                'leaf-2]}]}
            [:select 0 :column 1]
            [:select 0 :column])))

    (testing "1 2 3 -> 2 1 3"
      (is (match?
            {:select [{:column ['leaf-2
                                'leaf-1
                                'leaf-3]}]}
            (move
              {:select [{:column ['leaf-1
                                  'leaf-2
                                  'leaf-3]}]}
              [:select 0 :column 1]
              [:select 0 :column]))))

    (testing "1 2 3 -> 2 3 1"
      (is (match?
            {:select [{:column ['leaf-2
                                'leaf-3
                                'leaf-1]}]}
            (move
              {:select [{:column ['leaf-1
                                  'leaf-2
                                  'leaf-3]}]}
              [:select 0 :column 0]
              [:select 0 :column 2]))))

    (testing "1 2 3 -> 1 3 2"
      (is (match?
            {:select [{:column ['leaf-1
                                'leaf-3
                                'leaf-2]}]}
            (move
              {:select [{:column ['leaf-1
                                  'leaf-2
                                  'leaf-3]}]}
              [:select 0 :column 1]
              [:select 0 :column 2]))))

    (testing "1 2 3 -> 3 1 2"
      (is (match?
            {:select [{:column ['leaf-3
                                'leaf-1
                                'leaf-2]}]}
            (move
              {:select [{:column ['leaf-1
                                  'leaf-2
                                  'leaf-3]}]}
              [:select 0 :column 2]
              [:select 0 :column])))))

  #_(testing "Different level leafs"
      (is (match?
            {:select
             [{:column ['leaf-1
                        'leaf-2],}
              {:column   ['leaf-3],
               :tree/key 'bla}]
             }

            ))
      )
  )


;; test cases
(comment
  ;; На самых верх
  [:select 0 :column 1]
  [:select 1 :column 0]

  (-> @re-frame.db/app-db :current-vd :select)
  )


(comment
  (run-test move-test)
  )

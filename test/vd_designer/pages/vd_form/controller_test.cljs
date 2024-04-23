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

  (testing "Different level leafs"
    (testing "[1][] -> [][1]"
      (is (match?
            {:select [{:column []}
                      {:column ['leaf-1]}]}
            (move
              {:select [{:column ['leaf-1]}
                        {:column []}]}
              [:select 0 :column 0]
              [:select 1 :column]))))

    (testing "[1][2] -> [][1 2]"
      (is (match?
            {:select [{:column []}
                      {:column ['leaf-1
                                'leaf-2]}]}
            (move
              {:select [{:column ['leaf-1]}
                        {:column ['leaf-2]}]}
              [:select 0 :column 0]
              [:select 1 :column]))))

    (testing "[1 2 3][4] -> [1 2 4 3][]"
      (is (match?
            {:select [{:column ['leaf-1
                                'leaf-2
                                'leaf-4
                                'leaf-3]}
                      {:column []}]}
            (move
              {:select [{:column ['leaf-1
                                  'leaf-2
                                  'leaf-3]}
                        {:column ['leaf-4]}]}
              [:select 1 :column 0]
              [:select 0 :column 1])))))

  (testing "Nodes"
    (testing "to head"
      (is (match?
            {:select [{:column [2]}
                      {:column [1]}]}
            (move
              {:select [{:column [1]}
                        {:column [2]}]}
              [:select 1 :column]
              [:select]))))

    (testing "column to unionAll"
      (is (match?
            {:select [{:unionAll [{:column [1]}]}]}
            (move
              {:select [{:column [1]}
                        {:unionAll []}]}
              [:select 0 :column]
              [:select 1 :unionAll])))
      (is (match?
            {:select [{:unionAll [{:column [1]} {:column [2]}]}]}
            (move
              {:select [{:column [1]}
                        {:unionAll [{:column [2]}]}]}
              [:select 0 :column]
              [:select 1 :unionAll]))))

    (testing "forEach to unionAll"
      (doseq [foreach [:forEach :forEachOrNull]]
        (is (match?
              {:select [{:unionAll [{foreach "name"}]}]}
              (move
                {:select [{foreach "name"}
                          {:unionAll []}]}
                [:select 0 foreach]
                [:select 1 :unionAll])))
        (is (match?
              {:select [{:unionAll [{foreach "name"}
                                    {:column [1]}]}]}
              (move
                {:select [{foreach "name"}
                          {:unionAll [{:column [1]}]}]}
                [:select 0 foreach]
                [:select 1 :unionAll])))))

    (testing "column to unionAll"
      (is (match?
            {:select [{:unionAll [{:forEach "name"
                                   :select [{:column [1]}
                                            {:column [2]}]}]}]}
            (move
              {:select [{:column [1]}
                        {:unionAll [{:forEach "name"
                                     :select [{:column [2]}]}]}]}
              [:select 0 :column]
              [:select 1 :unionAll 0 :select]))))))


;; test cases
(comment
  ;; На самых верх
  [:select 0 :column 1]
  [:select 1 :column 0]

  (-> @re-frame.db/app-db :current-vd)
  )


(comment
  (run-test move-test)
  )

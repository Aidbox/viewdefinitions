(ns vd-designer.pages.vd-form.normalization-test
  (:require
   [cljs.test :as t]
   [vd-designer.pages.vd-form.normalization :as normalization]))
   
(t/deftest normalization-test
  (t/testing "Empty Select"
    (t/is 
     (= {:select []}
        (normalization/normalize-vd
         {:select []}))))
  (t/testing "One column"
    (t/is
     (= {:select [{:column [{:path "id", :name "id", :type "id"}]}]}
        (normalization/normalize-vd
         {:select [{:column [{:path "id", :name "id", :type "id"}]}]}))))
  (t/testing "Several columns"
    (t/testing "In several selections"
      (t/is
       (= {:select [{:column [{:path "id", :name "id", :type "id"}]}
                    {:column [{:path "id", :name "id2", :type "id"}]}]}
          (normalization/normalize-vd
           {:select [{:column [{:path "id", :name "id", :type "id"}]}
                     {:column [{:path "id", :name "id2", :type "id"}]}]}))))
    (t/testing "In one selections"
      (t/is
       (= {:select [{:column [{:path "id", :name "id", :type "id"}
                              {:path "id", :name "id2", :type "id"}]}]}
          (normalization/normalize-vd
           {:select [{:column [{:path "id", :name "id", :type "id"}
                               {:path "id", :name "id2", :type "id"}]}]}))))
    (t/testing "Column and select"
      (t/is
       (= {:select [{:select [{:column [{:path "id", :name "id", :type "id"}]}
                              {:column [{:path "id", :name "id2", :type "id"}]}]}]}
          (normalization/normalize-vd
           {:select [{:column [{:path "id", :name "id", :type "id"}]
                      :select [{:column [{:path "id", :name "id2", :type "id"}]}]}]}))))
    (t/testing "Union with column within should stay the same"
      (t/is
       (= {:select [{:unionAll [{:column [{:path "id", :name "id", :type "id"}]}]}]}
          (normalization/normalize-vd
           {:select [{:unionAll [{:column [{:path "id", :name "id", :type "id"}]}]}]}))))
    (t/testing "Union should be normalized"
      (t/is
       (= {:select [{:unionAll [{:select [{:column [{:path "id", :name "id", :type "id"}]}
                                          {:column [{:path "id", :name "id2", :type "id"}]}]}]}]}
          (normalization/normalize-vd
           {:select [{:unionAll [{:column [{:path "id", :name "id", :type "id"}]
                                  :select [{:column [{:path "id", :name "id2", :type "id"}]}]}]}]}))))
    (t/testing "Column and forEach"
      (t/is
       (= {:select [{:forEach "name"
                     :select [{:column [{:path "given", :name "given", :type "id"}]}]}]}
          (normalization/normalize-vd
           {:select [{:column [{:path "given", :name "given", :type "id"}]
                      :forEach "name"}]})))
      (t/is
       (= {:select [{:forEachOrNull "name"
                     :select [{:column [{:path "given", :name "given", :type "id"}]}]}]}
          (normalization/normalize-vd
           {:select [{:column [{:path "given", :name "given", :type "id"}]
                      :forEachOrNull "name"}]}))))
    (t/testing "Column in select and forEach"
      (t/is
       (= {:select [{:forEach "name"
                     :select [{:column [{:path "given", :name "given", :type "id"}]}]}]}
          (normalization/normalize-vd
           {:select [{:select [{:column [{:path "given", :name "given", :type "id"}]}]
                      :forEach "name"}]})))
      (t/is
       (= {:select [{:forEachOrNull "name"
                     :select [{:column [{:path "given", :name "given", :type "id"}]}]}]}
          (normalization/normalize-vd
           {:select [{:select [{:column [{:path "given", :name "given", :type "id"}]}]
                      :forEachOrNull "name"}]}))))
    (t/testing "Union and forEach"
      (t/is
       (= {:select [{:forEach "name"
                     :select [{:unionAll [{:column [{:path "given", :name "given", :type "id"}]}]}]}]}
          (normalization/normalize-vd
           {:select [{:unionAll [{:column [{:path "given", :name "given", :type "id"}]}]
                      :forEach "name"}]})))
      (t/is
       (= {:select [{:forEachOrNull "name"
                     :select [{:unionAll [{:column [{:path "given", :name "given", :type "id"}]}]}]}]}
          (normalization/normalize-vd
           {:select [{:unionAll [{:column [{:path "given", :name "given", :type "id"}]}]
                      :forEachOrNull "name"}]}))))
    (t/testing "Union, column and forEach"
      (t/is
       (= {:select [{:forEach "name"
                     :select [{:column [{:path "family", :name "family", :type "id"}]}
                              {:unionAll [{:column [{:path "given", :name "given", :type "id"}]}
                                          {:column [{:path "given", :name "given", :type "id"}]}]}]}]}
          (normalization/normalize-vd
           {:select [{:unionAll [{:column [{:path "given", :name "given", :type "id"}]}
                                 {:column [{:path "given", :name "given", :type "id"}]}]
                      :column [{:path "family", :name "family", :type "id"}]
                      :forEach "name"}]})))
      (t/is
       (= {:select [{:forEachOrNull "name"
                     :select [{:column [{:path "family", :name "family", :type "id"}]}
                              {:unionAll [{:column [{:path "given", :name "given", :type "id"}]}
                                          {:column [{:path "given", :name "given", :type "id"}]}]}]}]}
          (normalization/normalize-vd
           {:select [{:unionAll [{:column [{:path "given", :name "given", :type "id"}]}
                                 {:column [{:path "given", :name "given", :type "id"}]}]
                      :column [{:path "family", :name "family", :type "id"}]
                      :forEachOrNull "name"}]}))))
    (t/testing "Union, column, select and forEach"
      (t/is
       (= {:select [{:forEach "name"
                     :select [{:column [{:path "family", :name "family", :type "id"}]}
                              {:column [{:path "id", :name "id", :type "id"}]}
                              {:unionAll [{:column [{:path "given", :name "given", :type "id"}]}
                                          {:column [{:path "given", :name "given", :type "id"}]}]}]}]}
          (normalization/normalize-vd
           {:select [{:unionAll [{:column [{:path "given", :name "given", :type "id"}]}
                                 {:column [{:path "given", :name "given", :type "id"}]}]
                      :select [{:column [{:path "id", :name "id", :type "id"}]}]
                      :column [{:path "family", :name "family", :type "id"}]
                      :forEach "name"}]})))
      (t/is
       (= {:select [{:forEachOrNull "name"
                     :select [{:column [{:path "family", :name "family", :type "id"}]}
                              {:column [{:path "id", :name "id", :type "id"}]}
                              {:unionAll [{:column [{:path "given", :name "given", :type "id"}]}
                                          {:column [{:path "given", :name "given", :type "id"}]}]}]}]}
          (normalization/normalize-vd
           {:select [{:unionAll [{:column [{:path "given", :name "given", :type "id"}]}
                                 {:column [{:path "given", :name "given", :type "id"}]}]
                      :select [{:column [{:path "id", :name "id", :type "id"}]}]
                      :column [{:path "family", :name "family", :type "id"}]
                      :forEachOrNull "name"}]}))))
    (t/testing "Nested select"
      (t/is
       (= {:select [{:forEach "name"
                     :select [{:select [{:column [{:path "$this", :name "name", :type "id"}]}
                                        {:unionAll [{:column [{:path "id", :name "id", :type "id"}]}]}]
                               :forEach "given"}]}]}
          (normalization/normalize-vd
           {:select [{:select [{:column [{:path "$this", :name "name", :type "id"}]
                                :select [{:unionAll [{:column [{:path "id", :name "id", :type "id"}]}]}]
                                :forEach "given"}]
                      :forEach "name"}]})))
      (t/is
       (= {:select [{:forEach "name"
                     :select [{:select [{:column [{:path "$this", :name "name", :type "id"}]}
                                        {:unionAll [{:column [{:path "id", :name "id", :type "id"}]}]}]
                               :forEachOrNull "given"}]}]}
          (normalization/normalize-vd
           {:select [{:select [{:column [{:path "$this", :name "name", :type "id"}]
                                :select [{:unionAll [{:column [{:path "id", :name "id", :type "id"}]}]}]
                                :forEachOrNull "given"}]
                      :forEach "name"}]}))))))

(comment
  (t/run-tests 'vd-designer.pages.vd-form.normalization-test)
  )


(ns vd-designer.pages.vd-form.form.uuid-decoration-test
  (:require [cljs.test :refer [deftest run-tests is]]
            [matcher-combinators.test :refer [match?]]
            [vd-designer.pages.vd-form.form.uuid-decoration :refer [decorate
                                                                    remove-decoration
                                                                    uuid->idx]]))

(defn uuid-str? [o]
  (-> o parse-uuid boolean))

(def raw-vd
  {:name     "unnesting",
   :select   [{:column [{:name "id"
                         :path "id"}]}
              {:select  [{:column [{:name "family_name"
                                    :path "family"}]}
                         {:forEach "given",
                          :select  [{:column [{:name "given_name"
                                               :path "$this"}]}]}],
               :forEach "name"}],
   :constant [{:name        "sbp_component",
               :valueString "component.where(code.coding.exists(system='http://loinc.org' and code='8480-6')).first()"}
              {:name        "dbp_component",
               :valueString "component.where(code.coding.exists(system='http://loinc.org' and code='8462-4')).first()"}],
   :where    [{:path "code.coding.exists(system='http://loinc.org' and code='85354-9')"}
              {:path "%sbp_component.dataAbsentReason.empty()"}
              {:path "%dbp_component.dataAbsentReason.empty()"}],
   :resource "Patient"})

(def raw-vd-with-id
  {:name     "unnesting",
   :select [{:column   [{:name     "id"
                         :path     "id"
                         :tree/key "46fe36c0-c43c-4599-a37f-32b40d50a157"}]
             :tree/key "e2d24fbf-0241-4839-ab27-a010afc1b52b"}
            {:select   [{:column   []
                         :tree/key "5bc906ff-dc27-4198-8200-10d6fd5493b6"}]
             :forEach  "name"
             :tree/key "2b37ccad-57e3-4d1e-8f97-e6f4c6944ff5"}]
   :constant [{:name        "sbp_component",
               :valueString "component.where(code.coding.exists(system='http://loinc.org' and code='8480-6')).first()"}
              {:name        "dbp_component",
               :valueString "component.where(code.coding.exists(system='http://loinc.org' and code='8462-4')).first()"}],
   :where    [{:path "code.coding.exists(system='http://loinc.org' and code='85354-9')"}
              {:path "%sbp_component.dataAbsentReason.empty()"}
              {:path "%dbp_component.dataAbsentReason.empty()"}]
   :resource "Patient"})

(deftest decorate-test
  (is (match?
       {:name     "unnesting",
        :select   [{:column   [{:name     "id"
                                :path     "id"
                                :tree/key uuid-str?}]
                    :tree/key uuid-str?}
                   {:select   [{:column   [{:name     "family_name"
                                            :path     "family"
                                            :tree/key uuid-str?}]
                                :tree/key uuid-str?}
                               {:forEach  "given",
                                :select   [{:column   [{:name     "given_name"
                                                        :path     "$this"
                                                        :tree/key uuid-str?}]
                                            :tree/key uuid-str?}]
                                :tree/key uuid-str?}],
                    :forEach  "name"
                    :tree/key uuid-str?}],
        :constant [{:name        "sbp_component",
                    :valueString "component.where(code.coding.exists(system='http://loinc.org' and code='8480-6')).first()"
                    :tree/key    uuid-str?}
                   {:name        "dbp_component",
                    :valueString "component.where(code.coding.exists(system='http://loinc.org' and code='8462-4')).first()"
                    :tree/key    uuid-str?}],
        :where    [{:path     "code.coding.exists(system='http://loinc.org' and code='85354-9')"
                    :tree/key uuid-str?}
                   {:path     "%sbp_component.dataAbsentReason.empty()"
                    :tree/key uuid-str?}
                   {:path     "%dbp_component.dataAbsentReason.empty()"
                    :tree/key uuid-str?}],
        :resource "Patient"}
       (decorate raw-vd))))

(deftest remove-decoration-test
  (is (match?
       raw-vd
       (remove-decoration
        {:name     "unnesting",
         :select   [{:column   [{:name     "id"
                                 :path     "id"
                                 :tree/key (str (random-uuid))}]
                     :tree/key (str (random-uuid))}
                    {:select   [{:column   [{:name     "family_name"
                                             :path     "family"
                                             :tree/key (str (random-uuid))}]
                                 :tree/key (str (random-uuid))}
                                {:forEach  "given",
                                 :select   [{:column   [{:name     "given_name"
                                                         :path     "$this"
                                                         :tree/key (str (random-uuid))}]
                                             :tree/key (str (random-uuid))}]
                                 :tree/key (str (random-uuid))}],
                     :forEach  "name"
                     :tree/key (str (random-uuid))}],
         :constant [{:name        "sbp_component",
                     :valueString "component.where(code.coding.exists(system='http://loinc.org' and code='8480-6')).first()"
                     :tree/key    (str (random-uuid))}
                    {:name        "dbp_component",
                     :valueString "component.where(code.coding.exists(system='http://loinc.org' and code='8462-4')).first()"
                     :tree/key    (str (random-uuid))}],
         :where    [{:path     "code.coding.exists(system='http://loinc.org' and code='85354-9')"
                     :tree/key (str (random-uuid))}
                    {:path     "%sbp_component.dataAbsentReason.empty()"
                     :tree/key (str (random-uuid))}
                    {:path     "%dbp_component.dataAbsentReason.empty()"
                     :tree/key (str (random-uuid))}],
         :resource "Patient"}))))

(deftest uuid->idx-test
  (is (match?
       [:select 0 :column]
       (uuid->idx [:select "e2d24fbf-0241-4839-ab27-a010afc1b52b"
                   :column]
                  raw-vd-with-id)))

  (is (match?
       [:select 1 :select]
       (uuid->idx [:select "2b37ccad-57e3-4d1e-8f97-e6f4c6944ff5"
                   :select]
                  raw-vd-with-id)))

  (is (match?
       [:select 1 :select 0 :column]
       (uuid->idx [:select "2b37ccad-57e3-4d1e-8f97-e6f4c6944ff5"
                   :select "5bc906ff-dc27-4198-8200-10d6fd5493b6"
                   :column]
                  raw-vd-with-id)))

  (is (nil? (+ 1 2))))

(comment
  (run-tests 'vd-designer.pages.vd-form.form.uuid-decoration-test))

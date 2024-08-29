(ns vd-designer.pages.form.resource-schema-tab.controller
  (:require [clojure.string :as str]
            [medley.core :as medley]))

(defn create-key [parent-key element-name]
  (if parent-key
    (str parent-key "-" (str/lower-case element-name))
    (str/lower-case element-name)))

(defn add-keys [option-name elements]
  (mapv
   (fn [element]
     (assoc element :key (create-key option-name (:option-name element))))
   elements))

(defn flat-elements
  "{:elements {:a {1 2 3 4}}} => [{:option-name a 1 2 3 4}] "
  [parent-element]
  (mapv
    (fn [[k v]]
      (assoc v :option-name (name k)
             :required (or (:required v)
                           (:required parent-element))))
    (:elements parent-element)))

(defn add-choices [master slaves]
  (assoc master :choices (get slaves (:option-name master))))

(defn group-choice-of
  "[{:option-name 'valueA' :choiceOf 'value'}
    {:option-name 'valueB' :choiceOf 'value'}
    {:option-name 'value' :choices ['valueA' 'valueB']}]
  =>
  [{:option-name 'value' :choices
    [{:option-name 'valueA' :choiceOf 'value'}
     {:option-name 'valueB' :choiceOf 'value'}]}]"
  [fhir-schemas]
  (let [masters
        (->>
         fhir-schemas
         (filter :choices))
        slaves
        (->> fhir-schemas
             (group-by :choiceOf)
             (medley/remove-keys nil?)
             (into {}))]
    (->> fhir-schemas
         (remove #(or (:choices %) (:choiceOf %)))
         (concat (mapv #(add-choices % slaves) masters)))))

(defn fhir-schema->options [resource-type fhir-schema]
  (let [k (create-key nil resource-type)]
    [{:option-name (or resource-type (:id fhir-schema) "")
      :key k
      :children (add-keys k (flat-elements fhir-schema))}]))

(defn pre-process-fhir-schema [fhir-schema]
  (->> fhir-schema
       flat-elements
       group-choice-of
       (sort-by :option-name)
       (add-keys (:option-name fhir-schema))))

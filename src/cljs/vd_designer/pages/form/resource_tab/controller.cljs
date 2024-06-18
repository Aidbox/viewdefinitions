(ns vd-designer.pages.form.resource-tab.controller
  (:require [clojure.string :as str]
            [re-frame.core :refer [dispatch inject-cofx reg-event-db
                                   reg-event-fx reg-fx]]
            [vd-designer.pages.form.model :as m]))


(defn create-key [parent-key element-name]
  (if parent-key
    (str parent-key "-" (str/lower-case element-name))
    (str/lower-case element-name)))

(defn option-name [element-name element]
  (cond
    element-name
    element-name

    (:id element)
    (:id element)
    :else ""))

(defn flat-elements
"{:elements {:a {1 2 3 4}}} => [{:option-name a 1 2 3 4}] "
  [parent-element]
  (reduce
    (fn [acc [k v]]
      (conj acc
            (assoc v :option-name (name k))))
    []
    (:elements parent-element)))

(defn fhir-schema->options [resource-type fhir-schema]
  (let [k (create-key nil resource-type)]
    [{:option-name (option-name resource-type fhir-schema)
      :key (create-key nil resource-type)
      :children (mapv
                  (fn [element]
                    (assoc element :key (create-key k (:option-name element))))
                  (flat-elements fhir-schema))}]))


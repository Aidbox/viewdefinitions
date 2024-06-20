(ns vd-designer.pages.form.fhir-schema
  (:require [clojure.string :as str]))

(def value-type-list
  ["base64Binary"
   "boolean"
   "canonical"
   "code"
   "date"
   "dateTime"
   "decimal"
   "id"
   "instant"
   "integer"
   "integer64"
   "oid"
   "string"
   "positiveInt"
   "time"
   "unsignedInt"
   "uri"
   "url"
   "uuid"])

(defn add-value-path [ctx k]
  (update ctx :value-path conj k))

(defn drop-value-path [ctx]
  (update ctx :value-path pop))

(defn add-fhirpath [ctx fhirpath]
  (update ctx :fhirpath-ctx conj fhirpath))

(defn create-render-context []
  {:fhirpath-ctx []
   :value-path []})

(defn get-select-path [view]
  (->> (:select view)
       (mapv #(map (fn [[k _]] [:select (:tree/key %) k]) (dissoc % :tree/key)))
       (apply concat)))

(declare collect-all-node-paths)

(defn concat-paths [path v]
  (->> (collect-all-node-paths v)
       (remove empty?)
       (mapv #(into [path] %))))

(defn collect-all-node-paths [vd]
  (cond (map? vd)
        (mapcat
         (fn [[k v]]
           (cond
             (or (= k :forEach)
                 (= k :forEachOrNull))
             (concat-paths :select (:select vd))
             
             (= k :column)
             [[:column]]

             (or (= k :select)
                 (= k :unionAll))
             (into
              [[k]]
              (concat-paths k v))

             :else []))
         vd)
        
        (vector? vd)
        (mapcat 
         (fn [item]
           (let [k (:tree/key item)]
             (into
              [[k]]
              (concat-paths k item))))
         vd)))

(defn get-constant-type [constant]
  (->> constant
       (filterv (fn [[k _]] (str/starts-with? (name k) "value")))
       first
       first))

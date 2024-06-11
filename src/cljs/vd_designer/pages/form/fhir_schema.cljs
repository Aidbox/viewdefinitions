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

(defn get-constant-type [constant]
  (->> constant
       (filterv (fn [[k _]] (str/starts-with? (name k) "value")))
       first
       first))

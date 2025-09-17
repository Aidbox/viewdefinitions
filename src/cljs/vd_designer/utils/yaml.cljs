(ns vd-designer.utils.yaml
  (:require ["yaml" :as y]
            [clojure.string :as str]))

(defn edn->yaml [edn]
  (y/stringify (clj->js edn)))

(defn stringify [js]
  (y/stringify js))

(defn str->yaml [^String s]
  (y/parse s))

(defn yaml->edn [yaml]
  (y/parse yaml))

(defn try-parse [^String content]
  (try
    (str->yaml content)
    (catch js/Error _
      (js/JSON.parse content))))

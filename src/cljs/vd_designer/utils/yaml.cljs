(ns vd-designer.utils.yaml
  (:require ["yaml" :as y]
            ["comment-json" :as json]))

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
      nil)))

(defn json-parse [^String content]
  (try
    (json/parse content nil true)
    (catch js/Error _
      nil)))

(ns vd-designer.utils.yaml
  (:require ["yaml" :as y]))

(defn edn->yaml [edn]
  (y/stringify (clj->js edn)))

(defn str->yaml [str]
  (y/parse str))

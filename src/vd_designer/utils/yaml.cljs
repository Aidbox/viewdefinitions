(ns vd-designer.utils.yaml
  (:require ["yaml" :as y]))

(defn edn->yaml [edn]
  (println "here " edn)
  (println "here2 " (clj->js edn))
  (y/stringify (clj->js edn)))

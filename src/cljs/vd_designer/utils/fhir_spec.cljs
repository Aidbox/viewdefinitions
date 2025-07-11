(ns vd-designer.utils.fhir-spec
  (:require [medley.core :as medley]))

(defn aliases [sp]
  (reduce
    (fn [acc {:keys [id url]}]
      (assoc acc id url))
    {}
    sp))

(defn spec [json-str]
  (-> json-str
      (js/JSON.parse)
      (js->clj :keywordize-keys true)))

(defn spec-map [spec]
  (let [als (aliases spec)]
    (->> spec
         (group-by :id)
         (medley/map-vals first)
         (reduce (fn [acc [k v]]
                   (assoc acc
                     k v
                     (als k) v))
                 {}))))

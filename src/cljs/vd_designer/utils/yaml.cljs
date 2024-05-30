(ns vd-designer.utils.yaml
  (:require ["yaml" :as y]
            [clojure.string :as str]))

(defn edn->yaml [edn]
  (y/stringify (clj->js edn)))

(defn str->yaml [^String str]
  (let [wo-comments (str/replace str #"//.*|#.*|/\*[\s\S]*?\*/" "")]
    (y/parse wo-comments)))

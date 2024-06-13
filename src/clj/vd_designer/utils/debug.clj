(ns vd-designer.utils.debug
  (:require [clojure.pprint :as pp]))

(defn ? [o & [msg]]
  (when msg
    (println msg ":"))
  (pp/pprint o)
  o)

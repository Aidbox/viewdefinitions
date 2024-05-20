(ns vd-designer.utils.debug
  (:require [clojure.pprint :as pp]))

(defn ? [o]
  (pp/pprint o)
  o)

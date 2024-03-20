(ns viewdef-designer.interop
  (:require
    #?(:clj [clojure.java.io :as io])))

#?(:clj
   (defmacro inline-resource [resource-path]
     (slurp (clojure.java.io/resource resource-path))))

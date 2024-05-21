(ns vd-designer.interop
  (:require
    #?(:cljs [goog.object])
    #?(:cljs [goog])
    #?(:clj [clojure.java.io :as io])))

#?(:clj
   (defmacro inline-resource [resource-path]
     (slurp (clojure.java.io/resource resource-path))))


#?(:cljs
   (defn obj->clj
     [obj]
     (if (goog.isObject obj)
       (-> (fn [result key]
             (let [v (goog.object/get obj key)]
               (if (= "function" (goog/typeOf v))
                 result
                 (assoc result (keyword key) (obj->clj v)))))
           (reduce {} (.getKeys goog/object obj)))
       obj)))

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
     "Convert js object to clj, skip functions.
      Use if js->clj does not work."
     [obj]
     (if (goog.isObject obj)
       (-> (fn [result key]
             (let [v (goog.object/get obj key)]
               (cond-> result
                 (not= "function" (goog/typeOf v))
                 (assoc (keyword key) (obj->clj v)))))
           (reduce {} (.getKeys goog/object obj)))
       obj)))

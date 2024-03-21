(ns viewdef-designer.pages.main.model
  (:require [re-frame.core :refer [reg-sub]]
            [clojure.string :as str]))

(reg-sub
 ::patients
 (fn [db _]
   (:patients db)))

(defn search-resource [db input]
  (when (and input (string? input) )
    (->> (:resources db)
         (filterv
           (fn [r] (if input
                     (str/starts-with? (str/lower-case r)
                                       (str/lower-case input))
                     true)))
         (take 10)
         (mapv
           (fn [a] {:id a
                    :title a
                    :value a})))))

(reg-sub
 ::suggested-resources
 (fn [db [_]]
   (let [s (search-resource db (get db :resource))]
     (if (vector? s)
       s
       [s]))))

(reg-sub
 ::selected-resource
 (fn [db [_]]
   (get db :resource)))

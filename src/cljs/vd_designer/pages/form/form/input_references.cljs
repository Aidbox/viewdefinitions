(ns vd-designer.pages.form.form.input-references
  (:require [clojure.walk :as walk]))

(defn replace-inputs-with-references [vd]
  (let [refs (atom {})]
    [(walk/postwalk
       (fn [v]
         (if (map? v)
           (cond
             (:forEach v)
             (let [ref (str (random-uuid))]
               (swap! refs
                      #(assoc % ref {:value (or (:forEach v) (:forEachOrNull v))
                                     :type :fhirpath}))
               (assoc v :forEach ref))

             (:forEachOrNull v)
             (let [ref (str (random-uuid))]
               (swap! refs
                      #(assoc % ref {:value (:forEachOrNull v)
                                     :type :fhirpath}))
               (assoc v :forEachOrNull ref))

             (:column v)
             (update v :column
                     (fn [columns]
                       (mapv
                        (fn [column]
                          (let [name-ref (str (random-uuid))
                                path-ref (str (random-uuid))]
                            (swap! refs
                                   #(-> %
                                        (assoc name-ref {:value (:name column)
                                                         :type :string}) 
                                        (assoc path-ref {:value (:path column)
                                                         :type :fhirpath})))
                            (-> column
                                (assoc :name name-ref)
                                (assoc :path path-ref))))
                        columns)))
             :else v)
           v))
       vd)
       @refs]))

(defn replace-inputs-with-values [vd refs]
  (let [get-value #(-> refs (get %) :value)]
    (walk/postwalk
     (fn [v]
       (if (map? v)
         (cond
           (:forEach v)
           (assoc v :forEach (get-value (:forEach v)))

           (:forEachOrNull v)
           (assoc v :forEachOrNull (get-value (:forEachOrNull v)))

           (:column v)
           (mapv
            (fn [column]
              (-> column
                  (assoc :name (get-value (:name column)))
                  (assoc :path (get-value (:path column)))))
            (:column v))

           :else v)
         v))
     vd)))
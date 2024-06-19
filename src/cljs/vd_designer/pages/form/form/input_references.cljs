(ns vd-designer.pages.form.form.input-references
  (:require [clojure.walk :as walk]
            [vd-designer.pages.form.fhir-schema :as fhir-schema]))

(defn create-foreach-reference
  ([] (create-foreach-reference ""))
  ([foreach-text]
   (let [ref (str (random-uuid))]
     [ref {:value foreach-text
           :type :fhirpath}])))

(defn create-column-reference
  ([] (create-column-reference "" ""))
  ([name path]
   (let [name-ref (str (random-uuid))
         path-ref (str (random-uuid))]
     {:name
      [name-ref {:value name
                 :type :string}]
      :path
      [path-ref {:value path
                 :type :fhirpath}]})))

(defn create-constant-reference
  ([] (create-constant-reference "" ""))
  ([name value]
   (let [name-ref (str (random-uuid))
         value-ref (str (random-uuid))]
     {:name
      [name-ref {:value name
                 :type :string}]
      :value
      [value-ref {:value value
                  :type :string}]})))

(defn create-reference
  ([] (create-reference :string ""))
  ([input-type]
   (create-reference input-type ""))
  ([input-type value]
   (let [ref (str (random-uuid))]
     [ref {:value value
           :type input-type}])))

(defn replace-inputs-with-references [vd]
  (let [refs (atom {})]
    [(walk/postwalk
       (fn [v]
         (if (map? v)
           (cond
             (:forEach v)
             (let [[ref tree-input] (create-foreach-reference (:forEach v))]
               (swap! refs #(assoc % ref tree-input))
               (assoc v :forEach ref))

             (:forEachOrNull v)
             (let [[ref tree-input] (create-foreach-reference (:forEachOrNull v))]
               (swap! refs #(assoc % ref tree-input))
               (assoc v :forEachOrNull ref))

             (:column v)
             (update v :column
                     (fn [columns]
                       (mapv
                        (fn [column]
                          (let [{[name-ref name-tree-input] :name
                                 [path-ref path-tree-input] :path}
                                (create-column-reference (:name column) (:path column))]
                            (swap! refs
                                   #(-> %
                                        (assoc name-ref name-tree-input)
                                        (assoc path-ref path-tree-input)))
                            (-> column
                                (assoc :name name-ref)
                                (assoc :path path-ref))))
                        columns)))
             (:constant v)
             (update v :constant
                     (fn [constants]
                       (mapv
                        (fn [constant]
                          (let [constant-type (fhir-schema/get-constant-type constant)
                                {[name-ref name-tree-input] :name
                                 [value-ref value-tree-input] :value}
                                (create-constant-reference (:name constant)
                                                           (get constant constant-type ""))]
                            (swap! refs
                                   #(-> %
                                        (assoc name-ref name-tree-input)
                                        (assoc value-ref value-tree-input)))
                            (-> constant
                                (assoc :name name-ref)
                                (assoc constant-type value-ref))))
                        constants)))

             :else v)
           v))
       vd)
       @refs]))

;; TODO: use on save
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

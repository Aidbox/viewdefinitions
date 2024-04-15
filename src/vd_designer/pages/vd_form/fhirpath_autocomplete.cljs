(ns vd-designer.pages.vd-form.fhirpath-autocomplete
  (:require [clojure.string :as str]
            [vd-designer.pages.vd-form.fhir-schema :as fhirschema]))

(def fhirpath-fns 
  {:where {:value "where()"
           :cursor 6}
   :exists {:value "exists()"
            :cursor 7}
   :empty {:value "empty()"
           :cursor 7}
   :extension {:value "extension(url = )"
               :cursor 16}
   :join {:value "join()"
          :cursor 5}
   :ofType {:value "ofType()"
            :cursor 7}
   :first {:value "first()"
           :cursor 7}
   :lowBoundary {:value "lowBoundary"
                 :curosr 11}
   :highBoundary {:value "highBoundary"
                  :curosr 12}})

(defn charAt [text index]
  (. text charAt index))

(defn- substr [text start end]
  (if (zero? start)
    (subs text start end)
    (subs text (inc start) end)))

(defn split-fhirpath [text]
  (loop [index 0
         last-index 0
         instr? false
         columns 0
         escape? false
         parts []]
    (if (< index (.-length text))
      (case (charAt text index)
        "\\" (if escape?
               (recur (inc index) last-index instr? columns false parts)
               (recur (inc index) last-index instr? columns true parts))
        ("\"" "'") (if escape?
                     (recur (inc index) last-index instr? columns false parts)
                     (recur (inc index) last-index (not instr?) columns escape? parts))
        "(" (if instr?
              (recur (inc index) last-index instr? columns false parts)
              (recur (inc index) last-index instr? (inc columns) false parts))
        ")" (if instr?
              (recur (inc index) last-index instr? columns false parts)
              (recur (inc index) last-index instr? (dec columns) false parts))
        "." (if (or instr? escape? (not (zero? columns)))
              (recur (inc index) last-index instr? columns false parts)
              (recur (inc index) index instr? columns false (conj parts
                                                                  (substr text last-index index))))
        (recur (inc index) last-index instr? columns false parts))
      (conj parts (substr text last-index index)))))

(defn find-part-with-carret [parts selection-start]
  (loop [text-length 0
         index 0]
    (if (< index (count parts))
      (let [length-with-current-part (+ text-length (count (get parts index)))]
        (if (> selection-start length-with-current-part)
          (recur (inc length-with-current-part) (inc index))
          index))
      -1)))

(defn matches-part [part elem]
  (or (str/starts-with? part "where")
      (str/starts-with? part "exists")
      (str/starts-with? elem part)))

(defn autocomplete
  [{:keys [spec-map] :as ctx}
   {:keys [selection-start selection-end text type]}]

  (if (not= selection-start selection-end)
    {:functions [] :fields []}
    (let [substracted-text (subs text 0 selection-start)
          splitted-path (split-fhirpath substracted-text)
          ;; Get minimal part with pointed carret
          part-index (find-part-with-carret splitted-path selection-start)
          context-path (interleave (take part-index splitted-path)
                                   (repeat :elements))
          part (get splitted-path part-index)
          fhirschema-ctx (fhirschema/resolve-path
                           ctx type (into [:elements]
                                          (map keyword)
                                          context-path))]
      {:fields
       (->> fhirschema-ctx
            (keys)
            (mapv name)
            (filterv #(matches-part part %))
            (mapv
             (fn [k]
               {:label k :value k})))
       :functions 
       (->> fhirpath-fns
            (filterv (fn [[k _]] (matches-part part (name k))))
            (mapv 
             (fn [[k v]]
               {:label (name k)
                :value (:value v)
                :cursor (:cursor v)})))}))
  ;; 1. Get minimal part with from carret position
  ;; 2. Path before is used to get context 
  ;; 3. 
  )

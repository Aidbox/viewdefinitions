(ns vd-designer.pages.vd-form.fhirpath-autocomplete.autocomplete
  (:require [clojure.string :as str]
            [vd-designer.pages.vd-form.fhirpath-autocomplete.tree-sitter :as tree-sitter]
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
                 :cursor 11}
   :highBoundary {:value "highBoundary"
                  :cursor 12}})

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

(defn find-part-with-cursor [parts selection-start]
  (loop [text-length 0
         index 0]
    (if (< index (count parts))
      (let [length-with-current-part (+ text-length (count (get parts index)))]
        (if (> selection-start length-with-current-part)
          (recur (inc length-with-current-part) (inc index))
          index))
      -1)))

(defn has-open-paren? [text]
  (str/index-of text "("))

(defn fhirpath-function? [n]
  (some 
   (fn [[k _]]
     (str/starts-with? n (name k)))
   fhirpath-fns))

(defn make-context-path [path part-index]
  (interleave (->> path
                   (take part-index)
                   (filter (complement fhirpath-function?))
                   (map keyword))
              (repeat :elements)))

(defn autocomplete
  ([ctx options]
   (autocomplete ctx [:elements] options))
  ([ctx
    context-path
    {:keys [selection-start selection-end text type]}]
   (if (not= selection-start selection-end)
     {:functions [] :fields []}
     (let [substracted-text (subs text 0 selection-start)
           splitted-path (split-fhirpath substracted-text)
           part-index (find-part-with-cursor splitted-path selection-start)
           part (get splitted-path part-index)
           current-context-path (make-context-path splitted-path part-index)
           complete-context-path (into context-path current-context-path)]
       (if-let [paren-position (has-open-paren? part)]
         (let [inner-fhirpath (subs part (inc paren-position))]
           (autocomplete ctx complete-context-path {:text inner-fhirpath
                                                    :selection-start (count inner-fhirpath)
                                                    :selection-end (count inner-fhirpath)
                                                    :type type}))
         (let [fhirschema-ctx (fhirschema/resolve-path ctx type complete-context-path)]
           {:fields
            (->> fhirschema-ctx
                 (keys)
                 (mapv name)
                 (filterv #(str/starts-with? % part))
                 (mapv
                  (fn [k]
                    {:label k :value k})))
            :functions
            (->> fhirpath-fns
                 (filterv (fn [[k _]] (str/starts-with? (name k) part)))
                 (mapv
                  (fn [[k v]]
                    {:label (name k)
                     :value (:value v)
                     :cursor (:cursor v)})))}))))))

(defn edit [tree indexes]
  (tree-sitter/edit-fhirpath tree indexes))

(defn parse [parser fhirpath tree]
  (try
    (if tree
      (tree-sitter/parse-fhirpath parser fhirpath tree)
      (tree-sitter/parse-fhirpath parser fhirpath))
    (catch js/Error e
      (js/console.log e))))

(defn suggest [ctx parser tree {:keys [text selection-start]}]
  (let [tree (parse parser text tree)]
    tree))

(defn init []
  (tree-sitter/init-parser))
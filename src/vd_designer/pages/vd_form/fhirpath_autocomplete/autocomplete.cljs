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

(defn make-context-path [path]
  (interleave (->> path
                   (remove fhirpath-function?)
                   (map keyword))
              (repeat :elements)))

(defn in-node-range? [^Node node cursor-position]
  (>= (.. node -endPosition -column) 
      cursor-position 
      (.. node -startPosition -column)))

(defn path-part? [^Node node]
  (= (.-type node) "identifier"))

(defn calc-part [node]
  (let [text (.-text node)]
    (case text
      ("." "(") ""
      text)))

(defn travers-sitter-tree [tree cursor-position]
  (loop [[^Node node & children] [(.-rootNode ^Tree tree)]
         ctx-path []]
    (if node
      (if (in-node-range? node cursor-position)
        (if (zero? (.-childCount node))
          {:ctx-path ctx-path
           :part     (calc-part node)}
          (recur (.-children node) ctx-path))
        (recur children
               (if (path-part? node)
                 (conj ctx-path (.-text node))
                 ctx-path)))
      nil)))

(defn autocomplete
  ([ctx resource-type options]
   (autocomplete ctx [:elements] resource-type options))
  ([ctx context-path resource-type {:keys [ctx-path part]}]
   (let [current-context-path (make-context-path ctx-path)
         complete-context-path (into context-path current-context-path)
         fhirschema-ctx (fhirschema/resolve-path ctx resource-type complete-context-path)]
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
               {:label  (name k)
                :value  (:value v)
                :cursor (:cursor v)})))})))

(defn edit [tree indexes]
  (tree-sitter/edit-fhirpath tree indexes))

(defn parse [parser fhirpath tree]
  (try
    (if tree
      (tree-sitter/parse-fhirpath parser fhirpath tree)
      (tree-sitter/parse-fhirpath parser fhirpath))
    (catch js/Error e
      (js/console.log e))))

(defn suggest [ctx parser tree {:keys [text selection-start resource-type]}]
  (let [tree (parse parser text tree)
        ;; We need to get two things:
        ;; 1. Context path
        ;; 1.5 With types
        ;; 2. Actual part
        ]
    {:tree    tree
     :options (->> (travers-sitter-tree tree selection-start)
                   (autocomplete ctx resource-type))}))

(defn init []
  (tree-sitter/init-parser))

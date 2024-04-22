(ns vd-designer.pages.vd-form.fhirpath-autocomplete.autocomplete
  (:require [clojure.string :as str]
            [vd-designer.pages.vd-form.fhirpath-autocomplete.tree-sitter :as tree-sitter]
            [vd-designer.pages.vd-form.fhir-schema :as fhirschema]))

(def fhirpath-fns 
  {:where {:value "where()"
           :cursor 6
           :type "collection"}
   :exists {:value "exists()"
            :cursor 7
            :type "boolean"}
   :empty {:value "empty()"
           :cursor 7
           :type "boolean"}
   :extension {:value "extension(url = )"
               :cursor 16
               :type "collection"}
   :join {:value "join()"
          :cursor 5
          :type "string"}
   :ofType {:value "ofType()"
            :cursor 7
            :type "collection"}
   :first {:value "first()"
           :cursor 7
           :type "collection"}
   :lowBoundary {:value "lowBoundary"
                 :cursor 11
                 :type "number"}
   :highBoundary {:value "highBoundary"
                  :cursor 12
                  :type "number"}})

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
           :part     (calc-part node)
           :cursor-position (- cursor-position (.. node -startPosition -column))}
          (recur (.-children node) ctx-path))
        (recur children
               (if (path-part? node)
                 (conj ctx-path (.-text node))
                 ctx-path)))
      nil)))


(defn filter-by-name [substr suggestions]
  (filterv 
   (fn [suggestion] 
     (str/starts-with? 
      (name (key suggestion)) substr)) 
   suggestions))

(defn remove-base-polimorphics [suggestions]
  (remove #(-> % val :choices) suggestions))

(defn autocomplete
  ([ctx resource-type options]
   (autocomplete ctx [:elements] resource-type options))
  ([ctx context-path resource-type {:keys [ctx-path part cursor-position]}]
   (println cursor-position)
   (let [current-context-path (make-context-path ctx-path)
         complete-context-path (into context-path current-context-path)
         fhirschema-ctx (fhirschema/resolve-path ctx resource-type complete-context-path)
         part (subs part 0 cursor-position)]
     {:fields
      (->> fhirschema-ctx
           (filter-by-name part)
           (remove-base-polimorphics)
           (mapv
            (fn [[k v]]
              {:label (name k) :value (name k) :type (:type v)})))
      :functions
      (->> fhirpath-fns
           (filter-by-name part)
           (mapv
            (fn [[k v]]
              {:label  (name k)
               :value  (:value v)
               :type   (:type v)
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

(ns vd-designer.pages.vd-form.fhirpath-autocomplete.autocomplete
  (:require [clojure.string :as str]
            [vd-designer.pages.vd-form.fhirpath-autocomplete.tree-sitter :as tree-sitter]
            [vd-designer.pages.vd-form.fhir-schema :as fhirschema]))

(def fhirpath-fns {})

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
          (let [part-text (calc-part node)
                text-length-diff (abs (- (.-length part-text) (.. node -text -length)))]
            {:ctx-path ctx-path
             :part     part-text
             :cursor-position (- cursor-position (.. node -startPosition -column) text-length-diff)})
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

(defn change-value-for-polymorphics [suggestions]
  (mapv
   (fn [[k v :as suggestion]]
     (if (-> v :choiceOf)
       [k (assoc v :value (str (:choiceOf v) ".ofType(" (:type v) ")"))]
       suggestion))
   suggestions))

(defn autocomplete
  ([ctx resource-type options]
   (autocomplete ctx [:elements] resource-type options))
  ([ctx context-path resource-type {:keys [ctx-path part cursor-position]}]
   (let [current-context-path (make-context-path ctx-path)
         complete-context-path (into context-path current-context-path)
         fhirschema-ctx (fhirschema/resolve-path ctx resource-type complete-context-path)
         part (subs part 0 cursor-position)]
     {:fields
      (->> fhirschema-ctx
           (filter-by-name part)
           (remove-base-polimorphics)
           (change-value-for-polymorphics)
           (mapv
            (fn [[k v]]
              (let [k (name k)]
                {:label (name k)
                 :value (subs (or (:value v) k) cursor-position)
                 :full-value (name k)
                 :type  (:type v)}))))
      :functions
      (->> fhirpath-fns
           (filter-by-name part)
           (mapv
            (fn [[k v]]
              (let [value (subs (:value v) cursor-position)]
                {:label  (name k)
                 :value  value
                 :type   (:type v)
                 :cursor (- (:cursor v) cursor-position)}))))})))

(defn edit [tree indexes]
  (tree-sitter/edit-fhirpath tree indexes))

(defn parse [parser fhirpath tree]
  (try
    (if tree
      (tree-sitter/parse-fhirpath parser fhirpath tree)
      (tree-sitter/parse-fhirpath parser fhirpath))
    (catch js/Error e
      (js/console.log e))))

(defn suggest [ctx parser tree {:keys [text fhirpath-prefix cursor-start resource-type]}]
  (let [text (str fhirpath-prefix text)
        cursor-start (+ cursor-start (.-length fhirpath-prefix))
        tree (parse parser text tree)
        traverse-result (travers-sitter-tree tree cursor-start)
        ;; We need to get two things:
        ;; 1. Context path
        ;; 1.5 With types
        ;; 2. Actual part
        ;; suggest(specmap: Map<string, Object>, type: string, parentExpressions: Array<string>, fhirpath: string, cursor: number) {
        ]
    {:tree    tree
     :options (if (:part traverse-result)
                (autocomplete ctx resource-type traverse-result)
                {:fields [] :functions []})}))

(defn init []
  (tree-sitter/init-parser))

4

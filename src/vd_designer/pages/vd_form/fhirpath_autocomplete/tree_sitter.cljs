(ns vd-designer.pages.vd-form.fhirpath-autocomplete.tree-sitter
  (:require [web-tree-sitter :as Parser]
            [re-frame.core :refer [dispatch]]
            [vd-designer.pages.vd-form.controller :as-alias c]))

(defn load-fhirpath-language []
  (-> (.load (.-Language Parser) "/tree-sitter-fhirpath.wasm")
      (.then #(dispatch [::c/tree-sitter-load-success (new Parser)]))
      (.catch #(dispatch [::c/tree-sitter-load-error ":)"]))))

(defn init-parser []
  (-> (.init Parser
             (clj->js {:locateFile (fn [n dir] "/tree-sitter.wasm")}))
      (.then load-fhirpath-language)
      (.catch #(dispatch [::c/tree-sitter-load-error ":)"]))))
                                      
(defn parse-fhirpath [parser fhirpath]
  (.parse parser fhirpath))

(defn edit-fhirpath [parser tree fhirpath indexes]
  (.edit tree indexes)
  (.parse parser fhirpath tree))

(comment

  (init-parser)

  (def code "name.family.period")

  (def tree (parse-fhirpath code))

  (js/console.log (.toString (.-rootNode tree)))

  )
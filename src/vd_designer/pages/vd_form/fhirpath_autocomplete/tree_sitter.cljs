(ns vd-designer.pages.vd-form.fhirpath-autocomplete.tree-sitter
  (:require [web-tree-sitter :as Parser]
            [re-frame.core :refer [dispatch]]
            [vd-designer.pages.vd-form.controller :as-alias c]))

(defn load-fhirpath-language []
  (-> (.load (.-Language Parser) "/tree-sitter-fhirpath.wasm")
      (.then (fn [language]
               (let [parser (new Parser)]
                 (.setLanguage parser language)
                 (dispatch [::c/tree-sitter-load-success parser]))))
      (.catch #(dispatch [::c/tree-sitter-load-error ":)"]))))

(defn init-parser []
  (-> (.init Parser
             (clj->js {:locateFile (fn [n dir] "/tree-sitter.wasm")}))
      (.then load-fhirpath-language)
      (.catch #(dispatch [::c/tree-sitter-load-error ":)"]))))
                                      
(defn parse-fhirpath
  ([parser fhirpath]
   (.parse parser fhirpath))
  ([parser fhirpath tree]
   (.parse parser fhirpath tree)))


(defn edit-fhirpath [tree indexes]
  (.edit tree indexes))

(comment

  (init-parser)

  (def code "name.family.period")

  (.parse (:vd-designer.pages.vd-form.model/parser-instance @re-frame.db/app-db) code)

  (def tree (parse-fhirpath code))

  (js/console.log (.toString (.-rootNode tree)))

  )
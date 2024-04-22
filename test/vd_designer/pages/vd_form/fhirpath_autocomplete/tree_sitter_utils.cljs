(ns vd-designer.pages.vd-form.fhirpath-autocomplete.tree-sitter-utils
  (:require [web-tree-sitter :as Parser]
            [clojure.test :refer-macros [deftest testing is run-test]]
            [cljs.core.async :refer [go <!]]
            [cljs.core.async.interop :refer-macros [<p!]]))
        
(defn load-tree-sitter-wasm []
  (go
    (<p! (.init Parser
                (clj->js {:locateFile (fn [_n _dir] "/resources/public/tree-sitter.wasm")})))
    (let [parser (new Parser)
          language (<p! (.load (.-Language Parser) "/tree-sitter-fhirpath.wasm"))]
      (.setLanguage parser language)
      parser)))
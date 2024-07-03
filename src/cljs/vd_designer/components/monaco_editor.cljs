(ns vd-designer.components.monaco-editor
  (:require
   ["@monaco-editor/react" :default Editor :refer [loader]]
   [goog.string :as gstring]
   [goog.string.format]
   [medley.core :as medley]))

(.config loader (clj->js {:paths {:vs "/monaco/min/vs"}}))

(defn monaco [properties]
  [:> Editor
   (medley/deep-merge
     {:language    "yaml"
      :options     {:minimap              {:enabled false}
                    :fontSize             "14px"
                    :fontStyle            "normal"
                    :lineHeight           "1.5"
                    :letterSpacing        "0.2em"
                    :fontWeight           "300"
                    :fontFamily           "JetBrains Mono"
                    :overviewRulerLanes   0
                    :lineNumbers          (fn [line-number]
                                            (gstring/format
                                              "<div style=\"color: #c7c7c7;\">%s</div>"
                                              line-number))
                    :lineNumbersMinChars  3
                    :scrollBeyondLastLine false
                    :renderLineHighlight  "none"
                    :folding              true
                    :renderIndentGuides   false
                    :tabSize              2
                    :readOnly             false}}
     properties)])

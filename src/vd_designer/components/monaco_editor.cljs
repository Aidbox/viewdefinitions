(ns vd-designer.components.monaco-editor
  (:require ["@monaco-editor/react" :default Editor]
            [goog.string :as gstring]
            [goog.string.format]))

(defn set-json-defaults
  [monaco-instance urls]
  (.setDiagnosticsOptions (.-jsonDefaults (.-json (.-languages ^js/Object monaco-instance)))
                          (clj->js {:validate            true
                                    :enableSchemaRequest true
                                    :schemas             (mapv (fn [url]
                                                                 {:uri url :fileMatch ["*"]})
                                                               urls)})))

(defn monaco [properties]
  [:> Editor
   (->
    {:theme       (:theme properties "suitkin-theme")
     :language    "yaml"
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
                   :readOnly             true}
     :beforeMount  (fn [instance]
                     (when (:schemas properties)
                       (set-json-defaults instance (:schemas properties)))
                     (.defineTheme (.-editor ^js/Object instance)
                                   "suitkin-theme"
                                   (clj->js {:base    "vs"
                                             :inherit true
                                             :rules   [{:token      "string.key.json"
                                                        :foreground "#EA4A35"}
                                                       {:token      "string.value.json"
                                                        :foreground "#405CBF"}
                                                       {:token      "string"
                                                        :foreground "#405CBF"}
                                                       {:token      "number"
                                                        :foreground "#00A984"}]
                                             :colors  {"editor.background" "#F8FAFC"
                                                       "scrollbar.shadow"  "#ffffff00"
                                                       "widget.shadow"     "#ffffff00"}}))
                     instance)}
    (merge properties))])

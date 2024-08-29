(ns vd-designer.pages.form.editor
  (:require [antd :refer [Flex]]
            [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.components.button :as button]
            [vd-designer.components.monaco-editor :refer [monaco]]
            [vd-designer.components.switch :as switch]
            [vd-designer.pages.form.controller :as c]
            [vd-designer.pages.form.model :as m]))

(defn filename [vd-name lang]
  (when (and vd-name lang)
    (let [ext (case lang
                :language/yaml "yaml"
                :language/json "json")]
      (str vd-name "." ext))))

(defn editor []
  (let [vd-code @(subscribe [::m/view-definition-code])
        lang @(subscribe [::m/language])
        code-dirty? @(subscribe [::m/code-dirty?])
        editor-id @(subscribe [::m/editor-id])
        schema @(subscribe [::m/view-definition-jsonschema])]
    ^{:key editor-id}
    [:div {:style {:height        "100%"
                   :padding-right "8px"}}
     [monaco {:id       "vd-yaml"
              :language (when lang (name lang))
              :defaultValue vd-code
              :schemas  []
              :beforeMount (fn [instance]
                             (.setDiagnosticsOptions
                              (.-jsonDefaults (.-json (.-languages ^js/Object instance)))
                              (clj->js {:validate true
                                        :allowComments true
                                        :comments "ignore"
                                        :enableSchemaRequest true
                                        :schemas [schema]}))
                             instance)
              :onChange (fn [text & _args]
                          (when (not code-dirty?)
                            (dispatch [::c/set-code-dirty true]))
                          (dispatch [::c/set-view-definition-code text]))
              :onValidate (fn [markers]
                            (let [max-severity
                                  (->> (js->clj markers :keywordize-keys true)
                                       (mapv :severity)
                                       (reduce max 0))]
                              (dispatch [::c/set-code-validation-severity max-severity])))}]
     [:> Flex {:style    {:position :absolute
                          :top      0
                          :right    "26px"
                          :z-index  1000}
               :vertical true
               :align    :end
               :gap      8}
      [switch/json<->yaml
       :defaultChecked (= lang :language/json)
       :onChange #(dispatch [::c/change-language
                             (if % :language/json :language/yaml)])]
      [button/copy vd-code]
      [button/download-text-file {:filename (filename "view-definition" lang)
                                  :text     vd-code}]]]))

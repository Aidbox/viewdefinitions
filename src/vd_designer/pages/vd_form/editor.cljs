(ns vd-designer.pages.vd-form.editor
  (:require [antd :refer [Flex]]
            [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.components.button :as button]
            [vd-designer.components.monaco-editor :refer [monaco]]
            [vd-designer.components.switch :as switch]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.pages.vd-form.form.uuid-decoration :refer [remove-decoration]]
            [vd-designer.utils.yaml :as yaml]))

(defn format-vd [vd lang]
  (case lang
    :language/yaml (yaml/edn->yaml vd)
    :language/json (-> vd clj->js (js/JSON.stringify nil 2))
    ""))

(defn filename [vd-name lang]
  (when (and vd-name lang)
    (let [ext (case lang
                :language/yaml "yaml"
                :language/json "json")]
      (str vd-name "." ext))))

(defn editor []
  (let [vd @(subscribe [::m/current-vd])
        lang @(subscribe [::m/language])
        code (-> vd
                 (remove-decoration)
                 (format-vd lang))]
    [:div {:style {:height        "calc(100vh - 180px)"
                   :padding-right "8px"}}
     [monaco {:id       "vd-yaml"
              :language (when lang (name lang))
              :value    code
              :schemas  []
              #_#_:onChange (fn [value & _] (dispatch [::c/set-schema value]))
              #_#_:onValidate (fn [markers] (dispatch [::c/set-monaco-markers (js->clj markers)]))}]
     [:> Flex {:style    {:position :absolute
                          :top      "16px"
                          :right    "16px"}
               :vertical true
               :align    :end
               :gap      8}
      [switch/json<->yaml
       :defaultChecked (= lang :language/json)
       :onChange #(dispatch [::c/change-language
                             (if % :language/json :language/yaml)])]
      [button/copy code]
      [button/download-text-file {:filename (filename (:name vd) lang)
                                  :text     code}]]]))

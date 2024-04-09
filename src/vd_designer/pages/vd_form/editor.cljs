(ns vd-designer.pages.vd-form.editor
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Popover]]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.components.button :as button]
            [vd-designer.components.monaco-editor :refer [monaco]]
            [vd-designer.components.switch :as switch]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.pages.vd-form.uuid-decoration :refer [remove-decoration]]
            [vd-designer.utils.browser :as utils.browser]
            [vd-designer.utils.yaml :as yaml]))

(defn format-vd [vd lang]
  (case lang
    :language/yaml (yaml/edn->yaml vd)
    :language/json (-> vd clj->js (js/JSON.stringify nil 2))))

(defn filename [vd lang]
  (let [ext (case lang
              :language/yaml "yml"
              :language/json "json")]
    (str (:name vd) "." ext)))

(defn label-copied []
  (r/as-element
   [:div {:style {:text-align "center"}}
    "View definition copied!"]))

(defn editor []
  (let [vd @(subscribe [::m/current-vd])
        lang @(subscribe [::m/language])
        code (-> vd
                 (remove-decoration)
                 (format-vd lang))]
    [:div
     {:style {:height "600px" :width "100%"}}
     [monaco {:id       "vd-yaml"
              :language (name lang)
              :value    code
              :schemas  []
              #_#_:onChange (fn [value & _] (dispatch [::c/set-schema value]))
              #_#_:onValidate (fn [markers] (dispatch [::c/set-monaco-markers (js->clj markers)]))}]
     [:div {:style {:position       :absolute
                    :top            "16px"
                    :right          "16px"
                    :display        :flex
                    :flex-direction :column
                    :align-items    :end
                    :gap            "8px"}}
      [switch/json<->yaml
       :defaultChecked (= lang :language/json)
       :onChange #(dispatch [::c/change-language
                             (if % :language/json :language/yaml)])]
      [:> Popover
       {:title (label-copied)
        :placement :top
        :content nil
        :trigger :click}
       (button/button nil
                      {:icon     (r/create-element icons/CopyOutlined)
                       :on-click #(utils.browser/copy-text-to-clipboard code)})]
      [button/download-text-file {:filename (filename vd lang)
                                  :text     code}]]]))

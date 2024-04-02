(ns vd-designer.pages.vd-form.components
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Col Row Space]]
            [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.components.button :as button]
            [vd-designer.components.dropdown :refer [new-select]]
            [vd-designer.components.icon :as icon]
            [vd-designer.components.input :refer [input]]
            [vd-designer.components.select :refer [select]]
            [vd-designer.components.tag :as tag]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.utils.event :as u]))

;;;; Rows

(defn base-input-row [col1 col2]
  [:> Row {:align "middle" :gutter 32}
   [:> Col {:span 10} col1]
   [:> Col {:span 14} col2]])

(defn nested-input-row [icon name value]
  [base-input-row
   [:> Row {:wrap false :align "middle" :style {:line-height "10px"}}
    [:> Col {:flex "30px"} icon]
    [:> Col {:flex "auto"} name]]
   value])


;;;; Inputs

(defn name-input [vd-form]
  [base-input-row
   [tag/default "name"]
   [input {:value       (:name vd-form)
           :placeholder "ViewDefinition"
           :style       {:font-style "normal"}
           :onChange    (fn [e] (dispatch [::c/change-vd-name (u/target-value e)]))}]])

(defn resource-input [vd-form]
  [base-input-row
   [tag/resource]
   [select :placeholder "Resource type"
    :options @(subscribe [::m/get-all-supported-resources])
    :value (:resource vd-form)
    :onSelect #(dispatch [::c/change-vd-resource %])]])

(defn- change-select-value [ctx key e]
  (dispatch [::c/change-input-value
             (conj (:value-path ctx) key)
             (u/target-value e)]))

(defn fhir-path-input [ctx key value]
  [:> Space.Compact {:block true
                     :style {:align-items "center"
                             :gap         "4px"}}
   [input {:placeholder "path"
           :value       value
           :onChange    #(change-select-value ctx key %)}]
   [button/invisible-icon icons/SettingOutlined]
   [button/invisible-icon icons/CloseOutlined {:onClick #(dispatch [::c/delete-node (:value-path ctx)])}]])

(defn one-constant [ctx {:keys [name valueString]}]
  [nested-input-row [icon/constant]
   [input {:value       name
           :placeholder "name"
           :style       {:font-style "normal"}
           :onChange    #(change-select-value ctx :name %)}]
   [fhir-path-input ctx :valueString valueString]])

(defn one-where [ctx {:keys [path]}]
  [nested-input-row [icon/where]
   "expression"
   [fhir-path-input ctx :path path]])

(defn one-column [ctx {:keys [name path]}]
  [nested-input-row [icon/column]
   [input {:value       name
           :placeholder "name"
           :style       {:font-style "normal"}
           :onChange    #(change-select-value ctx :name %)}]
   [fhir-path-input ctx :path path]])

(defn foreach-expr [ctx key path]
  [nested-input-row [icon/expression]
   "expression"
   [fhir-path-input ctx key path]])


;;;; Buttons

(defn add-element-button [name ctx]
  [button/ghost name icons/PlusOutlined
   {:onClick #(dispatch [::c/add-element-into-array (:value-path ctx)])}])

(defn add-select-button [ctx]
  (let [key #(keyword (.-key %))]
    [new-select #(dispatch [::c/add-element-into-array
                            (:value-path ctx)
                            (condp = (key %)
                              :column        {:column   []}
                              :forEach       {:forEach       "" :select []}
                              :forEachOrNull {:forEachOrNull "" :select []}
                              :unionAll      {:unionAll []})])]))

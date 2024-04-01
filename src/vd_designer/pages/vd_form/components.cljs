(ns vd-designer.pages.vd-form.components
  (:require [antd :refer [Col Row]]
            [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.components.dropdown :refer [new-select]]
            [vd-designer.components.icon :as icon]
            [vd-designer.components.input :as input]
            [vd-designer.components.select :refer [select]]
            [vd-designer.components.tag :as tag]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.utils.event :as u]))

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


(defn name-input [vd-form]
  [base-input-row
   [tag/default "name"]
   [input/col-name {:value       (:name vd-form)
                    :placeholder "ViewDefinition"
                    :onChange    (fn [e] (dispatch [::c/change-vd-name (u/target-value e)]))}]])

(defn resource-input [vd-form]
  [base-input-row
   [tag/resource]
   [select :placeholder "Resource type"
    :options @(subscribe [::m/get-all-supported-resources])
    :value (:resource vd-form)
    :onSelect #(dispatch [::c/change-vd-resource %])]])

(defn add-select [ctx]
  (let [key #(keyword (.-key %))]
    [new-select #(dispatch [::c/add-element-into-array
                            (:value-path ctx)
                            (condp = (key %)
                              :column        {:column   []}
                              :forEach       {:forEach       "" :select []}
                              :forEachOrNull {:forEachOrNull "" :select []}
                              :unionAll      {:unionAll []})])]))

(defn change-select-input [ctx key e]
  (dispatch [::c/change-input-value
             (conj (:value-path ctx) key)
             (u/target-value e)]))

(defn one-column [ctx {:keys [name path]}]
  [nested-input-row [icon/column]
   [input/col-name {:value       name
                    :placeholder "name"
                    :onChange    #(change-select-input ctx :name %)}]
   [input/fhir-path {:onChange    #(change-select-input ctx :path %)
                     :placeholder "path"
                     :value       path}]])

(defn foreach-expr [ctx key path]
  [nested-input-row [icon/expression]
   "expression"
   [input/fhir-path {:onChange    #(change-select-input ctx key %)
                     :placeholder "path"
                     :value       path}]])

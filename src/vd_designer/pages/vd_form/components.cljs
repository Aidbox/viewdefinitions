(ns vd-designer.pages.vd-form.components
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Col Row Space]]
            [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.components.button :as button]
            [vd-designer.components.dropdown :refer [new-select]]
            [vd-designer.components.input :refer [input]]
            [vd-designer.components.select :refer [select]]
            [vd-designer.components.tag :as tag]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.utils.event :as u]))

;;;; Rows

(defn base-node-row [col1 col2]
  [:> Row {:align "middle"}
   [:> Col {:flex "auto"} col1]
   [:> Col {:flex "30px"} col2]])

(defn base-input-row [col1 col2]
  [:> Row {:justify "space-between"}
   [:> Col {:span 12} 
    [:> Row {:justify "start"}
     col1]]
   [:> Col {:span 12} 
    [:> Row {:justify "end"}
     col2]]])

(defn nested-input-row [icon name value]
  [base-input-row
   [:> Row {:wrap false :align "middle" :style {:line-height "10px"}}
    [:> Col {:flex "30px"} icon]
    [:> Col {:flex "auto"} name]]
   value])


;;;; Buttons

(defn add-element-button [name ctx]
  [button/ghost name icons/PlusOutlined
   {:onClick #(dispatch [::c/add-element-into-array (:value-path ctx)])}])

(defn add-select-button [ctx]
  (let [key #(keyword (.-key %))]
    [new-select #(dispatch [::c/add-element-into-array
                            (:value-path ctx)
                            (case (key %)
                              :column        {:column   []}
                              :forEach       {:forEach       "" :select []}
                              :forEachOrNull {:forEachOrNull "" :select []}
                              :unionAll      {:unionAll []})])]))


(defn delete-button [ctx]
  [button/invisible-icon icons/CloseOutlined
   {:onClick #(dispatch [::c/delete-tree-element (:value-path ctx)])}])

(defn settings-button [_ctx]
  [button/invisible-icon icons/SettingOutlined])


;;;; Inputs

(defn name-input [vd-form]
  [base-input-row
   [tag/default "name"]
   [input {:value       (:name vd-form)
           :placeholder "ViewDefinition"
           :style       {:font-style "normal"
                         :min-width "200px"
                         :max-width "400px"}
           :onChange    (fn [e] (dispatch [::c/change-vd-name (u/target-value e)]))}]])

(defn resource-input [vd-form]
  [base-input-row
   [tag/resource]
   [select :placeholder "Resource type"
    :options @(subscribe [::m/get-all-supported-resources])
    :style {:max-width "400px" :min-width "200px"}
    :value (:resource vd-form)
    :onSelect #(dispatch [::c/change-vd-resource %])]])

(defn change-select-value [ctx key e]
  (dispatch [::c/change-input-value
             (conj (:value-path ctx) key)
             (u/target-value e)]))

(defn fhir-path-input [ctx key value deletable?]
  [:> Space.Compact {:block true
                     :style {:align-items "center"
                             :gap         "4px"}}
   [input {:placeholder "path"
           :value       value
           :onChange    #(change-select-value ctx key %)}]
   [settings-button ctx]
   (when deletable? [delete-button ctx])])

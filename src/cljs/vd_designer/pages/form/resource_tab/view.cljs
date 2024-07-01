(ns vd-designer.pages.form.resource-tab.view
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Flex Spin Tooltip Typography]]
            [clojure.string :as str]
            [re-frame.core :refer [subscribe]]
            [reagent.core :as r]
            [vd-designer.components.tree :refer [tree]]
            [vd-designer.pages.form.model :as form-model]
            [vd-designer.pages.form.resource-tab.components :as components]
            [vd-designer.pages.form.resource-tab.model :as m]
            [vd-designer.pages.form.resource-tab.controller :as c]))

(defn shorten-valueset-name [value-set-name]
  (last (str/split value-set-name #"/")))

(def flags-cell-style
  {:text-align :center
   :width      "46px"})

(def cardinality-cell-style
  {:text-align :center
   :width      "44px"})

(def type-cell-style
  {:width      "150px"})

(def description-cell-style
  {:width      "32px"})

(defn render-resource [element]
  (assoc element :title
         (r/as-element
          [:> Flex {:gap 4}
           [:div {:style {:width "264px"}}
            [components/icon-resource]
            [:span #_{:style {:padding-bottom "5px"}}
             (:option-name element)]]

           [:div {:style (merge flags-cell-style {:margin-left "68px"})}
            "Flags"]
           [:div {:style cardinality-cell-style}
            "Card."]
           [:div {:style type-cell-style}
            "Type"]
           [:div {:style description-cell-style}
            "Desc."]])))

(defn render-element* [element & [lvl]]
  (let [lvl (or lvl 0)]
    (r/as-element
     [:> Flex {:gap 4, :style {:height "30px"}}
      [:div {:style {:width (str (- 300 (* 32 lvl)) "px")}}
       [:<>
        [components/render-icon element]
        [:> Typography.Text {:ellipsis true
                             :style {:padding-bottom "5px"}}
         (str (:option-name element)
              (when (:choices element) "[x]"))]]]

      [:div {:style flags-cell-style}
       [components/render-modifiers element]]

      [:div {:style cardinality-cell-style}
       (when-not (:choiceOf element)
         (str (or
               (when (contains?
                      (into #{} (:required element))
                      (:option-name element))
                 "1")
               (:min element)
               "0")
              ".."
              (or (when (:array element) "*")
                  (:max element)
                  "1")))]

      [:div {:style type-cell-style}
       [components/render-type element]]

      [:div {:style description-cell-style}
       (when (:binding element)
         (let [value-set (-> element :binding :valueSet)]
           [:> Tooltip {:placement :left
                        :title     (r/as-element
                                    [:<> "Binding: "
                                     [:a {:href value-set, :target "_blank"}
                                      (shorten-valueset-name value-set)
                                      " (" (:strength (:binding element)) ")"]])}
            [:> icons/QuestionCircleOutlined]]))]])))

(defn render-element [element fhir-schema & [lvl]]
  (let [lvl (or lvl 0)
        element (cond-> element
                  (not (:key element))
                  (assoc :key (c/create-key (or (:key fhir-schema)
                                                (:option-name fhir-schema)
                                                (:type fhir-schema))
                                            (:option-name element))))]
    (cond->
     (assoc element :title (render-element* element lvl))

      (:choices element)
      (assoc :children (mapv
                        (fn [c]
                          {:title (render-element* c (inc lvl))
                           :key   (c/create-key (:key element) (:option-name c))})
                        (:choices element)))

      (:elements element) ;; backbone element
      (assoc :children
             (mapv
              (fn [c]
                (render-element c (c/pre-process-fhir-schema element) (inc lvl)))
              (c/pre-process-fhir-schema element))))))

(defn fhir-schema->options [resource-type fhir-schema]
  (let [rt-key (c/create-key nil resource-type)]
    (into [(render-resource
            {:option-name (or resource-type (:id fhir-schema) "")
             :key         rt-key})]
          (mapv
           (fn [element]
             (-> element
                 (assoc :key (c/create-key rt-key (:option-name element)))
                 (render-element fhir-schema)))
           (c/pre-process-fhir-schema fhir-schema)))))

(defn schema->tree-data [schema]
  (fhir-schema->options (:id schema) schema))

(defn resource-tab []
  (let [spec @(subscribe [::m/spec-map])
        resource-input @(subscribe [::form-model/resource-input])
        resource (when spec (get (js->clj spec :keywordize-keys true)
                                 (keyword resource-input)))]
    (if resource
      [tree {:style            {:padding-right "10px"}
             :defaultExpandAll true
             :class            "vd-tree resource-tab"
             :tree-data        (clj->js (schema->tree-data resource))}]
      [:> Flex {:style   {:padding-top "50%"}
                :justify :center
                :align   :center
                :flex    1}
       [:> Spin {:size :large}]])))

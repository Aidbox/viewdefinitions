(ns vd-designer.pages.form.resource-tab.view
  (:require [antd :refer [Flex Space Spin Typography]]
            [clojure.string :as str]
            [re-frame.core :refer [subscribe]]
            [reagent.core :as r]
            [vd-designer.components.tree :refer [tree]]
            [vd-designer.pages.form.model :as form-model]
            [vd-designer.pages.form.resource-tab.components :refer [icon-resource
                                                                    render-icon
                                                                    render-modifiers]]
            [vd-designer.pages.form.resource-tab.model :as m]))

(defn create-key [parent-key element-name]
  (when element-name
    (if parent-key
      (str parent-key "-" (str/lower-case element-name))
      (str/lower-case element-name))))

(defn shorten-valueset-name [value-set-name]
  (last (str/split value-set-name #"/")))

(defn option-name [element-name element]
  (cond
    element-name
    element-name

    (:id element)
    (:id element)
    :else ""))

(defn add-choices [master slaves]
  (assoc master :choices (get slaves (:option-name master))))

(defn group-choice-of
  "[{:option-name 'valueA' :choiceOf 'value'}
    {:option-name 'valueB' :choiceOf 'value'}
    {:option-name 'value' :choices ['valueA' 'valueB']}]
  =>
  [{:option-name 'value' :choices
    [{:option-name 'valueA' :choiceOf 'value'}
     {:option-name 'valueB' :choiceOf 'value'}]}]"
  [fhir-schemas]
  (let [masters
        (->>
         fhir-schemas
         (filter :choices))
        slaves
        (->> fhir-schemas
             (group-by :choiceOf)
             (remove (fn [[k _]] (nil? k)))
             (into {}))]
    (->> fhir-schemas
         (remove #(or (:choices %) (:choiceOf %)))
         (concat (mapv #(add-choices % slaves) masters)))))

(defn add-keys [option-name elements]
  (mapv
   (fn [element]
     (assoc element :key (create-key option-name (:option-name element))))
   elements))

(defn flat-elements
  "{:elements {:a {1 2 3 4}}} => [{:option-name a 1 2 3 4}] "
  [parent-element]
  (reduce
   (fn [acc [k v]]
     (conj acc
           (assoc v :option-name (name k))))
   []
   (:elements parent-element)))

(defn pre-process-fhir-schema [fhir-schema]
  (->> fhir-schema
       flat-elements
       group-choice-of
       (sort-by :option-name)
       (add-keys (:option-name fhir-schema))))


(def flags-cell-style
  {:text-align :center
   :width      "46px"})

(def cardinality-cell-style
  {:text-align :center
   :width      "44px"})

(def type-cell-style
  {:width      "150px"})

(def description-cell-style
  {:min-width  "100px"
   :max-width  "350px"})

(defn render-resource [element]
  (assoc element :title
         (r/as-element
          [:> Flex {:gap 4}
           [:> Space {:style {:width "264px"}}
            [icon-resource]
            (:option-name element)]

           [:div {:style (merge flags-cell-style {:margin-left "68px"})}
            "Flags"]
           [:div {:style cardinality-cell-style}
            "Card."]
           [:div {:style type-cell-style}
            "Type"]
           [:div {:style description-cell-style}
            "Description"]])))

(defn render-element* [element fhir-schema & [lvl]]
  (let [lvl (or lvl 0)]
    (r/as-element
     [:> Flex {:gap 4, :style {:height "30px"}}
      [:div {:style {:width (str (- 300 (* 32 lvl)) "px")}}
       [:> Space
        [render-icon element]
        (str (:option-name element)
             (when (:choices element) " [x]"))]]

      [:div {:style flags-cell-style}
       [render-modifiers element]]

      [:div {:style cardinality-cell-style}
       (str (or
             (when (contains?
                    (into #{} (:required fhir-schema))
                    (:option-name element))
               "1")
             (:min element)
             "0")
            ".."
            (or (when (:array element) "*")
                (:max element)
                "1"))]

      [:div {:style type-cell-style}
       (when (:type element)
         [:a (:type element)])]

      [:div {:style description-cell-style}
       (when (:binding element)
         (let [value-set (-> element :binding :valueSet)]
           [:> Typography.Text {:ellipsis true, :style {:vertical-align :middle}}
            "Binding: "
            [:a {:href value-set, :target "_blank"}
             (shorten-valueset-name value-set)
             " (" (:strength (:binding element)) ")"]]))]])))

(defn render-element [element fhir-schema & [lvl]]
  (let [lvl (or lvl 0)
        element (cond-> element
                  (not (:key element))
                  (assoc :key (create-key (or (:key fhir-schema)
                                              (:option-name fhir-schema)
                                              (:type fhir-schema))
                                          (:option-name element))))]
    (cond->
     (assoc element :title (render-element* element fhir-schema lvl))

      (:choices element)
      (assoc :children (mapv
                        (fn [c]
                          {:title (render-element* c fhir-schema (inc lvl))
                           :key   (create-key (:key element) (:option-name c))})
                        (:choices element)))

      (:elements element) ;; backbone element
      (assoc :children
             (mapv
              (fn [c]
                (render-element c (pre-process-fhir-schema element) (inc lvl)))
              (pre-process-fhir-schema element))))))

(defn fhir-schema->options [resource-type fhir-schema]
  (let [rt-key (create-key nil resource-type)]
    (into [(render-resource
            {:option-name (option-name resource-type fhir-schema)
             :key         rt-key})]
          (mapv
           (fn [element]
             (-> element
                 (assoc :key (create-key rt-key (:option-name element)))
                 (render-element fhir-schema)))
           (pre-process-fhir-schema fhir-schema)))))

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

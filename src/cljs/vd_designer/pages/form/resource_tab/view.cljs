(ns vd-designer.pages.form.resource-tab.view
  (:require [antd :refer [Space Flex Spin]]
            [re-frame.core :refer [subscribe]]
            [clojure.string :as str]
            [reagent.core :as r]
            [vd-designer.components.tree :refer [tree]]
            [vd-designer.pages.form.model :as form-model]
            [vd-designer.pages.form.resource-tab.model :as m]))

(defn create-key [parent-key element-name]
  (when element-name
    (if parent-key
      (str parent-key "-" (str/lower-case element-name))
      (str/lower-case element-name))))


(defn icon-choice []
  [:img {:width "14" :height "14" :src "/img/fhir/choice.png"}])

(defn icon-datatype []
  [:img {:width "14" :height "14" :src "/img/fhir/datatype.png"}])

(defn icon-primitive []
  [:img {:width "14" :height "14" :src "/img/fhir/primitive.png"}])

(defn icon-folder []
  [:img {:width "14" :height "14" :src "/img/fhir/folder.png"}])

(defn icon-reference []
  [:img {:width "14" :height "14" :src "/img/fhir/reference.png"}])

(defn icon-resource []
  [:img {:width "14" :height "14" :src "/img/fhir/resource.png"}])

(defn render-resource [element]
  (assoc element :title
         (r/as-element
          [:span
           [:> Space
            [icon-resource]

            (:option-name element)]
           [:span {:style {:padding-left 300
                           :padding-right 32
                           :min-width "32px"
                           :max-width "32px"
                           :display "inline-block"}}
            "Flags"]
           [:span {:style {:padding-left 32
                           :padding-right 32
                           :min-width "32px"
                           :max-width "32px"
                           :display "inline-block"}}
            "Card."]
           [:span {:style {:padding-left 32
                           :min-width "150px"
                           :max-width "150px"
                           :display "inline-block"}}
            "Type"]
           [:span {:style {:padding-left 32
                           :overflow "hidden"}}
            "Description"]])))

(defn shorten-valueset-name [value-set-name]
  (last (str/split value-set-name #"/")))

(defn option-name [element-name element]
  (cond
    element-name
    element-name

    (:id element)
    (:id element)
    :else ""))

(defn flat-elements
  "{:elements {:a {1 2 3 4}}} => [{:option-name a 1 2 3 4}] "
  [parent-element]
  (reduce
   (fn [acc [k v]]
     (conj acc
           (assoc v :option-name (name k))))
   []
   (:elements parent-element)))

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

(defn pre-process-fhir-schema [fhir-schema]
  (->> fhir-schema
       flat-elements
       group-choice-of
       (sort-by :option-name)
       (add-keys (:option-name fhir-schema))))

(defn render-icon [element]
  (cond
    (:choices element)
    [icon-choice]

    (= "Reference" (:type element))
    [icon-reference]

    (and (:type element)
         (let [first-char (subs (:type element) 0 1)]
           (and first-char (= first-char (.toUpperCase first-char)))))
    [icon-datatype]

    (= "BackboneElement" (:type element))
    [icon-folder]

    (:type element)
    [icon-primitive]))

(defn render-modifiers [element]
  [:> Space
   (when (:modifier element)
     [:span "?!"])

   (when (:mustSupport element)
     [:span "S"])

   (when (:summary element)
     [:span "Σ"])])

(defn render-element* [element fhir-schema & [lvl]]
  (let [lvl (or lvl 0)]
    (r/as-element
     [:span {:style {:height "30px"}}
      [:span
       {:style {:min-width (str (- 300 (* 32 lvl)) "px")
                :max-width (str (- 300 (* 32 lvl)) "px")
                :display "inline-block"}}
       [:> Space
        [render-icon element]
        (str (:option-name element)
             (when (:choices element) "[x]"))]]

      [:span {:style {:padding-left 32
                      :padding-right 32
                      :min-width "32px"
                      :max-width "32px"
                      :display "inline-block"}}
       [render-modifiers element]]

      [:span {:style {:padding-left 32
                      :padding-right 32
                      :min-width "32px"
                      :max-width "32px"
                      :display "inline-block"}}
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

      [:span {:style {:padding-left 32
                      :min-width "150px"
                      :max-width "150px"
                      :display "inline-block"}}
       (when (:type element)
         [:a (:type element)])]

      [:span {:style {:padding-left 32
                      :overflow "hidden"}}
       (when (:binding element)
         (let [value-set (-> element :binding :valueSet)]
           [:<>
            "Binding: "
            [:a {:href value-set}
             (shorten-valueset-name value-set)
             "(" (:strength (:binding element)) ")"]]))]])))

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
                           :key (create-key (:key element) (:option-name c))})
                        (:choices element)))

      (:elements element) ;; backboneelement
      (assoc :children
             (mapv
              (fn [c]
                (render-element c (pre-process-fhir-schema element) (inc lvl)))
              (pre-process-fhir-schema element))))))

(defn fhir-schema->options [resource-type fhir-schema]
  (let [rt-key (create-key nil resource-type)]
    (into [(render-resource
            {:option-name (option-name resource-type fhir-schema)
             :key rt-key})]
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
      [tree {:style         {:padding-right "10px"}
             :defaultExpandAll true
             :class        "vd-tree resource-tab"
             :tree-data (clj->js (schema->tree-data resource))}]
      [:> Flex {:style   {:padding-top "50%"}
                :justify :center
                :align   :center
                :flex    1}
       [:> Spin {:size :large}]])))

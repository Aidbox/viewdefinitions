(ns vd-designer.pages.form.resource-tab.components
  (:require [antd :refer [Space Tooltip]]))

;;;; Icons & symbols

(defn- icon [path]
  [:img {:width "14" :height "14" :src path}])

(defn icon-choice []
  (icon "/img/fhir/choice.png"))

(defn icon-datatype []
  (icon "/img/fhir/datatype.png"))

(defn icon-primitive []
  (icon "/img/fhir/primitive.png"))

(defn icon-folder []
  (icon "/img/fhir/folder.png"))

(defn icon-reference []
  (icon "/img/fhir/reference.png"))

(defn icon-resource []
  (icon "/img/fhir/resource.png"))


(defn render-icon [element]
  [:span {:style {:padding-right "4px"}}
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
     [icon-primitive])])

(defn render-modifiers [element]
  [:> Space
   (when (:modifier element)
     [:> Tooltip {:placement :top
                  :title     "This element is a modifying element"}
      [:span "?!"]])

   (when (:mustSupport element)
     [:> Tooltip {:placement :top
                  :title     "This element is an element that must be supported"}
      [:span "S"]])

   (when (:summary element)
     [:> Tooltip {:placement :top
                  :title     "This element is an element that is part of the summary set"}
      [:span "Σ"]])])

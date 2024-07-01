(ns vd-designer.pages.form.resource-tab.components
  (:require [antd :refer [Space]]))

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
   (when (:mustSupport element)
     [:span "S"])

   (when (:summary element)
     [:span "Σ"])])

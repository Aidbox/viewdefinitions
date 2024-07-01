(ns vd-designer.pages.form.resource-tab.components
  (:require [antd :refer [Space Tooltip]]
            [clojure.string :as str]))

;;;; Icons & symbols

(defn- icon [path desc & [opts]]
  [:> Tooltip {:placement :top
               :mouseEnterDelay 0.4
               :title     desc}
   [:img {:width "16" :height "16" :src path
          ;; https://tonsky.me/blog/centering/
          :style (merge {:margin-bottom "-2px"
                         :vertical-align "baseline"
                         :margin-right "4px"}
                        opts)}]])

(defn icon-choice []
  [icon "/img/fhir/choice.png" "Choice of Types"])

(defn icon-datatype []
  [icon "/img/fhir/icon_datatype.gif" "Data Type"])

(defn icon-primitive []
  [icon "/img/fhir/primitive.png" "Primitive Data Type"])

(defn icon-folder []
  [icon "/img/fhir/folder.png" "Element"])

(defn icon-reference []
  [icon "/img/fhir/reference.png" "Reference to another resource"])

(defn icon-resource []
  [icon "/img/fhir/resource.png" "Resource"])

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
     [:> Tooltip {:placement :top
                  :mouseEnterDelay 0.4
                  :title     "This element is a modifying element"}
      [:span "?!"]])

   (when (:mustSupport element)
     [:> Tooltip {:placement :top
                  :mouseEnterDelay 0.4
                  :title     "This element is an element that must be supported"}
      [:span "S"]])

   (when (:summary element)
     [:> Tooltip {:placement :top
                  :mouseEnterDelay 0.4
                  :title     "This element is an element that is part of the summary set"}
      [:span "Σ"]])])

(defn referenced-resources [element]
  (when (:refers element)
    (str
     " ("
     (str/join ", "
               (mapv #(last (str/split % #"/"))
                     (:refers element)))
     ")")))

(defn render-type [element]
  (when (:type element)
    (if
     (= "Reference" (:type element))
      [:> Tooltip {:placement :top
                   :mouseEnterDelay 0.5
                   :title     (str "Reference" (referenced-resources element))}
       [:a (:type element)]]
      [:a (:type element)])))

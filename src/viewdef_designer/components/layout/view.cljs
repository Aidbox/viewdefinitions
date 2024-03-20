(ns viewdef-designer.components.layout.view
  (:require [viewdef-designer.components.table :as table])
  (:require-macros [stylo.core :refer [c]]))

(defn layout []
  [:div "test"]
  #_[:div.container {:class (c :grid)}
     [:div.row
      #_[:div.col-md-6
         (form-with-nested nested-forms)]
      [:div.col-md-6 "test"
       #_(table/table)]]])


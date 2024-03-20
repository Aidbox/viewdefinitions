(ns viewdef-designer.components.table
  (:require-macros
   [stylo.core :refer [c]]))

(def row-class (c [:bg :white] [:border 1]))
(def td-class (c [:px 1]))

(defn table [patients]
  (let [headers (keys (first patients))]
   [:div.content
    [:table.table
     {:class (c :w-full :text-sm :text-left :gray-500)}
     [:thead
      {:class (c :text-xs :gray-700 [:bg :gray-100])}
      [:tr
       (for [header headers]
        [:th header])]]
     [:tbody
      (for [p patients]
       [:tr
        {:class row-class}
        (for [[_column value] p]
         [:td {:class td-class}
          (str value)])])]]]))

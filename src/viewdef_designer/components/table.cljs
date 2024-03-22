(ns viewdef-designer.components.table
  (:require-macros
   [stylo.core :refer [c]]))

(def row-class (c [:bg :white] [:border 1]))
(def td-class (c [:px 1]))

(defn table [resources]
  (let [headers (keys (first resources))]
   [:div.content
    [:table.table
     {:class (c :w-full :text-sm
                [:w-min 150]
                :text-left :gray-500)}
     [:thead
      {:class (c :text-xs :gray-700 [:bg :gray-100])}
      [:tr
       (for [header headers]
        [:th header])]]
     [:tbody
      (for [p resources]
       [:tr
        {:class row-class}
        (for [[_column value] p]
         [:td {:class td-class}
          (str value)])])]]]))

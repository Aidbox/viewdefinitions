(ns viewdef-designer.components.table)

;; (defn table [columns values]
(defn table []
  [:table.table
   [:thead
    [:tr.table-primary
     [:th "Column 1"]
     [:th "Column 2"]]]
   [:tbody
    [:tr
     [:td "Row 1, Column 1"]
     [:td "Row 1, Column 2"]]
    [:tr
     [:td "Row 2, Column 1"]
     [:td "Row 2, Column 2"]]]])

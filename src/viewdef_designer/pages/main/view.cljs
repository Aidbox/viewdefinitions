(ns viewdef-designer.pages.main.view
  (:require
   [re-frame.core :refer [subscribe dispatch]]
   [viewdef-designer.components.table :as table]
   [viewdef-designer.pages.main.model :as model]
   [viewdef-designer.pages.main.controller :as c]
   [suitkin.core :as ui]
   [suitkin.utils :as su]
   [viewdef-designer.routes :as routes])
  (:require-macros
   [stylo.core :refer [c]]))

(defn resource-dropdown [_items]
  (let [selected-resource @(subscribe [::model/resource])]
    [:div
     {:class (c :grid :grid-flow-col)}
     [:h1 "Resource"]
     [ui/dropdown
      {:id     "resource-dropdown"
       :value selected-resource
       :search {:id "resource-search"
                :s/invalid? false
                :placeholder "ResourceType"
                :readOnly false}
       :menu   {:not-found "No resource found"
                :on-select (fn [_event item]
                             (dispatch [::c/select-resource item]))
                :items     [{:id "Patient" :value "patient" :title "Patient"}
                            {:id "Observation" :value "observation" :title "Observation"}
                            {:id "Practitioner" :value "practitioner" :title "Practitioner"}]}}]]))

(defn constants-dropdown [_items]
  (let [selected-constant @(subscribe [::model/constants])]
    [:div
     {:class (c :grid :grid-flow-col)}
     [:h1 "Constants"]
     [ui/dropdown
      {:id     "constants-dropdown"
       :value selected-constant
       :search {:id "constants-search"
                :s/invalid? false
                :placeholder "Constants"
                :readOnly false}
       :menu   {:not-found "No constant found"
                :on-select (fn [_event item]
                             (dispatch [::c/select-constants item]))
                :items     [{:id "c1" :value "c1" :title "c1"}
                            {:id "c2" :value "c2" :title "c2"}
                            {:id "c3" :value "c3" :title "c3"}]}}]]))

(defn form []
  [:div
   [ui/input {:id          "view-def-name"
              :s/invalid? false
              :placeholder "ViewDefinition1"
              :on-change   (fn [e] (dispatch [::c/select-view-definition-name (su/target-value e)]))}]
   [resource-dropdown []]
   [:div {:class (c [:ml 10])}
    ]

   [:div {:class (c [:ml 10])}
    "where "]

   [:div {:class (c [:ml 10])}
    "select "]

   ])

(defn header []
  [:div "ViewDefinitions /"])

(defn main-view []
  (let [patients
        @(subscribe [::model/patients])]
    [:div.layout
     [header]
     [:div {:class (c :grid :grid-flow-col [:gap 5]
                      {:grid-template-columns "40% 60%"}
                      [:m 5])}
      [form]
      [table/table patients]]]))

(defmethod routes/pages :main-page [] [main-view])

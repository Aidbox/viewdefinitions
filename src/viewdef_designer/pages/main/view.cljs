(ns viewdef-designer.pages.main.view
  (:require
   [re-frame.core :refer [subscribe dispatch reg-event-fx]]
   [viewdef-designer.components.table :as table]
   [viewdef-designer.pages.main.model :as model]
   [viewdef-designer.pages.main.controller :as c]
   [suitkin.core :as ui]
   [suitkin.utils :as su]
   [viewdef-designer.routes :as routes])
  (:require-macros
   [stylo.core :refer [c]]))

(defn resource-dropdown []
  (let [suggested-resources @(subscribe [::model/suggested-resources])
        selected-resource @(subscribe [::model/selected-resource])]
    [:div
     {:class (c :grid :grid-flow-col)}
     [:h1 "Resource"]
     [ui/dropdown
      {:id "resource-dropdown"
       :value (:value selected-resource)
       :search {:id "resource-search"
                :s/invalid? false
                :placeholder "ResourceType"
                #_#_:on-click  (fn [_e] (dispatch [::c/select-resource nil]))
                :on-change (fn [e] (dispatch [::c/select-resource (su/target-value e)]))
                :readOnly false}
       :menu   {:not-found "No resource found"
                :on-select (fn [_event item]
                             (dispatch [::c/select-resource item]))
                :items suggested-resources}}]]))

(defn form []
  [:div
   [ui/input {:id          "view-def-name"
              :s/invalid? false
              :placeholder "ViewDefinition1"
              :on-change   (fn [e] (dispatch [::c/select-view-definition-name (su/target-value e)]))}]
   [resource-dropdown]
   [:div {:class (c [:ml 10])}
    ]

   [:div {:class (c [:ml 10])}
    "where "]

   [:div {:class (c [:ml 10])}
    "select "]

   ])


(reg-event-fx
 ::go-to-vd-page
 (fn [_ [_]]
   {::routes/navigate :vd}))

(defn header []
  [ui/button
   {:on-click (fn [_e] (dispatch [::go-to-vd-page])) }
   "ViewDefinitions /"])

(defn main-view []
  (let [patients @(subscribe [::model/patients])]
    [:div.layout
     [header]
     [:div {:class (c :grid :grid-flow-col [:gap 5]
                      {:grid-template-columns "40% 60%"}
                      [:m 5])}
      [form]
      [table/table patients]]]))

(defmethod routes/pages :main-page [] [main-view])

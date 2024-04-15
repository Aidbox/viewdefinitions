(ns vd-designer.pages.vd-list.view
  (:require [clojure.string :as str]
            [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.components.list :refer [vd-data-list]]
            [reitit.frontend.easy :as rfe]
            [vd-designer.pages.vd-list.controller :as c]
            [vd-designer.pages.vd-list.model :as m]
            [vd-designer.pages.settings.model :as settings-model]
            [vd-designer.pages.settings.controller :as settings-controller]
            [vd-designer.components.button :as button]
            [vd-designer.components.input :as input]
            [vd-designer.utils.event :refer [target-value]]))

(defn search []
  [input/search
   :placeholder "input search text"
   :on-change #(dispatch [::c/filter-updated (target-value %)])
   :style {:width "100%"}])

(defn grep-vd [vd filter-phrase]
  (or (-> vd :resource :name (str/includes? filter-phrase))
      (-> vd :resource :description (str/includes? filter-phrase))
      (-> vd :resource :resource (str/includes? filter-phrase))))

(defn filter-vds [view-definitions]
  (let [filter-phrase @(subscribe [::m/filter-phrase])]
    (cond-> view-definitions
            filter-phrase (->> (filter #(grep-vd % filter-phrase))))))

(defn viewdefinition-list-view []
  (let [used-server-name @(subscribe [::settings-model/used-server-name])]
    [:div {:style {:width "60%"}}
     [:div {:style {:display         :flex
                    :justify-content :space-between
                    :align-items     :center
                    :width           "100%"}}
      [:h1 "View Definitions"]
      (when used-server-name
        [button/add-view-definition "+ ViewDefinition"
         {:on-click
          (fn [_e]
            (rfe/navigate :form-create))}])]
     [:div
      [search]
      [vd-data-list
       #(rfe/navigate :form-edit {:path-params {:id %}})
       [(fn [id]
          [:div
           [:a
            {:onClick #(dispatch [::c/delete-view-definition id])} "delete"]])]
       :loading @(subscribe [::m/view-defs-loading?])
       :dataSource (filter-vds @(subscribe [::m/view-defs]))]
      (when-not used-server-name
        [:a {:on-click #(rfe/navigate :settings) }
         "Connect"])]]))

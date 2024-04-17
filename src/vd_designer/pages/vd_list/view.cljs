(ns vd-designer.pages.vd-list.view
  (:require [antd :refer [Flex]]
            [clojure.string :as str]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [reitit.frontend.easy :as rfe]
            [vd-designer.components.heading :refer [h1]]
            [vd-designer.components.list :refer [vd-data-list]]
            [vd-designer.components.modal :as modal]
            [vd-designer.pages.settings.model :as settings-model]
            [vd-designer.pages.vd-list.components :refer [add-view-definition
                                                          search-input]]
            [vd-designer.pages.vd-list.controller :as c]
            [vd-designer.pages.vd-list.model :as m]
            [vd-designer.utils.string :as string-utils]))

(defn- grep-vd [vd filter-phrase]
  (or (-> vd :resource :name (str/includes? filter-phrase))
      (-> vd :resource :description (str/includes? filter-phrase))
      (-> vd :resource :resource (str/includes? filter-phrase))))

(defn- filter-vds [view-definitions]
  (let [filter-phrase @(subscribe [::m/filter-phrase])]
    (cond-> view-definitions
      filter-phrase (->> (filter #(grep-vd % filter-phrase))))))

(defn delete-view-modal [id]
  (let [vd-name @(subscribe [::m/vd-name-by-id id])]
    (modal/modal-confirm
     {:title   "Delete ViewDefinition"
      :ok-text "Delete"
      :onOk    #(dispatch [::c/delete-view-definition id])
      :content (r/as-element
                [:div (string-utils/format "Are you sure you want to delete ViewDefinition %s?" vd-name)])})))

(defn viewdefinition-list-view []
  (let [used-server-name @(subscribe [::settings-model/used-server-name])]
    [:div {:style {:width "60%"}}
     [:> Flex {:align   :center
               :justify :space-between}
      [h1 "View Definitions" {:style {:padding-bottom "8px"}}]
      (when used-server-name
        [add-view-definition])]
     [:div
      [search-input]
      [vd-data-list
       #(rfe/navigate :form-edit {:path-params {:id %}})
       [(fn [id]
          [:div [:a {:onClick #(delete-view-modal id)} "delete"]])]
       :loading @(subscribe [::m/view-defs-loading?])
       :dataSource (filter-vds @(subscribe [::m/view-defs]))]
      (when-not used-server-name
        [:a {:on-click #(rfe/navigate :settings)}
         "Connect"])]]))

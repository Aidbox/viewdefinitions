(ns vd-designer.pages.vd-list.view
  (:require
   [clojure.string :as str]
   [re-frame.core :refer [dispatch subscribe]]
   [reagent.core :as r]
   [reitit.frontend.easy :as rfe]
   [vd-designer.components.button :as button]
   [vd-designer.components.input :as input]
   [vd-designer.components.list :refer [vd-data-list]]
   [vd-designer.components.modal :as modal]
   [vd-designer.pages.settings.model :as settings-model]
   [vd-designer.pages.vd-list.controller :as c]
   [vd-designer.pages.vd-list.model :as m]
   [vd-designer.utils.event :refer [target-value]]
   [vd-designer.utils.string :as string-utils]))

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

(defn delete-view-modal [id]
  (let [vd-name @(subscribe [::m/vd-name-by-id id])]
    (modal/modal-confirm
      {:title "Delete ViewDefinition"
       :ok-text   "Delete"
       :onOk  #(dispatch [::c/delete-view-definition id])
       :content
       (r/as-element
         [:div (string-utils/format "Are you sure you want to delete ViewDefinition %s?" vd-name)])})))

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
          [:div [:a {:onClick #(delete-view-modal id)} "delete"]])]
       :loading @(subscribe [::m/view-defs-loading?])
       :dataSource (filter-vds @(subscribe [::m/view-defs]))]
      (when-not used-server-name
        [:a {:on-click #(rfe/navigate :settings) }
         "Connect"])]]))

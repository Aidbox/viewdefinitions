(ns vd-designer.pages.lists.vds.view
  (:require [antd :refer [Flex Typography]]
            [clojure.string :as str]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [reitit.frontend.easy :as rfe]
            [vd-designer.auth.model :as auth-model]
            [vd-designer.components.list :refer [vd-data-list]]
            [vd-designer.components.modal :as modal]
            [vd-designer.pages.lists.settings.model :as settings-model]
            [vd-designer.pages.lists.vds.components :refer [add-view-definition
                                                            search-input]]
            [vd-designer.pages.lists.vds.controller :as c]
            [vd-designer.pages.lists.vds.import :refer [import-modal]]
            [vd-designer.pages.lists.vds.model :as m]
            [vd-designer.utils.string :as string-utils]
            [vd-designer.utils.tag-manager :as tag-manager]))

(defn- grep-vd [vd filter-phrase]
  (or (some-> vd :resource :title (str/includes? filter-phrase))
      (some-> vd :resource :name (str/includes? filter-phrase))
      (some-> vd :resource :description (str/includes? filter-phrase))
      (some-> vd :resource :resource (str/includes? filter-phrase))))

(defn- filter-vds [view-definitions]
  (let [filter-phrase @(subscribe [::m/filter-phrase])]
    (cond-> view-definitions
      filter-phrase (->> (filter #(grep-vd % filter-phrase))))))

(defn sort-vds [view-definitions]
  (sort-by #(-> % :resource :title) view-definitions))

(defn delete-view-modal [id]
  (let [vd-name @(subscribe [::m/vd-name-by-id id])]
    (modal/modal-confirm
     {:title   "Delete ViewDefinition"
      :ok-text "Delete"
      :onOk    #(dispatch [::c/delete-view-definition id])
      :content (r/as-element
                [:div (string-utils/format "Are you sure you want to delete ViewDefinition %s?" vd-name)])})))

(defn viewdefinition-list-view []
  (let [used-server-name @(subscribe [::settings-model/used-server-name])
        authorized? @(subscribe [::auth-model/authorized?])]
    [:<>
     [:> Flex {:align   :center
               :justify :space-between}
      [:> Typography.Title {:level 1 :style {:margin-top 0}} "View Definitions"]
      (when used-server-name
        [:<>
         [import-modal]
         [add-view-definition]])]

     [:<>
      [:div {:style {:margin "16px 0"}}
       [search-input]]
      [vd-data-list
       #(do
          (tag-manager/data-layer
            {:dataLayer {:event "vd_view" :id %}})
          (rfe/navigate :form-edit {:path-params {:id %}}))
       (when authorized?
         [(fn [id]
            [:div [:a {:onClick #(delete-view-modal id)} "delete"]])])
       :loading @(subscribe [::m/view-defs-loading?])
       :dataSource (-> @(subscribe [::m/view-defs])
                       filter-vds
                       sort-vds)]
      (when-not used-server-name
        [:a {:on-click #(rfe/navigate :settings)}
         "Connect"])]]))

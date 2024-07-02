(ns vd-designer.pages.lists.vds.components
  (:require ["@ant-design/icons" :as icons]
            [re-frame.core :refer [dispatch]]
            [reitit.frontend.easy :as rfe]
            [vd-designer.components.dropdown :refer [add-dropdown
                                                     dropdown-item-ant]]
            [vd-designer.components.input :as input]
            [vd-designer.pages.lists.vds.controller :as c]
            [vd-designer.utils.event :refer [target-value]]
            [vd-designer.utils.tag-manager :as tag-manager]))

(defn search-input []
  [input/search {:placeholder "Type view definition name"
                 :on-change   #(dispatch [::c/filter-updated (target-value %)])
                 :style       {:width "100%"}}])

(defn add-view-definition []
  [add-dropdown "ViewDefinition"
   {:arrow false
    :menu  {:items   [(dropdown-item-ant "vd_create_new" "New"    icons/FileAddOutlined)
                      {:type "divider"}
                      (dropdown-item-ant "vd_create_import" "Import" icons/UploadOutlined)]
            :onClick #(case (.-key %)
                        "New"
                        (do
                          (tag-manager/data-layer
                           {:dataLayer {:event "vd_create_new"}})
                          (rfe/navigate :form-create))

                        "Import"
                        (do
                          (tag-manager/data-layer
                           {:dataLayer {:event "vd_create_import"}})
                          (dispatch [::c/start-import])))}}
   {:size  :default
    :type  :primary
    :ghost true}])

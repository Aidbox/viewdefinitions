(ns vd-designer.pages.vd-list.components
  (:require ["@ant-design/icons" :as icons]
            [re-frame.core :refer [dispatch]]
            [reitit.frontend.easy :as rfe]
            [vd-designer.components.dropdown :refer [add-dropdown
                                                     dropdown-item-ant]]
            [vd-designer.components.input :as input]
            [vd-designer.pages.vd-list.controller :as c]
            [vd-designer.utils.event :refer [target-value]]))

(defn search-input []
  [input/search {:placeholder "Type view definition name"
                 :on-change   #(dispatch [::c/filter-updated (target-value %)])
                 :style       {:width "100%"}}])

(defn add-view-definition []
  [add-dropdown "ViewDefinition"
   {:arrow false
    :menu {:items   (interpose {:type "divider"}
                               [(dropdown-item-ant "new"    icons/FileAddOutlined)
                                (dropdown-item-ant "import" icons/UploadOutlined)])
           :onClick #(case (keyword (.-key %))
                       :new    (rfe/navigate :form-create)
                       :import (dispatch [::c/start-import]))}}
   {:size :default}])

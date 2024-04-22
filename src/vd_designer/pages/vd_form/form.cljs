(ns vd-designer.pages.vd-form.form
  (:require [antd :refer [Flex Spin]]
            [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.components.tree :refer [tree] :as tree]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.fhir-schema :refer [create-render-context]]
            [vd-designer.pages.vd-form.form.tree :refer [draggable? drop-allowed? vd-tree]]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.utils.string :as str.utils]))

(defn form []
  (let [vd @(subscribe [::m/current-vd])
        ctx (create-render-context)
        expanded-keys @(subscribe [::m/current-tree-expanded-nodes])]
    (if vd
      [tree {:style         {:padding-right "16px"}
             :on-expand     #(dispatch [::c/update-tree-expanded-nodes
                                        (->> % js->clj (map str.utils/parse-path))])
             :expanded-keys (map tree/calc-key expanded-keys)
             :tree-data     (vd-tree ctx vd)
             :draggable     draggable?
             :allow-drop    drop-allowed?
             :on-drop       #(dispatch [::c/change-tree-elements-order
                                        (js->clj % :keywordize-keys true)])}]
      [:> Flex {:style   {:padding-top "50%"}
                :justify :center
                :align   :center
                :flex    1}
       [:> Spin {:size :large}]])))

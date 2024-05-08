(ns vd-designer.components.dropdown
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Button ConfigProvider Dropdown Space]]
            [medley.core :as medley]
            [reagent.core :as r]
            [vd-designer.components.button :refer [add-button-config]]
            [vd-designer.utils.react :refer [create-react-image]]))

(defn dropdown-item-ant [label icon]
  {:label label
   :key   label
   :icon  (r/create-element icon)})

(defn dropdown-item-img [label icon-path]
  {:label label
   :key   label
   :icon  (create-react-image icon-path)})

(defn add-dropdown
  "Dropdown with actions.
   For more details see: https://ant.design/components/dropdown#api"
  [text & [dropdown-opts button-opts]]
  [:> ConfigProvider {:theme {:components {:Button (add-button-config)}}}
   [:> Dropdown (medley/deep-merge
                 {:arrow true}
                 dropdown-opts)
    [:> Button (medley/deep-merge
                {:size  :small}
                button-opts)
     [:> Space (r/create-element icons/PlusOutlined) text]]]])

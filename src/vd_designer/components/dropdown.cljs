(ns vd-designer.components.dropdown
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Button Dropdown Space]]
            [reagent.core :as r]
            [vd-designer.utils.react :refer [create-react-image]]))

(defn dropdown [text items handle-click]
  [:> Dropdown {:menu {:items items :onClick handle-click}
                :arrow true
                :style {:width "55px" :height "18px" :flex-shrink 0}}
   [:> Button {:style {:color "#7972D3" :border "1px solid #7972D399"}}
    [:> Space (r/create-element icons/PlusOutlined) text]]])

(defn new-select [handle-click]
  (dropdown
   "select"
   [{:label "column" :key "column" :icon (create-react-image "/img/form/column.svg")}
    {:type "divider"}
    {:label "forEach" :key "forEach" :icon (create-react-image "/img/form/forEach.svg")}
    {:type "divider"}
    {:label "forEachOrNull" :key "forEachOrNull" :icon (create-react-image "/img/form/forEach.svg")}
    {:type "divider"}
    {:label "unionAll" :key "unionAll" :icon (create-react-image "/img/form/union.svg")}]
   handle-click))

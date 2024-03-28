(ns vd-designer.components.dropdown
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Button Dropdown Space]]
            [reagent.core :as r]
            [vd-designer.utils.react :refer [create-react-image]]))

(defn dropdown-item [label icon-path]
  {:label label
   :key   label
   :icon  (create-react-image icon-path)})

(defn dropdown
  "Dropdown with actions.
   For more details see: https://ant.design/components/dropdown#api"
  [text & {:as opts}]
  [:> Dropdown (merge-with
                into
                {:arrow true
                 :style {:width "55px" :height "18px" :flex-shrink 0}}
                opts)
   [:> Button {:size "small"
               :style {:color "#7972D3" :border "1px solid #7972D399"}}
    [:> Space (r/create-element icons/PlusOutlined) text]]])

(defn new-select
  "Dropdown with actions for new select"
  [handle-click & {:as opts}]
  (dropdown "select"
            :menu {:items   [(dropdown-item "column"        "/img/form/column.svg")
                             {:type "divider"}
                             (dropdown-item "forEach"       "/img/form/forEach.svg")
                             {:type "divider"}
                             (dropdown-item "forEachOrNull" "/img/form/forEach.svg")
                             {:type "divider"}
                             (dropdown-item "unionAll"      "/img/form/unionAll.svg")]
                   :onClick handle-click}
            opts))

(ns vd-designer.pages.vd-form.components
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Col ConfigProvider Form Popover Row Space]]
            [medley.core :as medley]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.components.button :as button]
            [vd-designer.components.dropdown :refer [new-select]]
            [vd-designer.components.heading :refer [h4]]
            [vd-designer.components.input :refer [input]]
            [vd-designer.components.select :refer [select]]
            [vd-designer.components.tag :as tag]
            [vd-designer.components.tree :refer [calc-key]]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.utils.event :as u]
            [vd-designer.utils.js :refer [get-element-by-id toggle-class]]))


;;;; Tags

(defn tree-tag [kind]
  (case kind
    :select
    (tag/tag "select"
             :style {:color      "#7972D3"
                     :background "#7972D31A"})

    :column
    (tag/tag "column"
             :style {:color      "#009906"
                     :background "#E5FAE8"})

    :unionAll
    (tag/tag "unionall"
             :style {:color      "#BA004E"
                     :background "#FE60901A"})

    :forEach
    (tag/tag "foreach"
             :style {:color      "#B37804"
                     :background "#F8CE3B1A"})
    :forEachOrNull
    (tag/tag "foreach or null"
             :style {:color      "#B37804"
                     :background "#F8CE3B1A"})

    :constant
    (tag/default "constant")

    :where
    (tag/default "where")))


;;;; Rows

(defn base-node-row [node-key col1 & cols]
  (->> cols
       (mapv (fn [col] [:> Col {:flex "30px"} col]))
       (into [:> Row {:align :middle
                      :on-click #(dispatch [::c/toggle-expand-collapse node-key])}
              [:> Col {:flex :auto} col1]])))

(defn base-input-row [ctx col1 col2]
  [:> Row {:align  :middle
           :gutter 16
           :id     (calc-key (:value-path ctx))}
   [:> Col {:span 12}
    [:> Row {:justify :start} col1]]

   [:> Col {:span 12}
    [:> Row {:justify :end} col2]]])


;;;; Buttons

(defn add-element-button [name ctx]
  [button/ghost name icons/PlusOutlined
   {:onClick #(dispatch [::c/add-tree-element (:value-path ctx)])
    :style   {:width      "100%"
              :text-align "left"}}])

(defn add-select-button [ctx]
  (let [requested-key #(keyword (.-key %))]
    [new-select #(dispatch [::c/add-tree-element
                            (:value-path ctx)
                            (case (requested-key %)
                              :column        {:column   [{:name "", :path ""}]}
                              :forEach       {:forEach       "" :select []}
                              :forEachOrNull {:forEachOrNull "" :select []}
                              :unionAll      {:unionAll []})])]))


(defn delete-button [ctx]
  [button/invisible-icon icons/CloseOutlined
   {:onClick #(dispatch [::c/delete-tree-element (:value-path ctx)])}])

(defn settings-button [& {:as opts}]
  [button/invisible-icon icons/SettingOutlined opts])


;;;; Inputs

(defn change-input-value [ctx key e]
  (dispatch [::c/change-input-value
             (conj (:value-path ctx) key)
             (u/target-value e)]))

(defn name-input [ctx vd-form]
  [base-input-row ctx
   [tag/default "name"]
   [input {:value       (:name vd-form)
           :placeholder "ViewDefinition"
           :style       {:font-style "normal"
                         :min-width "200px"
                         :max-width "400px"}
           :onChange    (fn [e] (dispatch [::c/change-vd-name (u/target-value e)]))}]])

(defn resource-input [ctx vd-form]
  [base-input-row ctx
   [tag/default "resource"]
   [select :placeholder "Resource type"
    :options @(subscribe [::m/get-all-supported-resources])
    :class "vd-resource"
    :style {:min-width "200px"
            :max-width "400px"}
    :value (:resource vd-form)
    :onSelect #(dispatch [::c/change-vd-resource %])]])

(defn toggle-settings-popover-hover [ctx]
  (let [tree-element-id (calc-key (:value-path ctx))
        button-id (str tree-element-id "-settings-btn")]
    (-> (get-element-by-id button-id)
        (toggle-class "active"))
    (-> (get-element-by-id tree-element-id)
        (.-parentNode)
        (.-parentNode)
        (toggle-class "active"))))

(defn settings-popover [ctx & {:as opts}]
  (let [tree-element-id (calc-key (:value-path ctx))
        button-id (str tree-element-id "-settings-btn")
        opened-id @(subscribe [::m/settings-opened-id])]
    [:> Popover (medley/deep-merge
                 {:trigger :click
                  :open (= button-id opened-id)}
                 opts)
     [:div [settings-button {:onClick (fn [_e]
                                        (toggle-settings-popover-hover ctx)
                                        (dispatch [::c/toggle-settings-opened-id button-id]))
                             :id button-id}]]]))

(defn fhir-path-input [ctx key value deletable? settings-form]
  [:> Space.Compact {:block true
                     :style {:align-items :center
                             :gap         4}}
   [input {:placeholder  "path"
           :defaultValue value
           :onChange     #(change-input-value ctx key %)}]
   (when settings-form
     [settings-popover ctx {:placement :right
                            :content   (r/as-element [settings-form ctx])}])
   (when deletable? [delete-button ctx])])


;;;; Settings

(defn settings-base-form [title props popoverCloseAction items]
  [:> ConfigProvider {:theme {:components {:Form {:itemMarginBottom 8}}}}
   [:> Form (medley/deep-merge
             {:style      {:width 400}
              :labelCol   {:xs {:span 24},
                           :sm {:span 6}},
              :layout     :horizontal
              :labelAlign :left}
             props)
    [h4 title]
    items
    [:div {:style {:textAlign :right}}
     [:> Space
      [button/button "Close" {:size     "small"
                              :onClick  popoverCloseAction
                              :type     "default"
                              :htmlType "reset"}]
      [button/button "Save" {:size     "small"
                             :type     "primary"
                             :htmlType "submit"}]]]]])

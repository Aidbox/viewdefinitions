(ns vd-designer.pages.vd-form.components
  (:require
   ["@ant-design/icons" :as icons]
   [antd :refer [AutoComplete Checkbox Col ConfigProvider Form Input Popover Row Select Space]]
   [clojure.string :as str]
   [medley.core :as medley]
   [re-frame.core :refer [dispatch subscribe]]
   [reagent.core :as r]
   [vd-designer.components.button :as button]
   [vd-designer.components.dropdown :refer [add-dropdown dropdown-item-img]]
   [vd-designer.components.heading :refer [h4]]
   [vd-designer.components.input :refer [input input-number]]
   [vd-designer.components.select :as select]
   [vd-designer.components.tag :as tag]
   [vd-designer.components.tree :refer [calc-key]]
   [vd-designer.pages.vd-form.controller :as c]
   [vd-designer.pages.vd-form.model :as m]
   [vd-designer.utils.event :as u]
   [vd-designer.utils.js :refer [find-elements get-element-by-id remove-class
                                 toggle-class]]))

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
                      :wrap false
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

(defn add-vd-item [ctx kind leaf?]
  (let [column-leaf-value {:name "" :path ""}]
    (dispatch [::c/add-tree-element
               (:value-path ctx)
               (if leaf?
                 (case kind
                   :constant      {:name "" :valueString ""}
                   :where         {:path ""}
                   :column        column-leaf-value)
                 (case kind
                   :column        {:column   [column-leaf-value]}
                   :forEach       {:forEach       "" :select []}
                   :forEachOrNull {:forEachOrNull "" :select []}
                   :unionAll      {:unionAll []}))])))

(defn add-element-button [name ctx]
  [button/ghost name icons/PlusOutlined
   {:onClick #(add-vd-item ctx (keyword name) true)
    :style   {:width      "100%"
              :text-align :left}}])

(defn add-select-button [ctx]
  (let [requested-key #(keyword (.-key %))]
    [add-dropdown "select"
     {:style {:width       "55px"
              :height      "18px"
              :flex-shrink 0}
      :menu {:items   (interpose {:type "divider"}
                                 [(dropdown-item-img "column"        "/img/form/column.svg")
                                  (dropdown-item-img "forEach"       "/img/form/forEach.svg")
                                  (dropdown-item-img "forEachOrNull" "/img/form/forEach.svg")
                                  (dropdown-item-img "unionAll"      "/img/form/unionAll.svg")])
             :on-click #(add-vd-item ctx (requested-key %) false)}}]))

(defn delete-button [ctx]
  [button/invisible-icon icons/CloseOutlined
   {:onClick #(dispatch [::c/delete-tree-element (:value-path ctx)])}])

(defn settings-button [& {:as opts}]
  [button/invisible-icon icons/SettingOutlined opts])


;;;; Inputs

(defn change-input-value [ctx key value]
  (dispatch [::c/change-input-value
             (conj (:value-path ctx) key)
             value]))

(defn eval-on-ctrl-enter [event]
  (when (and (= "Enter" (.-key event))
             (or (.-ctrlKey event) (.-metaKey event)))
    (dispatch [::c/eval-view-definition-data])))

(defn name-input [ctx vd-form]
  (let [errors? @(subscribe [::m/empty-inputs?])]
    [base-input-row ctx
     [tag/default "name"]
     [input {:value       (:name vd-form)
             :onKeyDown   eval-on-ctrl-enter
             :placeholder "ViewDefinition"
             :classNames {:input
                          (if (and (str/blank? (:name vd-form)) errors?)
                            "default-input red-input"
                            "default-input")}
             :style       {:font-style "normal"
                           :min-width "200px"
                           :max-width "400px"}
             :onChange    (fn [e] (dispatch [::c/change-vd-name (u/target-value e)]))}]]))

(defn resource-input [ctx vd-form]
  (let [errors? @(subscribe [::m/empty-inputs?])]
    [base-input-row ctx
     [tag/default "resource"]
     [:> Select (select/with-default-props
                  {:placeholder "Resource type"
                   :options     @(subscribe [::m/get-all-supported-resources])
                   :class (if (and (str/blank? (:resource vd-form)) errors?)
                            "vd-resource red-input"
                            "vd-resource")
                   :style       {:min-width "200px"
                                 :max-width "400px"}
                   :value       (:resource vd-form)
                   :onSelect    #(dispatch [::c/change-vd-resource %])})]]))

(defn- toggle-settings-popover-hover [ctx]
  (let [tree-element-id (calc-key (:value-path ctx))
        button-id       (str tree-element-id "-settings-btn")

        process-hover   (fn [f elements]
                          (mapv (fn [element]
                                  (mapv #(f element %)
                                        ["settings-popover-active" "active"]))
                                elements))]

    (process-hover remove-class (find-elements ".settings-popover-active.active"))
    (when ctx
      (process-hover toggle-class [(get-element-by-id button-id)
                                   (-> (get-element-by-id tree-element-id)
                                       (.-parentNode)
                                       (.-parentNode))]))))

(defn toggle-popover [ctx button-id]
  (toggle-settings-popover-hover ctx)
  (dispatch [::c/toggle-settings-opened-id button-id]))

(defn settings-popover [ctx & {:as opts}]
  (let [tree-element-id (calc-key (:value-path ctx))
        button-id (str tree-element-id "-settings-btn")
        opened-id @(subscribe [::m/settings-opened-id])]
    [:> Popover (medley/deep-merge
                 {:trigger :click
                  :open    (= button-id opened-id)}
                 opts)
     [:div [settings-button {:onClick   #(toggle-popover ctx button-id)
                             :onKeyDown #(when (= "Escape" (.-key %))
                                           (toggle-popover nil nil))
                             :id        button-id}]]]))

(defn render-input [ctx input-type placeholder kind value]
  (case input-type
    :number [input-number {:placeholder  (or placeholder "path")
                           :defaultValue value
                           :onChange #(change-input-value ctx kind %)}]
    :boolean [:div {:style {:width "100%"}}
              [:> Checkbox
               {:checked  value
                :onChange #(change-input-value ctx kind (-> % .-target .-checked))}]]

    (let [errors? @(subscribe [::m/empty-inputs?])]
      [input {:placeholder  (or placeholder "path")
              :onKeyDown eval-on-ctrl-enter
              :onMouseEnter #(dispatch [::c/change-draggable-node false])
              :onMouseLeave #(dispatch [::c/change-draggable-node true])
              :defaultValue value
              :classNames {:input
                           (if (and (str/blank? value) errors?)
                             "default-input red-input"
                             "default-input")}
              :onChange     #(change-input-value ctx kind (u/target-value %))}])))

(defn autocomplete [ctx key value & {:as opts}]
  (let [options @(subscribe [::m/autocomplete-options])]
    [:> AutoComplete (medley/deep-merge
                      {:style        {:width "100%"}
                       :options      options
                       :defaultValue value
                      ;;  :onSearch #(dispatch [::c/update-autocomplete-text %])
                      ;;  :onChange #(dispatch [::c/change-input-value (conj (:value-path ctx) key) %])
                       ;;:onKeyDown #(js/console.log (u/target-value %) (u/selection-start %) (u/selection-end %))
                       :onInput #(dispatch [::c/update-autocomplete-text key (u/target-value %) (u/selection-start %) (u/selection-end %)])
                       :onClick #(dispatch [::c/update-autocomplete-text key (u/target-value %) (u/selection-start %) (u/selection-end %)])
                       #_(dispatch [::c/update-autocomplete-options
                                    {:fhirpath        (:fhirpath-ctx ctx)
                                     :selection-start (u/selection-start %)
                                     :selection-end   (u/selection-end %)
                                     :text            (u/target-value %)}])}
                      opts)]))

(defn fhir-path-input [ctx kind value deletable? settings-form placeholder input-type]
  [:> Space.Compact {:block true
                     :style {:align-items :center
                             :gap         4}}
   [autocomplete ctx key value {:placeholder "path"}]
   (when settings-form
     [settings-popover ctx {:placement :right
                            :content   (r/as-element [settings-form ctx])}])
   (when deletable? [delete-button ctx])])


;;;; Settings

(defn settings-base-form [title props items]
  [:> ConfigProvider {:theme {:components {:Form {:itemMarginBottom 8}}}}
   [:> Form (medley/deep-merge
             {:labelCol   {:span 6},
              :layout     :horizontal
              :style      {:width 472} ;; default modal width - 24 * 2 paddings
              :colon      false
              :labelAlign :left}
             props)
    [h4 title]
    items
    [:div {:style {:textAlign :right}}
     [:> Space
      [button/button "Close" {:size     "small"
                              :onClick  #(toggle-popover nil nil)
                              :type     "default"
                              :htmlType "reset"}]
      [button/button "Save" {:size     "small"
                             :type     "primary"
                             :htmlType "submit"}]]]]])

(defn popover-form-list [name render-list-items]
  [:> Form.List {:name name}
   (fn [raw-fields actions]
     (let [fields (js->clj raw-fields :keywordize-keys true)
           {:keys [add remove]} (js->clj actions :keywordize-keys true)]
       (r/as-element
        [:div
         (map (fn [{:keys [key name]}]
                ^{:key key}
                [:> Space {:align "baseline"}
                 [:<>
                  (render-list-items key)
                  [:> icons/MinusCircleOutlined {:onClick #(remove name)}]]])
              fields)
         [:> Form.Item
          [button/icon "Add" icons/PlusOutlined
           {:type    "dashed"
            :block   true
            :onClick #(add)}]]])))])

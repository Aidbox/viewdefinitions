(ns vd-designer.pages.vd-form.form
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [DatePicker Flex Form Input Modal Select Space Spin
                          Typography Switch]]
            [medley.core :as medley]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.components.button :as button]
            [vd-designer.components.collapse :refer [collapse collapse-item]]
            [vd-designer.components.icon :as icon]
            [vd-designer.components.input :refer [input]]
            [vd-designer.components.tree :refer [tree tree-leaf tree-node] :as tree]
            [vd-designer.pages.vd-form.components :refer [add-element-button
                                                          add-select-button
                                                          base-input-row
                                                          base-node-row
                                                          change-input-value
                                                          delete-button
                                                          fhir-path-input
                                                          name-input
                                                          resource-input
                                                          settings-base-form
                                                          tree-tag] :as components]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.fhir-schema :refer [add-value-path
                                                           create-render-context
                                                           drop-value-path]]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.utils.string :as str.utils]))

;;;; Settings forms

(defn close-popover-in-line [ctx]
  (dispatch [::c/toggle-settings-opened-id nil])
  (components/toggle-settings-popover-hover ctx))

(defn close-popover [values ctx]
  (let [fields (medley/remove-vals nil? (js->clj values :keywordize-keys true))]
    (dispatch [::c/change-input-value-merge (:value-path ctx) fields])
    (if ctx
      (close-popover-in-line ctx)
      (dispatch [::c/toggle-settings-opened-id nil]))))

(defn root-settings-modal [opts]
  (let [vd @(subscribe [::m/current-vd])]
    [:> Modal (medley.core/deep-merge
               {:footer    nil
                :style     {:top 96 :margin-left 96}
                :on-cancel #(dispatch [::c/toggle-settings-opened-id nil])}
               opts)
     [settings-base-form "ViewDefinition"
      {:onFinish (fn [values] (close-popover values nil))
       :initialValues vd}
      #(dispatch [::c/toggle-settings-opened-id nil])
      [:<>
       [:> Form.Item {:label "Title" :name "title"} [:> Input]]
       [:> Form.Item {:label "Description" :name "description"}
        [:> Input.TextArea {:autoSize true :allowClear true}]]
       [:> Form.Item {:label "Status" :name "status" :rules [{:required true}]}
        [:> Select {:showSearch       true
                    :filterOption     true
                    :optionFilterProp "label"
                    :placeholder      "status"
                    :options          [{:label "draft"   :value "draft"}
                                       {:label "active"  :value "active"}
                                       {:label "retired" :value "retired"}
                                       {:label "unknown" :value "unknown"}]}]]
       [:> Form.Item {:label "Url" :name "url"} [:> Input]]
       [:> Form.Item {:label "Publisher" :name "publisher"} [:> Input]]
       [:> Form.Item {:label "Copyright" :name "copyright"}
        [:> Input.TextArea {:autoSize true :allowClear true}]]

       [collapse
        :expandIconPosition :end
        :items [(collapse-item
                 [:> Typography.Title {:level 5 :style {:margin 0}} "Identifier"]
                 (let [id :identifier]
                   [:<>
                    [:> Form.Item {:label "Use"      :name [id :use]}
                     [:> Select {:showSearch       true
                                 :defaultValue     nil
                                 :filterOption     true
                                 :allowClear       true
                                 :optionFilterProp "label"
                                 :options          [{:label "Usual"     :value "usual"}
                                                    {:label "Official"  :value "official"}
                                                    {:label "Temp"      :value "temp"}
                                                    {:label "Secondary" :value "secondary"}
                                                    {:label "Old"       :value "old"}]}]]
                    #_#_TODO "rework to select https://hl7.org/fhir/R5/valueset-identifier-type.html#4.4.1.657"
                    [:> Form.Item {:label "Type"     :name [id :type]}
                     [:> Input]]
                    [:> Form.Item {:label "System"   :name [id :system]}
                     [:> Input]]
                    [:> Form.Item {:label "Value"    :name [id :value]}
                     [:> Input]]
                    [:> Form.Item {:label "Period"   :name [id :period]}
                     #_#_TODO "allow to select only year or year-month"
                     [:> DatePicker.RangePicker {:style {:width "100%"}}]]
                    [:> Form.Item {:label "Assigner" :name [id :assigner]}
                     [:> Input]]]))]]

       [:> Form.Item {:label "Experimental" :name "experimental"}
        [:> Switch {:size "small"}]]

       #_"TODO: Meta object"
       #_"TODO: contact array"
       #_"TODO: useContext array"

       [:> Form.Item {:label "FHIR version"}
        [:> Form.List
         {:name "fhirVersion"}
         (fn [raw-fields actions]
           (let [fields (js->clj raw-fields :keywordize-keys true)
                 {:keys [add remove]} (js->clj actions :keywordize-keys true)]
             (r/as-element
              [:div
               (map (fn [{:keys [key name]}]
                      ^{:key key}
                      [:> Space {:align "baseline"}
                       [:> Form.Item {:name  key
                                      :key   key
                                      :rules [{:required true
                                               :message  "FHIR version is required"}]}
                        [:> Input]]
                       [:> icons/MinusCircleOutlined {:onClick #(remove name)}]])
                    fields)
               [:> Form.Item
                [button/icon "Add" icons/PlusOutlined
                 {:type    "dashed"
                  :block   true
                  :onClick #(add)}]]])))]]]]]))

(defn where-popup-form [ctx]
  (let [vd @(subscribe [::m/current-vd])]
    [settings-base-form "Where"
     {:onFinish      (fn [values] (close-popover values ctx))
      :initialValues (get-in vd (:value-path ctx))}
     #(close-popover-in-line ctx)
     [:<>
      [:> Form.Item {:label "Description" :name "description"} [:> Input]]]]))

(defn column-popup-form [ctx]
  (let [vd @(subscribe [::m/current-vd])]
    [settings-base-form "Column"
     {:onFinish            (fn [values]
                             (let [fields (medley/remove-vals nil? (js->clj values :keywordize-keys true))]
                               (dispatch [::c/change-input-value-merge (:value-path ctx) fields])
                               (close-popover-in-line ctx)))
      :initialValues       (get-in vd (:value-path ctx))}
     #(close-popover-in-line ctx)
     [:<>
      [:> Form.Item {:label "Description" :name "description"}
       [:> Input.TextArea {:autoSize true :allowClear true}]]
      [:> Form.Item {:label "Type" :name "type"} [:> Input]]
      [:> Form.Item {:label "Collection" :name "collection"} [:> Switch {:size "small"}]]
      [:> Form.Item {:label "Tags"}
       [:> Form.List {:name "tag"}
        (fn [raw-fields actions]
          (let [fields (js->clj raw-fields :keywordize-keys true)
                {:keys [add remove]} (js->clj actions :keywordize-keys true)]
            (r/as-element
             [:div
              (map (fn [{:keys [key name]}]
                     ^{:key key}
                     [:> Space {:align "baseline"}
                      [:> Form.Item {:name  [key :name]
                                     :rules [{:required true
                                              :message  "Name is required"}]}
                       [:> Input {:placeholder "Name"}]]
                      [:> Form.Item {:name  [key :value]
                                     :rules [{:required true
                                              :message  "Value is required"}]}
                       [:> Input {:placeholder "Value"}]]

                      [:> icons/MinusCircleOutlined {:onClick #(remove name)}]])
                   fields)
              [:> Form.Item
               [button/icon "Add" icons/PlusOutlined
                {:type    "dashed"
                 :block   true
                 :onClick #(add)}]]])))]]]]))

;;;; Tree

;; Leafs

(defn- general-leaf [ctx props]
  (let [{:keys [icon name-key name value-key value deletable? settings-form]} props]
    [base-input-row ctx
     [:> Flex {:gap   8
               :align :center
               :style {:width "100%"}}
      [icon]
      (if (nil? name-key)
        name
        [input {:value       name
                :placeholder "name"
                :style       {:font-style "normal"}
                :onChange    #(change-input-value ctx name-key %)}])]
     [fhir-path-input ctx value-key value deletable? settings-form]]))

(defn column-leaf [ctx {:keys [name path]}]
  [general-leaf ctx
   {:icon          icon/column
    :name-key      :name
    :name          name
    :value-key     :path
    :value         path
    :settings-form column-popup-form
    :deletable?    true}])

(defn constant-leaf [ctx {:keys [name valueString]}]
  [general-leaf ctx
   {:icon          icon/constant
    :name-key      :name
    :name          name
    :value-key     :valueString
    :value         valueString
    :deletable?    true}])

(defn where-leaf [ctx {:keys [path]}]
  [general-leaf ctx
   {:icon          icon/where
    :name          "expression"
    :value-key     :path
    :value         path
    :settings-form where-popup-form
    :deletable?    true}])

(defn foreach-expr-leaf [ctx value-key path]
  [general-leaf ctx
   {:icon          icon/expression
    :name          "expression"
    :value-key     value-key
    :value         path
    :deletable?    false}])

;; Nodes

(declare select->node)

(defn node-deletable? [kind]
  (case kind
    :select        false
    :column        true
    :unionAll      true
    :forEach       true
    :forEachOrNull true
    :constant      false
    :where         false))

(defn- general-node [kind ctx render-children]
  (let [node-key (:value-path ctx)
        tag      (tree-tag kind)]
    (js/console.debug (str "(node key)["   (name kind) "]: " node-key))
    (tree-node node-key
               (cond-> [base-node-row node-key tag]
                 (node-deletable? kind) (conj [delete-button (drop-value-path ctx)]))
               (render-children node-key))))

(defn- flat-node [kind generate-leaf ctx items]
  (general-node kind ctx
                (fn [node-key]
                  (conj (mapv (fn [item]
                                (let [ctx (add-value-path ctx (:tree/key item))]
                                  (tree-leaf (:value-path ctx) (generate-leaf ctx item))))
                              items)
                        (tree-leaf (conj node-key :add)
                                   [add-element-button (name kind) ctx])))))

(defn- nested-node [kind ctx items]
  (general-node kind ctx
                (fn [node-key]
                  (conj (mapv (fn [item]
                                (select->node (add-value-path ctx (:tree/key item)) item))
                              items)
                        (tree-leaf (conj node-key :add) [add-select-button ctx])))))

;; TODO: try to generalize as other node types
(defn node-foreach [kind ctx path {:keys [select]}]
  (general-node kind ctx
                (fn [_node-key]
                  (let [ctx (drop-value-path ctx)]
                    [(tree-leaf (conj (:value-path ctx) :path)
                                (foreach-expr-leaf ctx kind path))
                     (nested-node :select (add-value-path ctx :select) select)]))))

(defn determine-key
  "Expects an element of normalized view definition"
  [element]
  (cond
    (->> element keys (some #{:forEach}))
    :forEach

    (->> element keys (some #{:forEachOrNull}))
    :forEachOrNull

    :else
    (first (keys element))))

(defn select->node [ctx element]
  (js/console.debug (str "{select->node}(ctx): " (:value-path ctx)))
  (js/console.debug (str "{select->node}(element): " element))
  (let [key (determine-key element)]
    ((case key
       :column        (partial flat-node    :column column-leaf)
       :forEach       (partial node-foreach :forEach)
       :forEachOrNull (partial node-foreach :forEachOrNull)
       :unionAll      (partial nested-node  :unionAll)
       :select        (partial nested-node  :select))
     (add-value-path ctx key)
     (key element)
     element)))


;;;; Form

(defn form []
  (let [vd-form @(subscribe [::m/current-vd])
        ctx (create-render-context)
        expanded-keys @(subscribe [::m/current-tree-expanded-nodes])]
    (if vd-form
      [tree
       :onExpand #(dispatch [::c/update-tree-expanded-nodes
                             (->> % js->clj (map str.utils/parse-path))])
       :expandedKeys (map tree/calc-key expanded-keys)
       :treeData [(tree-leaf [:name]     (name-input ctx vd-form))
                  (tree-leaf [:resource] (resource-input ctx vd-form))

                  (flat-node   :constant constant-leaf
                               (add-value-path ctx :constant) (:constant vd-form))
                  (flat-node   :where    where-leaf
                               (add-value-path ctx :where)    (:where    vd-form))
                  (nested-node :select
                               (add-value-path ctx :select)   (:select   vd-form))]]
      [:div
       {:style {:display "flex"
                :justify-content "center"
                :flex 1
                :align-items "center"
                :padding-top "50%"}}
       [:> Spin {:size :large}]])))

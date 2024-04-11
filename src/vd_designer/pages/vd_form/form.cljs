(ns vd-designer.pages.vd-form.form
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Flex Form Input Select Space Spin Spin Switch]]
            [medley.core :as medley]
            [re-frame.core :refer [dispatch dispatch-sync subscribe]]
            [reagent.core :as r]
            [vd-designer.components.button :as button]
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

;; TODO: rework to modal
(defn view-definition-popup-form []
  (let [vd @(subscribe [::m/current-vd])]
    [settings-base-form "ViewDefinition"
     {:onFinish      (fn [values]
                       #_"TODO: check whether we still need it"
                       (let [fields (medley/remove-vals nil? (js->clj values :keywordize-keys true))]
                         (dispatch [::c/change-input-value-merge nil fields])
                         (dispatch [::c/toggle-settings-opened-id nil])))
      :initialValues vd}
     #(dispatch [::c/toggle-settings-opened-id nil])
     [:<>
      [:> Form.Item {:label "status" :name "status" :rules [{:required true}]}
       [:> Select {:showSearch       true
                   :style            {:width "100%"}
                   :filterOption     true
                   :optionFilterProp "label"
                   :placeholder "status"
                   :options [{:label "draft" :value "draft"}
                             {:label "active" :value "active"}
                             {:label "retired" :value "retired"}
                             {:label "unknown" :value "unknown"}]}]]
      [:> Form.Item {:label "title" :name "title"} [:> Input]]
      [:> Form.Item {:label "description" :name "description"} [:> Input]]
      [:> Form.Item {:label "url" :name "url"} [:> Input]]
      [:> Form.Item {:label "identifier" :name "identifier"} [:> Input]]
      [:> Form.Item {:label "experimental" :name "experimental"} [:> Switch {:size "small"}]]
      [:> Form.Item {:label "publisher" :name "publisher"} [:> Input]]
      [:> Form.Item {:label "copyright" :name "copyright"} [:> Input]]
      #_"TODO: Meta object"
      #_"TODO: contact array"
      #_"TODO: useContext array"
      #_"TODO: fhirVersion array"

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
                 :onClick #(add)}]]])))]]]]))


(defn close-popover-in-line [ctx]
  (dispatch-sync [::c/toggle-settings-opened-id nil])
  (components/toggle-settings-popover-hover ctx))

;; TODO move all props to settings-base-form once top-level vd popover will be
;; migrated to modal
(defn where-popup-form [ctx]
  (let [vd @(subscribe [::m/current-vd])]
    [settings-base-form "Where"
     {:onFinish      (fn [values]
                       (let [fields (medley/remove-vals nil? (js->clj values :keywordize-keys true))]
                         (dispatch-sync [::c/change-input-value-merge (:value-path ctx) fields])
                         (close-popover-in-line ctx)))
      :initialValues (get-in vd (:value-path ctx))}
     #(close-popover-in-line ctx)
     [:<>
      [:> Form.Item {:label "Description" :name "description"} [:> Input]]]]))

;; TODO move all props to settings-base-form once top-level vd popover will be
;; migrated to modal
(defn column-popup-form [ctx]
  (let [vd @(subscribe [::m/current-vd])]
    [settings-base-form "Column"
     {:onFinish            (fn [values]
                             (let [fields (medley/remove-vals nil? (js->clj values :keywordize-keys true))]
                               (dispatch-sync [::c/change-input-value-merge (:value-path ctx) fields])
                               (close-popover-in-line ctx)))
      :initialValues       (get-in vd (:value-path ctx))}
     #(close-popover-in-line ctx)
     [:<>
      [:> Form.Item {:label "Description" :name "description"} [:> Input.TextArea]]
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

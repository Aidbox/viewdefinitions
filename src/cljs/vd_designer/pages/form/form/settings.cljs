(ns vd-designer.pages.form.form.settings
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [DatePicker Form Input Modal Select Space Switch
                          Typography]]
            [medley.core :as medley]
            [re-frame.core :refer [dispatch dispatch-sync subscribe]]
            [reagent.core :as r]
            [vd-designer.components.button :as button]
            [vd-designer.components.collapse :refer [collapse collapse-item]]
            [vd-designer.components.select :as select]
            [vd-designer.pages.form.components :refer [settings-base-form
                                                       toggle-popover]]
            [vd-designer.pages.form.controller :as c]
            [vd-designer.pages.form.fhir-schema :refer [get-constant-type
                                                        value-type-list]]
            [vd-designer.pages.form.form.uuid-decoration :refer [uuid->idx]]
            [vd-designer.pages.form.model :as m]
            [vd-designer.utils.string :as str.utils]))

;; After removing the list element, mapping between names and keys is broken:
;;
;;  [...
;;   {:name 2, :key 2, ...}
;;   ...] ->
;;  [...
;;   {:name 1, :key 2, ...}
;;   ...]
;;
;; In practice, setting key to be equal to name allows to maintain the correct order of list elements.
;; If for some reason you need the key that the list item originally had, :fieldKey is still available.
(defn- set-keys-to-names [fields]
  (mapv (fn [m]
          (assoc m :key (:name m)))
        fields))

(defn- popover-collapse-item [title content]
  [collapse {:expandIconPosition :end
             :items [(collapse-item
                      [:> Typography.Title {:level 4
                                            :style {:margin 0}} title]
                      content)]}])

(defn popover-form-list [name render-list-items]
  [:> Form.List {:name name}
   (fn [raw-fields actions]
     (let [fields (-> raw-fields
                      (js->clj :keywordize-keys true)
                      set-keys-to-names)
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

(defn- save-popover [values value-path & extra-actions]
  (let [fields (medley/remove-vals nil? (js->clj values :keywordize-keys true))]
    (dispatch-sync [::c/change-input-value-merge value-path fields])
    (mapv #(% value-path) extra-actions)
    (toggle-popover nil)))

(defn root-settings [opts]
  (let [vd @(subscribe [::m/current-vd])]
    [:> Modal (medley.core/deep-merge
               {:footer    nil
                :style     {:top 96 :margin-left 96}
                :on-cancel #(toggle-popover nil)}
               opts)
     [settings-base-form "ViewDefinition"
      {:onFinish      #(save-popover % nil)
       :initialValues vd}
      [:<>
       [:> Form.Item {:label "Status" :name "status" :rules [{:required true}]}
        [:> Select (select/with-default-props
                     {:placeholder "status"
                      :allowClear  false
                      :variant     :outlined
                      :options     (select/options-from-vec
                                    ["draft" "active" "retired" "unknown"])})]]
       [:> Form.Item {:label "Title" :name "title"} [:> Input]]
       [:> Form.Item {:label "Description" :name "description"}
        [:> Input.TextArea {:autoSize true :allowClear true}]]
       [:> Form.Item {:label "Url" :name "url"} [:> Input]]
       [:> Form.Item {:label "Publisher" :name "publisher"} [:> Input]]
       [:> Form.Item {:label "Copyright" :name "copyright"}
        [:> Input.TextArea {:autoSize true :allowClear true}]]

       [popover-collapse-item "Identifier"
        (let [id :identifier]
          [:<>
           [:> Form.Item {:label "Use"      :name [id :use]}
            [:> Select (select/with-default-props
                         {:variant :outlined
                          :options [{:label "Usual"     :value "usual"}
                                    {:label "Official"  :value "official"}
                                    {:label "Temp"      :value "temp"}
                                    {:label "Secondary" :value "secondary"}
                                    {:label "Old"       :value "old"}]})]]
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
            [:> Input]]])]

       [:> Form.Item {:label "Experimental" :name "experimental"}
        [:> Switch {:size "small"}]]

       #_"TODO: Meta object"
       #_"TODO: contact array"
       #_"TODO: useContext array"

       [:> Form.Item {:label "FHIR version"}
        [popover-form-list "fhirVersion"
         (fn [element-key]
           [:<>
            [:> Form.Item {:name  element-key
                           :key   element-key
                           :rules [{:required true
                                    :message  "FHIR version is required"}]}
             [:> Input]]])]]]]]))

(defn- vd-subset [vd value-path]
  (get-in vd (uuid->idx value-path vd)))

(defn where-settings [value-path]
  (let [vd @(subscribe [::m/current-vd])]
    [settings-base-form "Where"
     {:onFinish     #(save-popover % value-path)
      :initialValues (vd-subset vd value-path)}
     [:<>
      [:> Form.Item {:label "Description" :name "description"} [:> Input]]]]))

(defn column-settings [value-path]
  (let [vd @(subscribe [::m/current-vd])]
    [settings-base-form "Column"
     {:onFinish     #(save-popover % value-path)
      :initialValues (vd-subset vd value-path)}
     [:<>
      [:> Form.Item {:label "Description" :name "description"}
       [:> Input.TextArea {:autoSize true :allowClear true}]]
      [:> Form.Item {:label "Type" :name "type"} [:> Input]]
      [:> Form.Item {:label "Collection" :name "collection"} [:> Switch {:size "small"}]]
      [:> Form.Item {:label "Tags"}
       [popover-form-list "tag"
        (fn [element-key]
          [:<>
           [:> Form.Item {:name  [element-key :name]
                          :rules [{:required true
                                   :message  "Name is required"}]}
            [:> Input {:placeholder "Name"}]]
           [:> Form.Item {:name  [element-key :value]
                          :rules [{:required true
                                   :message  "Value is required"}]}
            [:> Input {:placeholder "Value"}]]])]]]]))

(defn constant-settings [value-path]
  (let [vd          @(subscribe [::m/current-vd])
        constant-map (vd-subset vd value-path)]
    [settings-base-form "Constant"
     {:onFinish      #(save-popover % value-path
                                    (fn [path] (dispatch [::c/normalize-constant-value path])))
      :initialValues {:type (get-constant-type constant-map)}}
     [:<>
      [:> Form.Item {:label "Value type" :name "type"}
       [:> Select (select/with-default-props
                    {:variant    :outlined
                     :allowClear false
                     :options    (mapv #(hash-map :label %
                                                  :value (str "value" (str.utils/capitalize %)))
                                       value-type-list)})]]]]))

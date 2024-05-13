(ns vd-designer.pages.vd-form.form.settings
  (:require [antd :refer [DatePicker Form Input Modal Select Switch Typography]]
            [clojure.string :as str]
            [medley.core :as medley]
            [re-frame.core :refer [dispatch dispatch-sync subscribe]]
            [vd-designer.components.collapse :refer [collapse collapse-item]]
            [vd-designer.components.select :as select]
            [vd-designer.pages.vd-form.components :refer [popover-form-list
                                                          settings-base-form
                                                          toggle-popover]]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.fhir-schema :refer [get-constant-type
                                                           value-type-list]]
            [vd-designer.pages.vd-form.form.uuid-decoration :refer [uuid->idx]]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.utils.string :as str.utils]))

(defn- save-popover [values ctx & extra-actions]
  (let [fields (medley/remove-vals nil? (js->clj values :keywordize-keys true))
        path   (:value-path ctx)]
    (dispatch-sync [::c/change-input-value-merge path fields])
    (mapv #(% path) extra-actions)
    (toggle-popover ctx nil)))

(defn root-settings [opts]
  (let [vd @(subscribe [::m/current-vd])]
    [:> Modal (medley.core/deep-merge
               {:footer    nil
                :style     {:top 96 :margin-left 96}
                :on-cancel #(toggle-popover nil nil)}
               opts)
     [settings-base-form "ViewDefinition"
      {:onFinish      #(save-popover % nil)
       :initialValues vd}
      [:<>
       [:> Form.Item {:label "Title" :name "title"} [:> Input]]
       [:> Form.Item {:label "Description" :name "description"}
        [:> Input.TextArea {:autoSize true :allowClear true}]]
       [:> Form.Item {:label "Status" :name "status" :rules [{:required true}]}
        [:> Select (select/with-default-props
                     {:placeholder "status"
                      :allowClear  false
                      :variant     :outlined
                      :options     (select/options-from-vec
                                    ["draft" "active" "retired" "unknown"])})]]
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
                     [:> Input]]]))]]

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

(defn where-settings [ctx]
  (let [vd @(subscribe [::m/current-vd])]
    [settings-base-form "Where"
     {:onFinish      #(save-popover % ctx)
      :initialValues (get-in vd (:value-path ctx))}
     [:<>
      [:> Form.Item {:label "Description" :name "description"} [:> Input]]]]))

(defn column-settings [ctx]
  (let [vd @(subscribe [::m/current-vd])]
    [settings-base-form "Column"
     {:onFinish      #(save-popover % ctx)
      :initialValues (get-in vd (:value-path ctx))}
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

(defn constant-settings [ctx]
  (let [vd          @(subscribe [::m/current-vd])
        real-path    (uuid->idx (:value-path ctx) vd)
        constant-map (get-in vd real-path)]
    [settings-base-form "Constant"
     {:onFinish      #(save-popover % ctx
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

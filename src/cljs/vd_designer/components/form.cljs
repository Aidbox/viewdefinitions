(ns vd-designer.components.form
  (:require
    [vd-designer.components.button :as button]
    [medley.core :as medley]
    [reagent.core :as r]
    ["@ant-design/icons" :as icons]
    [antd :refer [ConfigProvider Form Row Col
                  Space Typography]]))


(defn settings-base-form [title props on-close items]
  [:> ConfigProvider {:theme {:components {:Form {:itemMarginBottom 8}}}}
   [:> Form (medley/deep-merge
             {:labelCol   {:span 6},
              :layout     :horizontal
              :style      {:width 472} ;; default modal width - 24 * 2 paddings
              :colon      false
              :labelAlign :left}
             props)
    [:> Typography.Title {:level 4 :style {:margin-top 0}} title]
    items
    [:div {:style {:textAlign :right}}
     [:> Space
      [button/button "Close" {:size     "small"
                              :onClick   on-close
                              :type     "default"
                              :htmlType "reset"}]
      [button/button "Save" {:size     "small"
                             :type     "primary"
                             :htmlType "submit"}]]]]])


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

(defn form-list [name render-list-items]
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
                [:> Row {:align "middle"
                         :gutter "5"}
                 [:> Col {:span 23}
                  [render-list-items key]]
                 [:> Col {:span 1
                          :style {:padding-bottom 8}}
                  [:> icons/MinusCircleOutlined {:onClick #(remove name)}]]])
              fields)
         [:> Form.Item
          [button/icon "Add" icons/PlusOutlined
           {:type    "dashed"
            :block   true
            :onClick #(add)}]]])))])



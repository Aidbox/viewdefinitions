(ns vd-designer.pages.vd-form.sql
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Popover]]
            [sql-formatter :as sqlf]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.components.button :as button]
            [vd-designer.components.monaco-editor :refer [monaco]]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.utils.browser :as utils.browser]))

(defn label-copied []
  (r/as-element
   [:div {:style {:text-align "center"}}
    "SQL copied!"]))

(defn sql []
  (let [sql @(subscribe [::m/sql])
        formatted-sql (sqlf/format sql (clj->js {:language "postgresql"}))]
    [:div
     {:style {:height "600px" :width "100%"}}
     [monaco {:id       "vd-yaml"
              :language "sql"
              :value    formatted-sql
              :schemas  []}]
     [:div {:style {:position       :absolute
                    :top            "16px"
                    :right          "16px"
                    :display        :flex
                    :flex-direction :column
                    :align-items    :end
                    :gap            "8px"}}
      [:> Popover
       {:title (label-copied)
        :placement :top
        :content nil
        :trigger :click}
       (button/button nil
                      {:icon     (r/create-element icons/CopyOutlined)
                       :on-click #(utils.browser/copy-text-to-clipboard formatted-sql)})]]]))
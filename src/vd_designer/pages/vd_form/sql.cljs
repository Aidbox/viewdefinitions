(ns vd-designer.pages.vd-form.sql
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Popover]]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [sql-formatter :as sqlf]
            [vd-designer.components.button :as button]
            [vd-designer.components.monaco-editor :refer [monaco]]
            [vd-designer.pages.vd-form.model :as m]))

(defn sql []
  (let [sql @(subscribe [::m/sql])
        formatted-sql (sqlf/format sql (clj->js {:language "postgresql"}))]
    [:div
     {:style {:height "600px" :width "100%"}}
     [monaco {:id       "vd-sql"
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
      [button/copy formatted-sql]]]))

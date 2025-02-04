(ns vd-designer.pages.form.sql
  (:require [antd :refer [Flex]]
            [re-frame.core :refer [subscribe]]
            [sql-formatter :as sqlf]
            [vd-designer.components.button :as button]
            [vd-designer.components.monaco-editor :refer [monaco]]
            [vd-designer.pages.form.model :as m]))

(defn sql []
  (let [sql @(subscribe [::m/sql])
        formatted-sql (sqlf/format sql (clj->js {:language "postgresql"}))]
    [:div {:style {:height        "100%"
                   :padding-right "8px"}}
     [monaco {:id       "vd-sql"
              :language "sql"
              :value    formatted-sql
              :schemas  []
              :options {:readOnly true}}]
     [:> Flex {:style    {:position :absolute
                          :top      "6px"
                          :right    "26px"}
               :vertical true
               :align    :end
               :gap      8}
      [button/copy formatted-sql]]]))

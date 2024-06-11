(ns vd-designer.pages.form.form
  (:require
   [antd :refer [Flex Spin]]
   [clojure.string :as str]
   [re-frame.core :refer [dispatch subscribe]]
   [vd-designer.components.tree :refer [tree] :as tree]
   [vd-designer.pages.form.controller :as c]
   [vd-designer.pages.form.fhir-schema :refer [create-render-context]]
   [vd-designer.pages.form.form.tree :refer [draggable? drop-allowed? vd-tree]]
   [vd-designer.pages.form.model :as m]
   [vd-designer.utils.string :as str.utils]))

(defn form []
  (let [vd @(subscribe [::m/current-vd])
        ctx (create-render-context)
        expanded-keys @(subscribe [::m/current-tree-expanded-nodes])]
    (if vd
      [tree {:style         {:padding-right "16px"}
             :on-expand     #(dispatch [::c/update-tree-expanded-nodes
                                        (->> % js->clj (map str.utils/parse-path))])
             :expanded-keys (map tree/calc-key expanded-keys)
             :tree-data     (vd-tree ctx vd)
             :draggable     (fn [node]
                                (-> (.-key node)
                                    js->clj
                                    str.utils/parse-path
                                    draggable?))
             :allow-drop    #(let [{:keys [dragNode dropNode dropPosition]}
                                   (js->clj % :keywordize-keys true)]
                               ;; this can be speed up
                               (drop-allowed?
                                 vd
                                 (-> dragNode :key str.utils/parse-path)
                                 (-> dropNode :key str.utils/parse-path)
                                 dropPosition))

             :on-drop       #(let [{:keys [node dragNode dropPosition]}
                                   (js->clj % :keywordize-keys true)
                                   ;; https://github.com/ant-design/ant-design/blob/8f1808dae7d0415eb4299c31c882a49f17e62409/components/tree/demo/draggable.tsx#L48
                                   ;; the drop position relative to the drop node, inside 0, top -1, bottom 1
                                   dropPos (str/split (str (:pos node)) "-")
                                   dropPosition (- dropPosition (nth dropPos (dec (count dropPos))))]

                               (dispatch [::c/change-tree-elements-order
                                          (-> dragNode :key str.utils/parse-path)
                                          (-> node :key str.utils/parse-path)
                                          dropPosition]))}]
      [:> Flex {:style   {:padding-top "50%"}
                :justify :center
                :align   :center
                :flex    1}
       [:> Spin {:size :large}]])))

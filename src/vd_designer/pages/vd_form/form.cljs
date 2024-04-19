(ns vd-designer.pages.vd-form.form
  (:require [antd :refer [Flex Spin]]
            [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.components.tree :refer [tree] :as tree]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.fhir-schema :refer [create-render-context]]
            [vd-designer.pages.vd-form.form.tree :refer [vd-tree]]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.utils.string :as str.utils]))

(defn draggable? [node]
  (let [node-key (-> (.-key node) js->clj str.utils/parse-path)]
    (cond
      (some (set [node-key])  m/tree-root-keys) false
      ;; we do not allow to move buttons
      (some (set [:add])      node-key) false
      ;; there is no too much sense to move constants and where clojures, but
      ;; it'll add a css complexity to handle overlapping
      (some (set [:constant]) node-key) false
      (some (set [:where])    node-key) false
      ;; this is foreach nodes
      (some (set [:path])     node-key) false
      (= :select (peek node-key)) false
      :else true)))

(defn drop-allowed? [info]
  (let [{:keys [dragNode dropNode]} (js->clj info :keywordize-keys true)

        get-key #(-> % :key str.utils/parse-path)
        node?   #(-> % peek keyword?)

        drag-key         (get-key dragNode)
        node-dragged?    (node? drag-key)
        drop-key         (get-key dropNode)
        dropped-in-node? (node? drop-key)]
    (if node-dragged?
      ;; it's node and can be moved into root select, foreach' select and union
      (not-any? (-> drop-key peek vector set)
                [:column :forEach :forEachOrNull :add])
      ;; it's column, and can be moved only into column nodes
      (if dropped-in-node?
        (= :column (-> drop-key peek))
        (= :column (-> drop-key pop peek))))))

(defn form []
  (let [vd @(subscribe [::m/current-vd])
        ctx (create-render-context)
        expanded-keys @(subscribe [::m/current-tree-expanded-nodes])]
    (if vd
      [tree {:on-expand     #(dispatch [::c/update-tree-expanded-nodes
                                        (->> % js->clj (map str.utils/parse-path))])
             :expanded-keys (map tree/calc-key expanded-keys)
             :tree-data     (vd-tree ctx vd)
             :draggable     draggable?
             :allow-drop    drop-allowed?
             :on-drop       #(dispatch [::c/change-tree-elements-order
                                        (js->clj % :keywordize-keys true)])}]
      [:> Flex {:style   {:padding-top "50%"}
                :justify :center
                :align   :center
                :flex    1}
       [:> Spin {:size :large}]])))

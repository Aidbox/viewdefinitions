(ns vd-designer.pages.form.form.nodes.nodes
  (:require
    [vd-designer.components.tree :as tree-component]
    [vd-designer.pages.form.components :as form-components]
    [vd-designer.pages.form.fhir-schema :as fhir-schema]))


(defn determine-key
  "Expects an element of normalized view definition"
  [element]
  (cond
    (or (->> element keys (some #{:forEach}))
        (->> element keys (some #{:forEachOrNull})))
    :forEach

    :else
    (first (keys element))))

(defmulti render-node (fn [_ node] (determine-key node)))

(defmethod render-node :default [_ _] [])

(defn render-inner-nodes [ctx nodes]
  (mapv
   (fn [node]
     (render-node (fhir-schema/add-value-path ctx (:tree/key node)) node))
   nodes))

(defn render-add-select-button [{:keys [value-path]}]
  (tree-component/tree-leaf (conj value-path :add)
                            [form-components/add-select-button value-path]))

(ns vd-designer.components.list
  (:require [antd :refer [List]]
            [reagent.core :as r]
            [vd-designer.utils.react :refer [js-obj->clj-map]]))

;; TODO: load more action
(defn data-list
  "List with data.
    For more details see: https://ant.design/components/table#api"
  [& {:as opts}]
  [:> List (merge-with
            into
            {:itemLayout "horizontal"
             #_#_:loadMore   (when (and (not (nil? load-more)) (not loading?))
                               (r/as-element
                                [:div {:style {:textAlign  "center"
                                               :marginTop  12
                                               :height     32
                                               :lineHeight "32px"}}
                                 [:> Button {:onClick (fn []
                                                        (load-more)
                                                        #_(.dispatchEvent js/window (js/Event. "resize")))}
                                  "loading more"]]))}
            opts)])

(defn vd-data-list
  "List with data for view definitions"
  [on-click actions & {:as opts}]
  [data-list
   :renderItem (fn [raw-item]
                 (r/as-element
                  (let [resource (:resource (js-obj->clj-map raw-item))
                        key      (:id resource)]
                    [:> List.Item
                     {:actions (map #(r/as-element (% key)) actions)}
                     [:> List.Item.Meta
                      {:title       (r/as-element [:a {:onClick #(on-click key)} (:name resource)])
                       :description (:description resource)}]
                     [:div (:resource resource)]])))
   opts])

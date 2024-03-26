(ns vd-designer.components.list
  (:require [antd :refer [Button List]]
            [reagent.core :as r]
            [vd-designer.utils.react :refer [js-obj->clj-map]]))

;; TODO: load more action
(defn data-list
  "List with data.
       Example of props:
         { :loading ..,
           :data ..,
           :item {:actions ..
                  :get-data-key ..
                  :get-title ..
                  :get-description ..
                  :get-label ..
                  :on-click ..}
           :load-more ..}
       For more details see: https://ant.design/components/table#api
       "
  [props]
  (let [loading? (:loading props)
        load-more (:load-more props)]
    [:> List {:loading    loading?
              :itemLayout "horizontal"
              :loadMore   (when (and (not (nil? load-more)) (not loading?))
                            (r/as-element
                             [:div {:style {:textAlign  "center"
                                            :marginTop  12
                                            :height     32
                                            :lineHeight "32px"}}
                              [:> Button {:onClick (fn []
                                                     (load-more)
                                                     #_(.dispatchEvent js/window (js/Event. "resize")))}
                               "loading more"]]))
              :dataSource (:data props)
              :renderItem (fn [raw-item]
                            (r/as-element
                             (let [item (js-obj->clj-map raw-item)
                                   item-props (:item props)
                                   key ((:get-data-key item-props) item)]
                               [:> List.Item
                                {:actions (map #(r/as-element (% key)) (:actions item-props))}
                                [:> List.Item.Meta
                                 {:title       (r/as-element [:a {:onClick #((:on-click item-props) key)}
                                                              ((:get-title item-props) item)])
                                  :description ((:get-description item-props) item)}]
                                [:div ((:get-label item-props) item)]])))}]))

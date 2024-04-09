(ns vd-designer.components.heading
  (:require [medley.core :as medley]))

(defn h1 [content & {:as opts}]
  [:h1 (-> {:style {:font-size   "24px"
                    :font-weight 500}}
           (medley/deep-merge opts))
   content])

(ns vd-designer.components.heading
  (:require [medley.core :as medley]
            [antd :refer [Typography]]))

(defn h1 [content & {:as opts}]
  [:> Typography.Title (medley/deep-merge
                        {:level 1
                         :style {:margin 0}}
                        opts)
   content])

(defn h2 [content & {:as opts}]
  [:> Typography.Title (medley/deep-merge
                        {:level 4
                         :style {:margin 0}}
                        opts)
   content])

(defn h3 [content & {:as opts}]
  [:> Typography.Title (medley/deep-merge
                        {:level 4
                         :style {:margin 0}}
                        opts)
   content])

(defn h4 [content & {:as opts}]
  [:> Typography.Title (medley/deep-merge
                        {:level 4
                         :style {:margin-top 0}}
                        opts)
   content])

(defn h5 [content & {:as opts}]
  [:> Typography.Title (medley/deep-merge
                        {:level 5
                         :style {:margin 0}}
                        opts)
   content])

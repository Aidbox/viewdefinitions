(ns viewdef-designer.pages.main
  (:require [re-frame.core :as re-frame]
            [viewdef-designer.components.layout.view :refer [layout]]
            [viewdef-designer.routes :as routes]))

(defmethod routes/pages :main-page [] [layout])

(defn main-page []
  (let [active-page (re-frame/subscribe [:routes/active-page])]
    [routes/pages @active-page]))

(ns vd-designer.utils.react
  (:require
   [reagent.core :as r]))

(defn create-react-image [path]
  (r/create-element "img" #js{:src path}))

(defn js-obj->clj-map [js-obj]
  (-> js-obj
      (js->clj {:keywordize-keys true})))

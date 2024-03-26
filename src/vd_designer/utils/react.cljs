(ns vd-designer.utils.react
  (:require [reagent.core :as r]))

(defn create-react-image [path]
  (r/create-element "img" #js{:src path}))

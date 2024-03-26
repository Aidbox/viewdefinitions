(ns vd-designer.utils.react
  (:require [clojure.walk :as walk]
            [reagent.core :as r]))

(defn create-react-image [path]
  (r/create-element "img" #js{:src path}))

(defn js-obj->clj-map [js-obj]
  (-> js-obj
      js/JSON.stringify
      js/JSON.parse
      js->clj
      walk/keywordize-keys))

(ns vd-designer.utils.http
  (:require [clojure.string :as str]
            [clojure.walk :as walk]))

(defn get-header
  "Gets header by it's name from request or response."
  [req|resp header-name]
  (let [headers (-> req|resp :headers walk/keywordize-keys)]
    (or (get headers (-> header-name name str/lower-case keyword))
        (get headers (-> header-name name str/capitalize keyword)))))

(defn apply-middleware
  "Helper to apply a middleware to some handler and ctx"
  [middleware handler ctx]
  (-> (middleware)
      :wrap
      (#(% handler))
      (#(% ctx))))

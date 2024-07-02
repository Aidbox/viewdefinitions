(ns vd-designer.utils.tag-manager
  (:require ["@sooro-io/react-gtm-module" :as TagManager]))

;; TODO: move somewhere else
(def debug?
  ^boolean goog.DEBUG)

(def tag-manager-args
  (clj->js {:gtmId "GTM-PMS5LG2"}))

(defn init []
  (when-not debug?
    (TagManager/initialize tag-manager-args)))

(defn data-layer [opts]
  (when-not debug?
    (TagManager/dataLayer
      (clj->js opts))))

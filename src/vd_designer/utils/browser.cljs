(ns vd-designer.utils.browser)

(defn copy-text-to-clipboard [text]
  (.. js/navigator
      -clipboard
      (writeText text)))

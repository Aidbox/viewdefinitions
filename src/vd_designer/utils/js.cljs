(ns vd-designer.utils.js)

(defn get-element-by-id
  "Finds DOM element by it's id"
  [id]
  (-> js/document (.getElementById id)))

(defn toggle-class
  "Toggles element' class"
  [element class-name]
  (-> element (.-classList) (.toggle class-name)))

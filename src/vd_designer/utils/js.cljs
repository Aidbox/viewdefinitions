(ns vd-designer.utils.js)

(defn get-element-by-id
  "Gets DOM element by it's id"
  [id]
  (-> js/document (.getElementById id)))

(defn find-elements
  "Finds DOM element by provided selector"
  [selector]
  (-> js/document (.querySelectorAll selector)))

(defn remove-class
  "Remove element' class"
  [element class-name]
  (-> element (.-classList) (.remove class-name)))

(defn toggle-class
  "Toggles element' class"
  [element class-name]
  (-> element (.-classList) (.toggle class-name)))

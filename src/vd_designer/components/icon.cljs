(ns vd-designer.components.icon)

(defn- icon [path]
  [:img {:src   path
         :style {:width  "18px"
                 :height "18px"}}])

(defn column []
  (icon "/img/form/column.svg"))

(defn foreach []
  (icon "/img/form/forEach.svg"))

(defn union-all []
  (icon "/img/form/unionAll.svg"))

(defn expression []
  (icon "/img/form/expr.svg"))

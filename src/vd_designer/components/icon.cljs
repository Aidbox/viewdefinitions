(ns vd-designer.components.icon)

(defn- icon [path overrides]
  [:img (merge-with into {:src   path
                          :style {:width  "18px"
                                  :height "18px"}}
                    overrides)])

(defn column [& {:as args}]
  (icon "/img/form/column.svg" args))

(defn foreach [& {:as args}]
  (icon "/img/form/forEach.svg" args))

(defn union-all [& {:as args}]
  (icon "/img/form/unionAll.svg" args))

(defn expression [& {:as args}]
  (icon "/img/form/expr.svg" args))

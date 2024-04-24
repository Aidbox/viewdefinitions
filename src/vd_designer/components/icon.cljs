(ns vd-designer.components.icon)

(defn- icon [path overrides]
  [:img (merge-with into {:src   path
                          :style {:width  "18px"
                                  :height "18px"}}
                    overrides)])

(defn column [& {:as args}]
  (icon "/img/form/column.svg" args))

(defn expression [& {:as args}]
  (icon "/img/form/expr.svg" args))

(defn constant [& {:as args}]
  (icon "/img/form/constant.svg" args))

(defn where [& {:as args}]
  (icon "/img/form/where.svg" args))

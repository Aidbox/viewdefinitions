(ns vd-designer.components.button)

(defn add [content & {:as opts}]
  [:button (merge-with into
                       {:style {:height           "32px"
                                :padding          "4px 15px"
                                :background-color "#1890FF"
                                :color            "white"
                                :border           :none
                                :border-radius    "2px"}}
                       opts)
   content])
(ns vd-designer.components.tag)

(defn tag [text & {:as opts}]
  [:label
   (merge-with into
               {:style {:display        "inline-flex"
                        :padding        "3px 7px"
                        :text-transform "uppercase"
                        :height         "18px"
                        :border-radius  "4px"
                        :align-items    "center"
                        :font-size      "10px"
                        :font-family    "var(--ant-font-family)"
                        :font-weight    400}}
               opts)
   text])

(defn foreach []
  (tag "foreach"
       :style {:color      "#B37804"
               :background "#F8CE3B1A"}))

(defn foreach-or-null []
  (tag "foreach or null"
       :style {:color      "#B37804"
               :background "#F8CE3B1A"}))

(defn select []
  (tag "select"
       :style {:color      "#7972D3"
               :background "#7972D31A"}))

(defn column []
  (tag "column"
       :style {:color      "#009906"
               :background "#E5FAE8"}))

(defn union-all []
  (tag "unionall"
       "#BA004E"
       "#FE60901A"))

(defn default [text]
  (tag text
       :style {:color      "#7972D3"
               :background "#7972D31A"}))

(defn constant []
  (default "constant"))

(defn where []
  (default "where"))

(defn resource []
  (default "resource"))

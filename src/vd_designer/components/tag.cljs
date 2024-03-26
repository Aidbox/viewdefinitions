(ns vd-designer.components.tag
  (:require [antd :refer [Tag]]))

(defn tag [text text-color bg-color]
  [:label
   {:style {:background     bg-color
            :display        "inline-flex"
            :padding        "3px 7px"
            :text-transform "uppercase"
            :height         "18px"
            :border-radius  "4px"
            :align-items    "center"
            :color          text-color
            :font-size      "10px"
            :font-family    "var(--ant-font-family)"
            :font-weight    400}}
   text])

(defn foreach []
  (tag "foreach"
       "#B37804"
       "#F8CE3B1A"))

(defn select []
  (tag "select"
       "#7972D3"
       "#7972D31A"))

(defn column []
  (tag "column"
       "#009906"
       "#E5FAE8"))

(defn union-all []
  (tag "unionall"
       "#BA004E"
       "#FE60901A"))

(defn default [text]
  (tag text
       "#7972D3"
       "#7972D31A"))

(defn constant []
  (default "constant"))

(defn where []
  (default "where"))

(defn resource []
  (default "resource"))

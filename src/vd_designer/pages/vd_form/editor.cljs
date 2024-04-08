(ns vd-designer.pages.vd-form.editor
  (:require [re-frame.core :refer [subscribe]]
            [vd-designer.components.monaco-editor :refer [monaco]]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.utils.yaml :as yaml]
            [vd-designer.pages.vd-form.uuid-decoration :refer [remove-decoration]]))

(defn editor []
  (let [current-vd (remove-decoration @(subscribe [::m/current-vd]))]
    [:div
     {:style {:height "600px" :width "100%"}}
     [monaco {:id      "vd-yaml"
              :value   (yaml/edn->yaml current-vd)
              :schemas []
              #_#_:onChange (fn [value & _] (dispatch [::c/set-schema value]))
              #_#_:onValidate (fn [markers] (dispatch [::c/set-monaco-markers (js->clj markers)]))}]]))

(ns vd-designer.components.modal
  (:require [antd :refer [Modal]]))

(defn modal-confirm [opts]
  (Modal.confirm
   (clj->js opts)))

(ns vd-designer.components.modal
  (:require [antd :refer [Modal]]))

(defn modal-confirm [opts]
  ;; TODO: fix Warning: [antd: Modal] Static function
  ; can not consume context like dynamic theme. Please use 'App' component instead.
  ; https://codesandbox.io/p/sandbox/text-and-link-component-antd-5-0-2-forked-9svf8v?file=%2Fdemo.tsx%3A24%2C5
  ; https://github.com/reagent-project/reagent/blob/master/doc/ReactFeatures.md#function-components
  ;; (let [{modal :modal} (.useApp App)]
  ;;   (.confirm modal (clj->js opts)))

  (Modal.confirm
    (clj->js opts)))

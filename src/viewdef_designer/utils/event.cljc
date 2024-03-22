(ns viewdef-designer.utils.event)

(defn target-value
  [event]
  #?(:cljs (.. event -target -value)
     :clj  (-> @event :target :value)))

(ns vd-designer.utils.event)

(defn target-value [event]
  #?(:cljs (.. event -target -value)
     :clj  (-> @event :target :value)))

(defn response->error [resp-body]
  (or (-> resp-body :response :error)
      (-> resp-body :response :text :div)
      (:status-text resp-body)))

(defn selection-start [event]
  #?(:cljs (.. event -target -selectionStart)
     :clj  (-> @event :target :selectionStart)))

(defn selection-end [event]
  #?(:cljs (.. event -target -selectionEnd)
     :clj  (-> @event :target :selectionEnd)))

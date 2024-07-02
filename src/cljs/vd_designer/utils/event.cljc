(ns vd-designer.utils.event)

(defn target-value [event]
  #?(:cljs (.. event -target -value)
     :clj  (-> @event :target :value)))

(defn response->error [response]
  (or (-> response :response :error)
      (-> response :response :text :div)
      (:status-text response)))

(defn selection-start [event]
  #?(:cljs (.. event -target -selectionStart)
     :clj  (-> @event :target :selectionStart)))

(defn selection-end [event]
  #?(:cljs (.. event -target -selectionEnd)
     :clj  (-> @event :target :selectionEnd)))

(defn pressed-key [event]
  #?(:cljs (.. event -key)
     :clj  (-> @event :key)))

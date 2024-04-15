(ns vd-designer.utils.event)

(defn target-value
  [event]
  #?(:cljs (.. event -target -value)
     :clj  (-> @event :target :value)))

(defn response->error [resp-body]
  (or (-> resp-body :response :error)
      (-> resp-body :response :text :div)
      (:status-text resp-body)))

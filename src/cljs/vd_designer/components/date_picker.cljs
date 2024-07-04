(ns vd-designer.components.date-picker)

(def date-range-form-item-props
  {:getValueProps (fn [period]
                    (let [{:keys [start end]} (js->clj period :keywordize-keys true)]
                      [start end]))
   :normalize     (fn [[start end] _prev-value _prev-values]
                    {:start start
                     :end   end})})

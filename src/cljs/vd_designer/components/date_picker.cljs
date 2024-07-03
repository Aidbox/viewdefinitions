(ns vd-designer.components.date-picker)

(def date-range-form-item-props
  {:getValueProps (fn [{:keys [start end]}]
                    [start end])
   :normalize     (fn [[start end] _prev-value _prev-values]
                    {:start start
                     :end   end})})

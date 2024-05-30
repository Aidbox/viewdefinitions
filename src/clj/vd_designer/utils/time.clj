(ns vd-designer.utils.time)

(defn current-ts
  "Returns the current timestamp in seconds."
  []
  (-> (System/currentTimeMillis)
      (/ 1000.0)
      int))

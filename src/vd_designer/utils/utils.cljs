(ns vd-designer.utils.utils)

(defn deep-merge
  "Efficient deep merge."
  [a b]
  (loop [[[k v :as i] & ks] b
         acc a]
    (if (nil? i)
      acc
      (let [av (get a k)]
        (if (= v av)
          (recur ks acc)
          (recur ks
                 (cond
                   (and (map? v) (map? av)) (assoc acc k (deep-merge av v))
                   (and (nil? v) (map? av)) (assoc acc k av)
                   :else (assoc acc k v))))))))

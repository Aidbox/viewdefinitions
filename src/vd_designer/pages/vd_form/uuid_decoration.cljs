(ns vd-designer.pages.vd-form.uuid-decoration
  (:require [clojure.walk :refer [postwalk]]))

(defn- decorate-form [form]
  (cond-> form
          (map? form)
          (assoc :tree/key (str (random-uuid)))))

(defn- remove-form-decoration [form]
  (cond-> form
          (map? form)
          (dissoc :tree/key)))

(defn decorate [vd]
  (postwalk decorate-form vd))

(defn remove-decoration [vd]
  (postwalk remove-form-decoration vd))

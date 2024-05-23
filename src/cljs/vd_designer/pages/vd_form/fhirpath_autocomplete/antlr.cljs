(ns vd-designer.pages.vd-form.fhirpath-autocomplete.antlr
  (:require ["fhirpath-autocomplete-ts" :as autocomplete]
            [vd-designer.interop :as interop]))

(defn get-kind [kind]
  (get {7 :class,
        20 :enumMember,
        1 :text,
        24 :operator,
        4 :constructor,
        15 :snippet,
        21 :constant,
        13 :enum,
        22 :struct,
        6 :variable,
        25 :typeParameter,
        17 :file,
        3 :function,
        12 :value,
        2 :method,
        23 :event,
        19 :folder,
        11 :unit,
        9 :module,
        5 :field,
        14 :keyword,
        16 :color,
        10 :property,
        18 :reference,
        8 :interface}
       kind))

(defn complete [params]
  (->> (autocomplete/suggest (clj->js params))
       (.-items)
       (mapv #(-> %
                  (interop/obj->clj)
                  (update :kind get-kind)))))

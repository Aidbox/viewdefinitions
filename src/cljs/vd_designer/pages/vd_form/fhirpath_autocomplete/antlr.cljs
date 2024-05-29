(ns vd-designer.pages.vd-form.fhirpath-autocomplete.antlr
  (:require ["fhirpath-autocomplete-ts" :as autocomplete]
            [vd-designer.interop :as interop]))

(defn get-kind [kind]
  (get {1 :text,
        2 :method,
        3 :function,
        4 :constructor,
        5 :field,
        6 :variable,
        7 :class,
        8 :interface
        9 :module,
        10 :property,
        11 :unit,
        12 :value,
        13 :enum,
        14 :keyword,
        15 :snippet,
        16 :color,
        17 :file,
        18 :reference
        19 :folder,
        20 :enumMember,
        21 :constant,
        22 :struct,
        23 :event
        24 :operator,
        25 :typeParameter}
       kind))

(defn complete [params]
  (->> (autocomplete/suggest (clj->js params))
       (.-items)
       (mapv #(-> %
                  (interop/obj->clj)
                  (update :kind get-kind)))))

1

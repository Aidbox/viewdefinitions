(ns vd-designer.pages.form.resource-tab.view
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Row Col Space Flex]]
            [re-frame.core :refer [dispatch subscribe]]
            [clojure.string :as str]
            [reagent.core :as r]
            [vd-designer.components.tree :refer [tree]]
            [vd-designer.pages.form.model :as form-model]
            [vd-designer.pages.form.resource-tab.model :as m]))

(defn create-key [parent-key element-name]
  (when element-name
    (if parent-key
      (str parent-key "-" (str/lower-case element-name))
      (str/lower-case element-name))))

(def icon-datatype-blob
  (str "data:image/gif;base64,"
       "R0lGODlhEAAQAPZ/APrkusOiYvvfqbiXWaV2G+jGhdq1b8GgYf3v1frw3vTUlsWkZNewbcSjY/DQ"
       "kad4Hb6dXv3u0f3v1ObEgfPTlerJiP3w1v79+e7OkPrfrfnjuNOtZPrpydaxa+/YrvvdpP779Zxv"
       "FPvnwKKBQaFyF/369M2vdaqHRPz58/HNh/vowufFhfroxO3OkPrluv779tK0e6JzGProwvrow9m4"
       "eOnIifPTlPDPkP78+Naxaf3v0/zowfXRi+bFhLWUVv379/rnwPvszv3rye3LiPvnv+3MjPDasKiI"
       "S/789/3x2f747eXDg+7Mifvu0tu7f+/QkfDTnPXWmPrjsvrjtPbPgrqZW+/QlPz48K2EMv36866O"
       "UPvowat8Ivvgq/Pbrvzgq/PguvrgrqN0Gda2evfYm9+7d/rpw9q6e/LSku/Rl/XVl/LSlfrkt+zV"
       "qe7Wqv3x1/bNffbOf59wFdS6if3u0vrqyP3owPvepfXQivDQkO/PkKh9K7STVf779P///wD/ACH5"
       "BAEKAH8ALAAAAAAQABAAAAemgH+CgxeFF4OIhBdKGwFChYl/hYwbdkoBPnaQkosbG3d3VEpSUlon"
       "UoY1Gzo6QkI8SrGxWBOFG4uySgY5ZWR3PFy2hnaWZXC/PHcPwkpJk1ShoHcxhQEXSUmtFy6+0iSF"
       "VResrjoTPDzdcoU+F65CduVU6KAhhQa3F8Tx8nchBoYuqoTLZoAKFRIhqGwqJAULFx0GYpBQeChR"
       "IR4TJm6KJMhQRUSBAAA7"))

(def icon-reference-blob
  (str "data:image/png;base64,"
       "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACx"
       "jwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41"
       "LjEwMPRyoQAAAFxJREFUOE/NjEEOACEIA/0o/38GGw+agoXYeNnDJDCUDnd/gkoFKhWozJiZI3gL"
       "wY6rAgxhsPKTPUzycTl8lAryMyMsVQG6TFi6cHULyz8KOjC7OIQKlQpU3uPjAwhX2CCcGsgOAAAA"
       "AElFTkSuQmCC"))

(def icon-slice-item-blob
  (str "data:image/png;base64,"
       "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACx"
       "jwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAHKSURBVDhPrZLRahNBFIb/mZ3dnd0km22oCdaa"
       "2lYt0lYrFi+kIHjpUwheKIiP4KMovoCIt3qvBRFpTW0qFqqYJtpkkybZZN2d2XXd1s194n9zGOY/"
       "35zzMySKIkwielrH1sSAsVcghCT1/01gLUxBs1UEgQ9rxrpqncmumXmec51Br/mtvdWuOlu6yeHW"
       "+omfspO3U0C2nEd+3rq0euf6/cUbl2/ZJfOiyhUeeNJrH7r7XzY/v/v46v0zZ7dV/etnJkv6UoB9"
       "pbC+8WTj+bW768sdv4eAuSBaiMin0GQWtp7Dh5ebB28evL4divC7op9MkGbAM9qs5GH509cKao0G"
       "up1j9Ds9dNtd1OqH2N6rxHuSCyzDypQRhEEIMRAjQDzqUEZa38gZUHUbES0hIiVAKYLFZ8M2IKU6"
       "PLVjbnEF80urIwAhIVU5DJbVwdgRaKsJsdOD2D2G2PsNsW8hqmcM6Qk/XiH2MCiKMsqAqtQu3px5"
       "uHRv+VFhxZzVz2pgOQbhCgwbHlqVQbP6dPtF6+2vx6Vzc0Hjx0HSlwL+fYxYC7zA1/i0eV7hiik9"
       "6XvNQd1zvJ34Lg4Ccmq6COfoZ2JOAeMqzWBcTQgA/gA0frpjmCaTCAAAAABJRU5ErkJggg=="))

(def icon-choice-blob
  (str "data:image/gif;base64,"
       "R0lGODlhEAAQAMQfAGm6/idTd4yTmF+v8Xa37KvW+lyh3KHJ62aq41ee2bXZ98nm/2mt5W2Ck5XN"
       "/C1chEZieho8WXXA/2Gn4P39/W+y6V+l3qjP8Njt/lx2izxPYGyv51Oa1EJWZ////////yH5BAEA"
       "AB8ALAAAAAAQABAAAAWH4Cd+Xml6Y0pCQts0EKp6GbYshaM/skhjhCChUmFIeL4OsHIxXRAISQTl"
       "6SgIG8+FgfBMoh2qtbLZQr0TQJhk3TC4pYPBApiyFVDEwSOf18UFXxMWBoUJBn9sDgmDewcJCRyJ"
       "JBoEkRyYmAABPZQEAAOhA5seFDMaDw8BAQ9TpiokJyWwtLUhADs="))

(def icon-primitive-blob
  (str "data:image/png;base64,"
       "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA"
       "RklEQVQ4y2P8//8/AyWAhYFCMAgMuHjx4n+KXaCv+I0szW8WpCG8kFO1lGFKW/SIjAUYgxz/MzAw"
       "MDC+nqhDUTQyjuYFBgCNmhP4OvTRgwAAAABJRU5ErkJggg=="))

(defn render-resource [element]
  (assoc element :title
         (r/as-element
          [:div
           [:img {:width "14" :height "14" :src icon-datatype-blob}]
           (:option-name element)])))

(defn shorten-valueset-name [value-set-name]
  (last (str/split value-set-name #"/")))

(defn option-name [element-name element]
  (cond
    element-name
    element-name

    (:id element)
    (:id element)
    :else ""))

(defn flat-elements
  "{:elements {:a {1 2 3 4}}} => [{:option-name a 1 2 3 4}] "
  [parent-element]
  (reduce
   (fn [acc [k v]]
     (conj acc
           (assoc v :option-name (name k))))
   []
   (:elements parent-element)))

(defn add-choices [master slaves]
  (assoc master :choices (get slaves (:option-name master))))

(defn group-choice-of
  "[{:option-name 'valueA' :choiceOf 'value'}
    {:option-name 'valueB' :choiceOf 'value'}
    {:option-name 'value' :choices ['valueA' 'valueB']}]
  =>
  [{:option-name 'value' :choices
    [{:option-name 'valueA' :choiceOf 'value'}
     {:option-name 'valueB' :choiceOf 'value'}]}]"
  [fhir-schemas]
  (let [masters
        (->>
         fhir-schemas
         (filter :choices))
        slaves
        (->> fhir-schemas
             (group-by :choiceOf)
             (remove (fn [[k _]] (nil? k)))
             (into {}))]
    (->> fhir-schemas
         (remove #(or (:choices %) (:choiceOf %)))
         (concat (mapv #(add-choices % slaves) masters)))))

(defn add-keys [option-name elements]
  (mapv
   (fn [element]
     (assoc element :key (create-key option-name (:option-name element))))
   elements))

(defn pre-process-fhir-schema [fhir-schema]
  (->> fhir-schema
       flat-elements
       group-choice-of
       (sort-by :option-name)
       (add-keys (:option-name fhir-schema))))

(defn render-element* [element fhir-schema & [lvl]]
  (let [lvl (or lvl 0)]
    (r/as-element
     [:span
      [:span
       {:style {:min-width (str (- 300 (* 32 lvl)) "px")
                :max-width (str (- 300 (* 32 lvl)) "px")
                :display "inline-block"}}
       [:> Space
        (cond
          (:choices element)
          [:img {:width "14" :height "14" :src icon-choice-blob}]

          (= "Reference" (:type element))
          [:img {:width "14" :height "14" :src icon-reference-blob}]

          (and (:type element) (subs (:type element) 0 1))
          [:img {:width "14" :height "14" :src icon-primitive-blob}]

          :else (println "!! " element))
        (:option-name element)]]

      [:span {:style {:padding-left 32
                      :min-width "32px"
                      :max-width "32px"
                      :display "inline-block"}}
       (when (:mustSupport element)
         [:span "S"])

       (when (:summary element)
         [:span "Σ"])]

      [:span {:style {:padding-left 32
                      :min-width "32px"
                      :max-width "32px"
                      :display "inline-block"}}
       (str (or (when (contains? (into #{} (:required fhir-schema)) (:option-name element))
                  "1")
                (:min element)
                "0")
            ".."
            (or (when (:array element) "*")
                (:max element)
                "1"))]

      [:span {:style {:padding-left 32
                      :min-width "150px"
                      :max-width "150px"
                      :display "inline-block"}}
       (when (:type element) [:a (:type element)])]
      [:span {:style {:padding-left 32
                      :display "inline-block"
                      :min-width "170px"}}
       (when (:binding element)
         [:span
          "Binding: " [:a (shorten-valueset-name (:valueSet (:binding element)))]
          " (" (:strength (:binding element)) ")"])]])))

(defn render-element [element fhir-schema & [lvl]]
  (let [lvl (or lvl 0)
        element (cond-> element
                  (not (:key element))
                  (assoc :key (create-key (or (:key fhir-schema)
                                              (:option-name fhir-schema)
                                              (:type fhir-schema)) (:option-name element))))]
    (cond->
     (assoc element :title (render-element* element fhir-schema lvl))

      (:choices element)
      (assoc :children (mapv
                        (fn [c]
                          {:title (render-element* c fhir-schema (inc lvl))
                           :key (create-key (:key element) (:option-name c))})
                        (:choices element)))

      (:elements element) ;; backboneelement
      (assoc :children
             (mapv
              (fn [c]
                (render-element c (pre-process-fhir-schema element) (inc lvl)))
              (pre-process-fhir-schema element))))))

(defn fhir-schema->options [resource-type fhir-schema]
  (let [rt-key (create-key nil resource-type)]
    [(render-resource
      {:option-name (option-name resource-type fhir-schema)
       :key rt-key
       :children
       (mapv
        (fn [element]
          (-> element
              (assoc :key (create-key rt-key (:option-name element)))
              (render-element fhir-schema)))
        (pre-process-fhir-schema fhir-schema))})]))

(defn schema->tree-data [schema]
  (fhir-schema->options (:id schema) schema))

(defn resource-tab []
  (let [spec @(subscribe [::m/spec-map])
        resource-input @(subscribe [::form-model/resource-input])
        pat (when spec (get (js->clj spec :keywordize-keys true)
                            (keyword resource-input)))]
    (when pat
      [tree {:style         {:padding-right "16px"}
             :defaultExpandAll true
             :tree-data (clj->js (schema->tree-data pat))}])))

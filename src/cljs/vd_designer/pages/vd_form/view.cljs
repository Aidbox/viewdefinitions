(ns vd-designer.pages.vd-form.view
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Button Flex Row Space Tooltip Col]]
            [vd-designer.components.tree :refer [tree] :as tree]
            [medley.core :as medley]
            [clojure.string :as str]
            [re-frame.core :refer [dispatch subscribe]]
            [react-resizable-panels :refer [Panel PanelGroup PanelResizeHandle]]
            [reagent.core :as r]
            [vd-designer.components.alert :refer [alert]]
            [vd-designer.components.button :as button]
            [vd-designer.components.heading :refer [h1]]
            [vd-designer.components.table :refer [table]]
            [vd-designer.components.tabs :refer [tab-item tabs]]
            [vd-designer.auth.model :as auth-model]
            [vd-designer.auth.view :refer [auth-required]]
            [vd-designer.pages.vd-form.components :refer [toggle-popover]]
            [vd-designer.pages.vd-form.controller :as c]
            [vd-designer.pages.vd-form.editor :refer [editor]]
            [vd-designer.pages.vd-form.form :refer [form]]
            [vd-designer.pages.vd-form.form.settings :as form]
            [vd-designer.pages.vd-form.model :as m]
            [vd-designer.pages.vd-form.sql :refer [sql]]))

(defn- save-vd-button [authorized?]
  (let [button (fn [overrides]
                 [:> Button
                  (medley/deep-merge
                    {:class "mobile-icon-button"
                     :icon  (r/create-element icons/SaveOutlined)}
                    overrides)
                  "Save"])]
    (if authorized?
      (button {:onClick #(dispatch [::c/save-view-definition])
               :loading @(subscribe [::m/save-loading])})
      [auth-required (button {})])))

(defn good-keys [schema]
  (dissoc schema :fqn :xpath :xpathUsage :experimental :version :package-meta
          :comparator
          :extension
          :copyright :immutable :contact :derivation :kind :type))

(defn resource? [schema]
  (= "resource" (:kind schema)))


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

#_(defn get-lvl [element])

#_(defn render-tree [resource-schema]
  [:<>
   [:style "tr:nth-child(even) {background-color: var(--basic-gray-0);}"]
   [:table
    {:style  {:width "900px"
              :font-family "Inter" :font-size "12px" :font-weght "400"}}
    [:tr
     [:th "Name"]
     [:th "Flags"]
     [:th "Card."]
     [:th "Type"]]
    [:tr [:img {:width "14" :height "14" :src icon-datatype-blob}] (:type resource-schema)]
    (for [[element-name element] (sort-by first (:elements resource-schema))]
      ^{:key (:path element)}
      [:tr
       ;; icon
       [:td {:style {:margin-left (str (* (dec (:lvl element)) 25) "px")
                     :margin-top "1px"}}
        (cond
          ;; (. (subs (:type element) 0 1))
          ;; [:img {:width "14" :height "14" :src icon-primitive-blob}]

          (:union? element)
          [:img {:width "14" :height "14" :src icon-choice-blob}]

          (= "Reference" (:type element))
          [:img {:width "14" :height "14" :src icon-reference-blob}]

          :else [:img {:width "14" :height "14" :src icon-datatype-blob}])
        ;; name
        [:span
         element-name
         (when (:union? element) "[x]")]]
       ;; flags
       [:td
        (when (:mustSupport element)
          [:span "S"])
        (when (:summary element)
          [:span "Σ"])
        (when (:modifier element) [:span "!?"])]
       ;; card
       [:td
        (str (or (:min element) "0") ".." (or (:max element) (when (:array element) "*") 1))]
       ;; type
       [:td
        (when (:type element) (:type element))
        (when (:refers element)
          [:span
           " ("
              (str/join ", "
                        (mapv #(last (str/split % #"/"))
                              (:refers element)))
              #_(for [r (:refers element)]
                ^{:key (:name r)}
                [:span (last (str/split r #"/"))])
              ")"]
          )

        #_(when (:datatype element)
          [:div
           (:datatype element)
           (:slice-type element)
           (when (:refers element)
             [:span
              " ("
                 (for [r (:refers element)] ^{:key (:name r)}
                   [:span (:name r)])
                 ")"]
             )])]])]])

(defn render-resource [element]
  (assoc element :title
         (r/as-element
           [:div
            [:img {:width "14" :height "14" :src icon-datatype-blob}]
            (:option-name element)])))

(defn render-element [element]
  (assoc
    element
    :title
    (r/as-element
      [:> Row {:align  :middle
               :gutter 16}
       [:> Col {:span 7}
        (cond
          (and (:type element) (subs (:type element) 0 1))
          [:img {:width "14" :height "14" :src icon-primitive-blob}]

          ;; (:union? element)
          ;; [:img {:width "14" :height "14" :src icon-choice-blob}]

          (= "Reference" (:type element))
          [:img {:width "14" :height "14" :src icon-reference-blob}]

          :else [:img {:width "14" :height "14" :src icon-datatype-blob}])
        (:option-name element)]

       [:> Col {:span 2}
        (when (:mustSupport element)
          [:span "S"])
        (when (:summary element)
          [:span "Σ"])
        (when (:modifier element) [:span "!?"])]

       [:> Col {:span 2}
        (str (or (:min element) "0") ".." (or (:max element) (when (:array element) "*") 1))]

       [:> Col {:span 13}
        (when (:type element) (:type element))
        (when (:refers element)
          [:span
           " ("
              (str/join ", "
                        (mapv #(last (str/split % #"/"))
                              (:refers element)))
              #_(for [r (:refers element)]
                  ^{:key (:name r)}
                  [:span (last (str/split r #"/"))])
              ")"])]])))

(defn create-key [parent-key element-name]
  (if parent-key
    (str parent-key "-" (str/lower-case element-name))
    (str/lower-case element-name)))

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

(defn fhir-schema->options [resource-type fhir-schema]
  (let [k (create-key nil resource-type)]
    [(render-resource
       {:option-name (option-name resource-type fhir-schema)
        :key (create-key nil resource-type)
        :children
        (mapv
          (fn [element]
            (-> element
                (assoc :key (create-key k (:option-name element)))
                render-element))
          (flat-elements fhir-schema))})]))


(defn schema->tree-data [schema]
  (fhir-schema->options (:id schema) schema))

(defn viewdefinition-view []
  (let [spec @(subscribe [::m/spec-map])
        pat (get spec "Observation")
        resources @(subscribe [::m/view-definition-data])
        error @(subscribe [::m/current-vd-error])
        opened-id @(subscribe [::m/settings-opened-id])
        button-id "root-vd-settings"
        current-vd @(subscribe [::m/current-vd])
        authorized? @(subscribe [::auth-model/authorized?])]
    [:> PanelGroup {:direction "horizontal"
                    :style {:gutter         32
                            :flex           1
                            :display        "flex"
                            :flex-direction "row"
                            :flex-flow      "row"
                            :overflow       "hidden"}}
     [:> Panel
      {:minSize 25
       :style   {:display "flex"}}
      [:> Flex {:vertical true
                :flex     "1 0 0%"
                :style    {:override  "hidden"
                           :min-width "400px"}}
       [:> Row {:align "middle"}
        [:> Space
         [h1 "ViewDefinition"]
         [button/icon ""
          icons/SettingOutlined
          {:onClick #(toggle-popover nil button-id)
           :style   {:border :none}
           :id      button-id}]]
        [form/root-settings {:open (= button-id opened-id)}]]

       (when error
         [alert :type :error :message error])

       [tabs {:animated true
              :items [(tab-item {:key      "form"
                                 :label    "Form"
                                 :children [form]
                                 :icon     (r/create-element icons/EditOutlined)})
                      (tab-item {:key      "code"
                                 :label    "Code"
                                 :disabled (nil? current-vd)
                                 :children [editor]
                                 :icon     (r/create-element icons/CodeOutlined)})
                      (tab-item {:key      "sql"
                                 :label    "SQL"
                                 :children [sql]
                                 :disabled (nil? resources)
                                 :icon     (r/create-element icons/HddOutlined)})]
              :tabBarExtraContent {:right (r/as-element
                                           [:> Flex {:gap 8
                                                     :style {:margin-right "8px"}}
                                            [:> Tooltip
                                             {:placement       "bottom"
                                              :mouseEnterDelay 0.5
                                              :title           "Ctrl+Enter"}
                                             [:> Button {:class   "mobile-icon-button"
                                                         :onClick #(dispatch [::c/eval-view-definition-data])
                                                         :icon    (r/create-element icons/PlayCircleOutlined)
                                                         :loading @(subscribe [::m/eval-loading])}
                                              "Run"]]
                                            [save-vd-button authorized?]])}}]]]
     [:> PanelResizeHandle {:style {:border-right       "solid"
                                    :border-right-color "#F0F0F0"
                                    :border-width       "1px"}}]
     [:> Panel {:minSize 20}
      [h1 "Results" :style {:margin-left "20px"}]
      (when pat
        [tree {:style         {:padding-right "16px"}
               :defaultExpandAll true
               :tree-data (clj->js (schema->tree-data pat))}])

      #_[table (:data resources)
       {:class  "vd-table"
        :scroll {:y 1000
                 :x true}}]]]))


(ns vd-designer.pages.form.components
  (:require ["@ant-design/icons" :as icons]
            ["@sooro-io/react-gtm-module" :as TagManager]
            [antd :refer [AutoComplete Checkbox Col ConfigProvider Form Flex Input
                          Popover Row Select Space Tooltip Typography]]
            [clojure.string :as str]
            [medley.core :as medley]
            [re-frame.core :refer [dispatch dispatch-sync subscribe]]
            [reagent.core :as r]
            [vd-designer.components.button :as button]
            [vd-designer.components.dropdown :as dropdown-component]
            [vd-designer.components.input :as input-component]
            [vd-designer.components.select :as select]
            [vd-designer.components.tag :as tag]
            [vd-designer.components.tree :as tree-component]
            [vd-designer.pages.form.controller :as c]
            [vd-designer.pages.form.model :as m]
            [vd-designer.utils.event :as u]
            [vd-designer.utils.js :as js-utils]))

(defn set-input-value [input-id value]
  (dispatch-sync [::c/set-input-text input-id value]))

(defn update-input-value [input-id f]
  (dispatch-sync [::c/update-input-text input-id f]))

(defn tree-tag [kind]
  (case kind
    :select
    [tag/tag "select"
     :style {:color      "#7972D3"
             :background "#7972D31A"}]

    :column
    [tag/tag "column"
     :style {:color      "#009906"
             :background "#E5FAE8"}]

    :unionAll
    [tag/tag "unionall"
     :style {:color      "#BA004E"
             :background "#FE60901A"}]

    :forEach
    [tag/tag "foreach"
     :style {:color      "#B37804"
             :background "#F8CE3B1A"}]
    :forEachOrNull
    [tag/tag "foreach or null"
     :style {:color      "#B37804"
             :background "#F8CE3B1A"}]

    :constant
    [tag/default "constant"]

    :where
    [tag/default "where"]))

;;;; Rows

(defn title-node-row [& {:keys [id start end]}]
  [:> Flex {:justify :space-between
            :on-click #(dispatch [::c/toggle-expand-collapse id])}
   (into [:> Row {:align :middle
                  :wrap false
                  :gutter 8}]
         (mapv (fn [c] [:> Col {:flex :auto} c]) start))
   (into [:> Row {:align :middle
                  :wrap false
                  :gutter 8
                  :style {:margin-right 4}}]
         (mapv (fn [c] [:> Col {:flex :auto} c]) end))])

(defn base-node-row [node-key col1 & cols]
  (->> cols
       (mapv (fn [col] [:> Col {:flex "30px"} col]))
       (into [:> Row {:align :middle
                      :wrap false
                      :on-click #(dispatch [::c/toggle-expand-collapse node-key])}
              [:> Col {:flex :auto} col1]])))

(defn base-input-row [value-path col1 col2]
  [:> Row {:align  :middle
           :gutter 16
           :id     (tree-component/calc-key value-path)}
   [:> Col {:span 12}
    [:> Row {:justify :start} col1]]

   [:> Col {:span 12}
    [:> Row {:justify :end} col2]]])

;;;; Buttons

(defn add-vd-leaf [value-path kind]
  (dispatch [::c/add-tree-leaf value-path kind]))

(defn add-element-button [value-path node-type]
  [button/ghost (name node-type) icons/PlusOutlined
   {:onClick #(dispatch [::c/add-tree-leaf value-path node-type])
    :style   {:width           "100%"
              :text-align      :left
              :justify-content :flex-start}}])

(defn add-select-button [value-path]
  (let [requested-key #(keyword (.-key %))]
    [dropdown-component/add-dropdown "select"
     {:style {:width       "55px"
              :height      "18px"
              :flex-shrink 0}
      :menu {:items   (interpose {:type "divider"}
                                 [(dropdown-component/dropdown-item-img "column"        "/img/form/column.svg")
                                  (dropdown-component/dropdown-item-img "forEach"       "/img/form/forEach.svg")
                                  (dropdown-component/dropdown-item-img "forEachOrNull" "/img/form/forEach.svg")
                                  (dropdown-component/dropdown-item-img "unionAll"      "/img/form/unionAll.svg")])
             :on-click #(do
                          (TagManager/dataLayer
                           (clj->js {:dataLayer {:event "vd_edit"
                                                 :node-type (name (requested-key %))}}))
                          (dispatch [::c/add-tree-node value-path (requested-key %)]))}}]))

(defn convert-foreach [value-path kind]
  (let [to (if (= kind :forEach) :forEachOrNull :forEach)]
    [:> Tooltip {:title (str "Convert to " (name to))}
     [:<> [button/invisible-icon icons/SwapOutlined
           {:onClick (fn [e]
                       (.stopPropagation e)
                       (dispatch [::c/convert-foreach value-path kind to]))}]]]))

(defn delete-button [value-path]
  [button/invisible-icon icons/CloseOutlined
   {:onClick (fn []
               (dispatch [::c/delete-tree-element value-path])
               (dispatch [::c/eval-view-definition-data]))
    :tabIndex -1}])

(defn settings-button [& {:as opts}]
  [button/invisible-icon icons/SettingOutlined opts])

;;;; Inputs

(defn eval-on-ctrl-enter [event]
  (when (and (= "Enter" (.-key event))
             (or (.-ctrlKey event) (.-metaKey event)))
    (dispatch [::c/eval-view-definition-data])))

(defn name-input [value-path]
  (let [errors? @(subscribe [::m/empty-inputs?])
        name @(subscribe [::m/name-input])]
    [base-input-row value-path
     [tag/default "name"]
     [input-component/input {:value       name
                             :onKeyDown   eval-on-ctrl-enter
                             :placeholder "ViewDefinition"
                             :classNames {:input
                                          (if (and (str/blank? name) errors?)
                                            "default-input red-input"
                                            "default-input")}
                             :style       {:font-style "normal"
                                           :min-width "200px"
                                           :max-width "400px"}
                             :onChange    (fn [e] (dispatch [::c/change-vd-name (u/target-value e)]))}]]))

(defn resource-input [value-path]
  (let [errors? @(subscribe [::m/empty-inputs?])
        resource-input @(subscribe [::m/resource-input])]
    [base-input-row value-path
     [tag/default "resource"]
     [:> Select (select/with-default-props
                  {:placeholder "Resource type"
                   :options     @(subscribe [::m/get-all-supported-resources])
                   :class (if (and (str/blank? resource-input) errors?)
                            "vd-resource red-input"
                            "vd-resource")
                   :style       {:min-width "200px"
                                 :max-width "400px"}
                   :value resource-input
                   :onSelect    #(dispatch [::c/change-vd-resource %])})]]))

(defn- toggle-settings-popover-hover [value-path]
  (let [tree-element-id (tree-component/calc-key value-path)
        button-id       (str tree-element-id "-settings-btn")

        process-hover   (fn [f elements]
                          (mapv (fn [element]
                                  (mapv #(f element %)
                                        ["settings-popover-active" "active"]))
                                elements))]
    (process-hover js-utils/remove-class (js-utils/find-elements ".settings-popover-active.active"))
    (when value-path
      (process-hover js-utils/toggle-class [(js-utils/get-element-by-id button-id)
                                            ;; TODO: it worked long time ago.
                                            #_(-> (js-utils/get-element-by-id tree-element-id)
                                                (.-parentNode)
                                                (.-parentNode))]))))

(defn toggle-popover [value-path button-id]
  (toggle-settings-popover-hover value-path)
  (dispatch [::c/toggle-settings-opened-id button-id]))

(defn settings-popover [value-path & {:as opts}]
  (let [tree-element-id (tree-component/calc-key value-path)
        button-id (str tree-element-id "-settings-btn")
        opened-id @(subscribe [::m/settings-opened-id])]
    [:> Popover (medley/deep-merge
                 {:trigger :click
                  :open    (= button-id opened-id)}
                 opts)
     [:div [settings-button {:onClick   #(toggle-popover value-path button-id)
                             :onKeyDown #(when (= "Escape" (.-key %))
                                           (toggle-popover nil nil))
                             :id        button-id
                             :tabIndex -1}]]]))

(defn trigger-update-autocomplete-text-event [id fhirpath-prefix event]
  (dispatch [::c/update-autocomplete-text
             {:id              id
              :text            (u/target-value event)
              :fhirpath-prefix fhirpath-prefix
              :cursor-start (u/selection-start event)
              :cursor-end   (u/selection-end event)}]))

(defn render-option* [icon type-or-kind label & [matched-count]]
  (r/as-element
   [:> Row {:align  :middle}
    [:> Col {:span 2}
     [:> Row {:justify :start} icon]]
    [:> Col {:span 11}
     [:> Row {:justify :start}
      (if matched-count
        [:<>
         [:b (subs label 0 matched-count)]
         (subs label matched-count)]
        label)]]
    [:> Col {:span 11}
     [:> Row {:justify :end}
      [:div {:style {:font-style :italic
                     :color "#1677ff"}}
       (str " " type-or-kind)]]]]))

(defn get-current-token [option whole-text]
  (when whole-text
    (let [start (-> option :textEdit :range :start :character)
          end   (-> option :textEdit :range :end :character)]
      (subs whole-text start end))))

(defn render-text [label matched-count]
  (if matched-count
    [:<>
     [:b (subs label 0 matched-count)]
     (subs label matched-count)]
    label))

(defn- special-constant-symbols-length [text]
  (cond
    (str/starts-with? text "%'") 2
    (str/starts-with? text "%`") 2
    (str/starts-with? text "%") 1
    :else 0))

(defn render-option [text cursor option]
  (let [kind (:kind option)
        cursor-relative-pos (- cursor (-> option :textEdit :range :start :character))]
    (render-option*
     (cond
       (= :field kind) [:> icons/ContainerOutlined]
       (= :method kind) [:> icons/FunctionOutlined]
       (= :class kind) "T"
       (= :constant kind) "α"
       :else [:> icons/ContainerOutlined])
     (or (:detail option) (name kind))
     (render-text (:label option)
                  (let [cursor-pos
                        (cond-> cursor-relative-pos
                          (= :constant kind)
                          (- (special-constant-symbols-length text)))]
                    (some-> (get-current-token option text)
                            count
                            (min cursor-pos)))))))

(defn new-cursor-idx
  "Change cursor index.
 name.whe|r, C = 8
 token = wher
 C' = 3"
  [cursor-idx input-text token]
  (let [new-cursor (- cursor-idx (- (count input-text) (count token)))]
    (if (>= new-cursor 0) new-cursor cursor-idx)))

(defn constants-possible-strings [constant-label]
  [(str "%" constant-label)
   (str "%'" constant-label "'")
   (str "%`" constant-label "`")])

(defn filter-constant [input-value cursor-start text-to-filter option]
  (let [constants-possible (constants-possible-strings (:label option))
        text (subs text-to-filter 0
                   (new-cursor-idx cursor-start input-value text-to-filter))]
    (some true?
          (mapv #(str/starts-with? % text) constants-possible))))

(defn filter-options [input-value cursor-start option]
  (let [text-to-filter (get-current-token option input-value)
        filter-by (or (:filterText option) (:label option))]
    (when (and text-to-filter filter-by)
      (or
       (when (= :constant (:kind option))
         (filter-constant input-value cursor-start text-to-filter option))

       (= cursor-start (-> option :textEdit :range :start :character))
       (str/starts-with?
        filter-by
        (subs
         text-to-filter 0
         (new-cursor-idx cursor-start input-value text-to-filter)))))))


(defn change-text-and-cursor [input-text option]
  (when (:textEdit option)
    (let [text-edit (:textEdit option)
          kind (:kind option)
          start-idx (-> text-edit :range :start :character)
          end-idx (-> text-edit :range :end :character)
          text-new (:newText text-edit)
          left  (subs input-text 0 start-idx)
          right (subs input-text end-idx)
          $0-index (str/index-of text-new "$0")]
      (cond
        (not (= :method kind)) ; name
        {:value  (str left (str/replace text-new #"\$0" "") right)
         :cursor (+ start-idx (count text-new))}

        (not (str/includes? text-new "$0")) ;first()
        {:value  (str left (str/replace text-new #"\$0" "")
                      (if (and right (str/starts-with? right "()")) (subs right 2) right))
         :cursor (+ start-idx (count text-new))}

        (not (re-matches #"\(.*\).*" right)) ; where, whe (no parens)
        {:value  (str left (str/replace text-new #"\$0" "") right)
         :cursor (+ start-idx $0-index)}

        (re-matches #"\(\).*" right) ; where()
        {:value  (str left (str/replace text-new #"\(\$0\)" right))
         :cursor (+ start-idx $0-index)}

        :else ; where(expr), where(expr).abc
        {:value  (str left (str/replace text-new #"\(\$0\)" right))
         :cursor (inc (+ start-idx (str/index-of (subs input-text start-idx) ")")))}))))

(defn ->ui-options [{:keys [text cursor-start]} options]
  (->> options
       (filterv #(filter-options text cursor-start %))
       (mapv
        (fn [option]
          (let [{:keys [value cursor]} (change-text-and-cursor text option)]
            (assoc option
                   :label-option (:label option)
                   :label (render-option text cursor-start option)
                   :value value
                   :cursor cursor))))))

(defn fhirpath-alias [fhirpath]
  (let [tokens (str/split fhirpath #"\.")
        tokens (if (seq tokens) ; (str/split "name" #".") => []
                 tokens
                 [fhirpath])]
    (->> tokens
         (remove (fn [token] (str/ends-with? token ")")))
         last)))

(defn autocomplete
  [& {:keys [input-id
             name-input-id
             autoFocus
             placeholder
             fhirpath-prefix]
      {:keys [on-ctrl-enter
              on-shift-enter]} :handlers}]
  (let [{:keys [options request]} @(subscribe [::m/autocomplete-options])
        value @(subscribe [::m/input-value input-id])
        errors?  @(subscribe [::m/empty-inputs?])
        auto-complete-ref (clojure.core/atom nil)
        update-autocomplete-fn #(trigger-update-autocomplete-text-event input-id fhirpath-prefix %)
        rendered-options (if (= input-id (:id request))
                           (->ui-options request options)
                           [])]
    [:> ConfigProvider {:theme {:components {:Input {:activeBorderColor "#7972D3"
                                                     :hoverBorderColor  "#7972D3"
                                                     :paddingInline     0}}}}
     [:> AutoComplete {:style {:width "100%"}
                       :options rendered-options
                       :defaultValue value
                       :autoFocus autoFocus
                       :onKeyDown (fn [e]
                                    (when (= "Escape" (u/pressed-key e))
                                      (.preventDefault e)))
                       :popupMatchSelectWidth 350
                       :backfill true
                       :onKeyUp  (fn [e]
                                   (when (#{"ArrowLeft" "ArrowRight"} (u/pressed-key e))
                                     (update-autocomplete-fn e))
                                   (when (and (= "Enter" (u/pressed-key e))
                                              (.-shiftKey e))
                                     (on-shift-enter e))
                                   (when-let [f (and (= "Enter" (u/pressed-key e))
                                                     (.-ctrlKey e)
                                                     on-ctrl-enter)]
                                     (.preventDefault e)
                                     (.stopPropagation e)
                                     (f e)))
                       :onBlur (fn [e]
                                 (set-input-value input-id (u/target-value e))
                                 (update-input-value
                                  name-input-id
                                  (fn [v] (if (str/blank? v)
                                            (fhirpath-alias (u/target-value e))
                                            v)))
                                 (dispatch [::c/set-input-focus nil])
                                 (dispatch [::c/eval-view-definition-data]))
                       :onInput #(update-autocomplete-fn %)
                       :onClick  (fn [e] (update-autocomplete-fn e))
                       :onSelect (fn [_value option]
                                   (when-let [r @auto-complete-ref]
                                     (when-let [cursor (:cursor (js->clj option :keywordize-keys true))]
                                       (js/setTimeout (fn [_]
                                                        (.focus r)
                                                        (.setSelectionRange r cursor cursor)) 0))))}
      [:> Input {:style        {:font-style       "italic"
                                :border           "none"
                                :border-bottom    "1px solid transparent"
                                :border-radius    0
                                :background-color "transparent"}
                 :placeholder  placeholder
                 :onBlur
                 (fn [_]
                   (mapv
                    (fn [one]
                      (.setAttribute one "draggable" true))
                    (array-seq (.querySelectorAll js/document ".ant-tree-treenode-draggable"))))

                 :onFocus (fn [_]
                            (mapv
                              (fn [one]
                                (.setAttribute one "draggable" false))
                              (array-seq (.querySelectorAll js/document ".ant-tree-treenode-draggable"))))
                 :classNames   {:input (if errors?
                                         "default-input red-input"
                                         "default-input")}
                 :ref          (fn [el] (reset! auto-complete-ref el))}]]]))

(defn string-input
  [& {:keys [input-id
             placeholder
             autoFocus]
      {:keys [on-shift-enter
              on-ctrl-enter]} :handlers}]
  (let [value @(subscribe [::m/input-value input-id])
        error? @(subscribe [::m/input-error input-id])]
    [input-component/input {:placeholder  (or placeholder "path")
                            :autoFocus autoFocus
                            :defaultValue value
                            :onBlur (fn [e]
                                      (mapv
                                        (fn [one]
                                          (.setAttribute one "draggable" true))
                                        (array-seq (.querySelectorAll js/document ".ant-tree-treenode-draggable")))
                                      (set-input-value input-id (u/target-value e))
                                      (dispatch [::c/set-input-focus nil]))
                            :onKeyDown (fn [event]
                                         (when (and (= "Enter" (.-key event))
                                                    (or (.-ctrlKey event) (.-metaKey event)))
                                           (on-ctrl-enter event))
                                         (when (and (= "Enter" (.-key event))
                                                    (.-shiftKey event))
                                           (on-shift-enter event)))
                            :onFocus (fn [_]
                                       (mapv
                                         (fn [one]
                                           (.setAttribute one "draggable" false))
                                         (array-seq (.querySelectorAll js/document ".ant-tree-treenode-draggable"))))
                            :classNames   {:input (if error?
                                                    "default-input red-input"
                                                    "default-input")}}]))


(defn checkbox
  [& {:keys [input-id]}]
  (let [value @(subscribe [::m/input-value input-id])]
    [:div {:style {:width "100%"}}
     [:> Checkbox
      {:checked  value
       :onChange #(set-input-value input-id (-> % .-target .-checked))}]]))

(defn input-number*
  [& {:keys [input-id
             placeholder]}]
  (let [value @(subscribe [::m/input-value input-id])]
    [input-component/input-number {:placeholder placeholder
                                   :value       value
                                   :onChange    #(set-input-value input-id (u/target-value %))}]))

(defn render-input
  [& {:keys [input-id] :as opts}]
  (let [input-type @(subscribe [::m/input-type input-id])
        input-focus @(subscribe [::m/input-focus])
        opts (assoc opts :autoFocus (= input-id input-focus))]
    (case input-type
      :number [input-number* opts]
      :boolean [checkbox opts]
      :fhirpath [autocomplete
                 (assoc-in opts [:handlers :on-ctrl-enter] #(dispatch [::c/eval-view-definition-data]))]
      [string-input
       (assoc-in opts [:handlers :on-ctrl-enter] #(dispatch [::c/eval-view-definition-data]))])))

(defn column-name-input
  [& {:keys [input-id
             autoFocus]
      {:keys [on-shift-enter]} :handlers}]
  (let [value @(subscribe [::m/input-value input-id])
        error? @(subscribe [::m/input-error input-id])]
    [input-component/input {:defaultValue name
                            :placeholder "name"
                            :value value
                            :autoFocus autoFocus
                            :onBlur #(do
                                       (mapv
                                         (fn [one]
                                           (.setAttribute one "draggable" true))
                                         (array-seq (.querySelectorAll js/document ".ant-tree-treenode-draggable")))
                                       (dispatch [::c/set-input-focus nil])
                                       (dispatch [::c/eval-view-definition-data]))
                            :onFocus
                            (fn [_]
                              (mapv
                                (fn [one]
                                  (.setAttribute one "draggable" false))
                                (array-seq (.querySelectorAll js/document ".ant-tree-treenode-draggable"))))

                            :classNames {:input
                                         (if (and (str/blank? name) error?)
                                           "default-input red-input"
                                           "default-input")}
                            :style       {:font-style "normal"}
                            :onKeyUp (fn [event]
                                         (when (and (= "Enter" (.-key event))
                                                    (.-shiftKey event))
                                           (on-shift-enter event)))
                            :onChange #(set-input-value input-id (-> % .-target .-value))}]))

;;;; Settings

(defn settings-base-form [title props items]
  [:> ConfigProvider {:theme {:components {:Form {:itemMarginBottom 8}}}}
   [:> Form (medley/deep-merge
             {:labelCol   {:span 6},
              :layout     :horizontal
              :style      {:width 472} ;; default modal width - 24 * 2 paddings
              :colon      false
              :labelAlign :left}
             props)
    [:> Typography.Title {:level 4 :style {:margin-top 0}} title]
    items
    [:div {:style {:textAlign :right}}
     [:> Space
      [button/button "Close" {:size     "small"
                              :onClick  #(toggle-popover nil nil)
                              :type     "default"
                              :htmlType "reset"}]
      [button/button "Save" {:size     "small"
                             :type     "primary"
                             :htmlType "submit"}]]]]])

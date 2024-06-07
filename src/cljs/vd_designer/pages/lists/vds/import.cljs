(ns vd-designer.pages.lists.vds.import
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Modal Upload]]
            [clojure.string :as str]
            [re-frame.core :refer [dispatch subscribe]]
            [vd-designer.components.monaco-editor :as monaco]
            [reagent.core :as r]
            [vd-designer.components.tabs :as tabs]
            [vd-designer.pages.lists.vds.controller :as c]
            [vd-designer.pages.lists.vds.model :as m]
            [vd-designer.utils.yaml :refer [str->yaml]]))

(def supported-extensions
  [".json" ".yaml" ".yml"])

(defn- get-file-extension [file]
  (-> (.-name file)
      (str/replace #"(.+?)(?=\.[^\.]+$)" "")))

(defn- before-upload
  "Validates that the file has a valid extension, and adds it to db to be imported"
  [file _]
  (let [extension (get-file-extension file)]
    (if-not (reduce #(or %1 (= extension %2)) false supported-extensions)
      (do
        (dispatch [::c/on-import-error (str "Import of " extension " files not supported")])
        Upload.LIST_IGNORE)
      (do
        (dispatch [::c/add-import-file file])
        ;; false here to prevent auto-upload via xhr
        false))))

(defn parse-vd [^String content]
  (js->clj (str->yaml content) :keywordize-keys true))

(defn- import-vd [{:keys [file text]}]
  (cond
    file
    (-> (.text file)
        (.then  #(dispatch [::c/import-success (parse-vd %)]))
        (.catch #(dispatch [::c/on-import-error
                            (str "Cannot import " (.-name file) ". " %)])))

    text
    (try
      (dispatch [::c/import-success (parse-vd text)])
      (catch js/Error e
        (dispatch [::c/on-import-error (str "Cannot import " e)])))))

(defn upload-file []
  [:> Upload.Dragger {:accept        (str/join ", " supported-extensions)
                      :maxCount      1
                      :before-upload before-upload}
   [:p {:className "ant-upload-drag-icon"} (r/create-element icons/InboxOutlined)]
   [:p {:className "ant-upload-text"} "Choose a file or drag it here"]
   [:p {:className "ant-upload-hint"} "Allowed tile types: *.json or *.yaml"]])

(defn upload-text []
  (let [text-value (:text @(subscribe [::m/vd-import]))]
    [:div {:style {:height "185px"}}
     [monaco/monaco {:id       "upload-text"
                     :onMount  (fn [editor _monaco]
                                 (.focus editor))
                     :value    text-value
                     :onChange #(dispatch [::c/change-upload-text %])
                     :options  {:readOnly false}}]]))

(defn import-modal []
  (let [vd-import @(subscribe [::m/vd-import])]
    [:> Modal {:open             (boolean vd-import) #_true
               :title            "Import ViewDefinition"
               :ok-text          "Import"
               :on-ok            #(import-vd vd-import)
               :ok-button-props  {:disabled (and (nil? (:text vd-import)) (nil? (:file vd-import)))}
               :on-cancel        #(dispatch [::c/close-import-modal])
               :destroy-on-close true}
     [tabs/tabs
      {:animated true
       :onChange #(dispatch [::c/remove-import-content])
       :items [(tabs/tab-item {:destroyInactiveTabPane true
                               :key "text" :label "Import from text"
                               :children [upload-text]})
               (tabs/tab-item {:destroyInactiveTabPane true
                               :key "file" :label "Import file"
                               :children [upload-file]})]}]]))

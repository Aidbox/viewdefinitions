(ns vd-designer.pages.vd-list.import
  (:require ["@ant-design/icons" :as icons]
            [antd :refer [Modal Upload]]
            [clojure.string :as str]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.pages.vd-list.controller :as c]
            [vd-designer.pages.vd-list.model :as m]
            [vd-designer.utils.yaml :refer [str->yaml]]))

(def supported-extensions
  [".json" ".yaml"])

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

(defn- parse-vd-file [file content]
  (let [extension (get-file-extension file)]
    (case extension
      ".json" (js->clj (.parse js/JSON content) :keywordize-keys true)
      ".yaml" (js->clj (str->yaml      content) :keywordize-keys true))))

(defn- import-vd-file [file]
  (-> (.text file)
      (.then  #(dispatch [::c/import-success (parse-vd-file file %)]))
      (.catch #(dispatch [::c/on-import-error
                          (str "Cannot import " (.-name file) ". " %)]))))

(defn import-modal []
  (let [vd-import @(subscribe [::m/vd-import])
        file       (:file vd-import)]
    [:> Modal {:open             (boolean vd-import)
               :title            "Import ViewDefinition"
               :ok-text          "Import"
               :on-ok            #(import-vd-file file)
               :ok-button-props  {:disabled (nil? file)}
               :on-cancel        #(dispatch [::c/close-import-modal])
               :destroy-on-close true}
     [:> Upload.Dragger {:accept        (str/join ", " supported-extensions)
                         :maxCount      1
                         :before-upload before-upload}
      [:p {:className "ant-upload-drag-icon"} (r/create-element icons/InboxOutlined)]
      [:p {:className "ant-upload-text"} "Choose a file or drag it here"]
      [:p {:className "ant-upload-hint"} "Allowed tile types: *.json or *.yaml"]]]))

(ns vd-designer.pages.form.model
  (:require
   [re-frame.core :refer [reg-sub]]
   [vd-designer.components.select :as select-component]
   [vd-designer.pages.form.form.uuid-decoration :as uuid-decoration]))

(reg-sub
 ::view-definition-data
 (fn [db _]
   (::resource-data db)))

(reg-sub
 ::current-vd
 (fn [db _]
   (:current-vd db)))

(reg-sub
 ::current-vd-nil?
 :<- [::current-vd]
 (fn [current-vd _]
   (nil? current-vd)))

(def tree-root-keys
  #{[:name] [:resource] [:constant] [:where] [:select]})

(def do-not-expand-tree-keys
  #{[:constant] [:where]})

(reg-sub
 ::current-tree-expanded-nodes
 (fn [db _]
   (:current-tree-expanded-nodes db)))

(reg-sub
 ::get-all-supported-resources
 (fn [db [_]]
   (select-component/options-from-vec (get db :resources))))

(reg-sub
 ::current-vd-error
 (fn [db _]
   (::current-vd-error db)))

(reg-sub
 ::language
 (fn [db _]
   (::language db)))

(reg-sub
 ::sql
 (fn [db _]
   (-> db ::resource-data :sql)))

(reg-sub
 ::eval-loading
 (fn [db _]
   (-> db ::eval-loading)))

(reg-sub
 ::save-loading
 (fn [db _]
   (-> db ::save-loading)))

(reg-sub
 ::settings-opened-id
 (fn [db _]
   (::settings-opened-id db)))

(reg-sub
 ::empty-inputs?
 (fn [db _]
   (::empty-inputs? db)))

(reg-sub
 ::children
 (fn [db [_ path]]
   (get-in db (into [:current-vd]
                    (uuid-decoration/uuid->idx path (:current-vd db))))))

(reg-sub
 ::autocomplete-options
 (fn [db _]
   (::autocomplete-options db)))

(reg-sub
 ::input-focus
 (fn [db _]
   (::input-focus db)))

(defn import-synthetic-data-notebook-url [server-url]
 (str server-url "/ui/console#/notebooks/explore"
      "?path=https%3A%2F%2Faidbox.app%2FPublishedNotebook%2F45025aba-49ea-46e0-adce-2db6da282599"))

(reg-sub
 ::name-input
 :<- [::current-vd]
 (fn [current-vd _]
  (:name current-vd)))

(reg-sub
 ::resource-input
 :<- [::current-vd]
 (fn [current-vd _]
  (:resource current-vd)))

(reg-sub
 ::tree-inputs
 :-> ::tree-inputs)

(reg-sub
 ::input-value
 :<- [::tree-inputs]
 (fn [inputs [_ input-id]]
   (-> inputs
       (get input-id)
       (get :value))))

(reg-sub
 ::input-error
 :<- [::tree-inputs]
 (fn [inputs [_ input-id]]
   (-> inputs
       (get input-id)
       (get :error))))

(reg-sub
 ::input-type
 :<- [::tree-inputs]
 (fn [inputs [_ input-id]]
   (-> inputs
       (get input-id)
       (get :type))))

(reg-sub 
 ::view-definition-code
 :-> ::view-definition-code)

(reg-sub
 ::left-panel-active-tab
 :-> ::left-panel-active-tab)

(reg-sub
 ::code-dirty?
 :-> ::code-dirty?)

(reg-sub
 ::editor-id
 :-> ::editor-id)

(reg-sub
 ::view-definition-code-valid?
 :<- [::view-definition-code]
 (fn [vd-code _]
   ()))

(reg-sub
 ::view-definition-jsonschema
 :-> ::view-definition-jsonschema)

(reg-sub
 ::view-definition-jsonschema-json
 :<- [::view-definition-jsonschema]
 (fn [vd-jsonschema _]
   (clj->js vd-jsonschema)))


(def editor-error-severity 8)
(def editor-warning-severity 4)
(def editor-info-severity 2)
(def editor-hint-severity 1)

(reg-sub
 ::code-validation-severity
 :-> ::code-validation-severity)
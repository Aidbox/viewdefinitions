(ns vd-designer.pages.vd-form.model
  (:require [re-frame.core :refer [reg-sub]]
            [vd-designer.components.select :refer [options-from-vec]]))

(reg-sub
 ::view-definition-data
 (fn [db _]
   (::resource-data db)))

(reg-sub
 ::current-vd
 (fn [db _]
   (:current-vd db)))

(def tree-root-keys
  #{[:name] [:resource] [:constant] [:where] [:select]})

(reg-sub
 ::current-tree-expanded-nodes
 (fn [db _]
   (:current-tree-expanded-nodes db)))

(reg-sub
 ::get-all-supported-resources
 (fn [db [_]]
   (options-from-vec (get db :resources))))

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
 ::draggable-node
 (fn [db _]
   (::draggable-node db)))

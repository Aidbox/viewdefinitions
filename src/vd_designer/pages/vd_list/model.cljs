(ns vd-designer.pages.vd-list.model
  (:require
   [medley.core :as medley]
   [re-frame.core :refer [reg-sub]]
   [vd-designer.pages.vd-list.controller :as-alias c]))

(reg-sub
 ::view-defs
 (fn [db _]
   (:view-definitions db)))

(reg-sub
 ::view-defs-loading?
 (fn [db _]
   (::view-definitions-loading db)))

(reg-sub
 ::filter-phrase
 (fn [db _]
   (::c/filter-phrase db)))

(reg-sub
 ::delete-fail
 (fn [db _]
   (::delete-fail db)))

(defn vd-by-id [vds id]
  (medley/find-first (fn [entry] (= id (-> entry :resource :id))) vds))

(reg-sub
 ::vd-name-by-id
 (fn [db [_ id]]
   (-> (vd-by-id (:view-definitions db) id)
       :resource
       :name)))

(reg-sub
 ::vd-import
 (fn [db _]
   (:vd-import db)))

(ns vd-designer.pages.lists.settings.model
  (:require
   [re-frame.core :refer [reg-sub]]
   [vd-designer.pages.lists.settings.controller :as-alias c]))

(defn sandbox? [server]
  (true? (:sandbox server)))

(defn portal-boxes-map [db]
  (->> db :cfg/fhir-servers :user/servers :portal-boxes))

(defn sandboxes [db]
  (filterv sandbox? (vals (portal-boxes-map db))))

(reg-sub
 ::portal-boxes-map
 (fn [db _]
   (portal-boxes-map db)))

(defn custom-servers-map [db]
  (->> db :cfg/fhir-servers :user/servers :custom-servers))

(reg-sub
 ::custom-servers-map
 (fn [db _]
   (custom-servers-map db)))

(reg-sub
 ::custom-servers-vec
 (fn [db _]
   (vals (custom-servers-map db))))

(defn portal-boxes-groupped-project [db]
  (or (->> db portal-boxes-map vals
           ;; sandbox is [nil {..}]
           (group-by #(-> % :project :name)))
      []))

(reg-sub
 ::portal-boxes-groupped-project
 (fn [db _]
   (portal-boxes-groupped-project db)))

(reg-sub
 ::request-sent-by
 (fn [db _]
   (::c/request-sent-by db)))

(defn used-server-name [db]
  (-> db :cfg/fhir-servers :used-server-name))

(reg-sub
 ::used-server-name
 (fn [db _]
   (used-server-name db)))

(reg-sub
 ::connect-error
 (fn [db _]
   (:cfg/connect-error db)))

(defn current-server
  ([portal-boxes custom-servers used-server-name]
   (or (get portal-boxes used-server-name)
       (get custom-servers used-server-name)))
  ([db]
   (let [custom-servers (custom-servers-map db)
         portal-boxes (portal-boxes-map db)
         used-server-name (used-server-name db)]
     (current-server portal-boxes custom-servers used-server-name))))

(reg-sub
 ::current-server
 :<- [::portal-boxes-map]
 :<- [::custom-servers-map]
 :<- [::used-server-name]
 (fn [[portal-boxes custom-servers used-server-name] _]
   (current-server portal-boxes custom-servers used-server-name)))

(defn in-sandbox? [db]
  (get (sandboxes db)
       (used-server-name db)))

(reg-sub
 ::sandbox?
 :<- [::current-server]
 (fn [current-server _]
   (sandbox? current-server)))

(reg-sub
 ::current-server-url
 :<- [::current-server]
 (fn [current-server _]
   (:box-url current-server)))

(reg-sub
 ::server-form-opened
 :-> ::server-form-opened)

(defn unknown-server-selected? [db]
  (not (current-server db)))

(defn first-sandbox-server-name [db]
  (->> (sandboxes db)
       first
       :server-name))

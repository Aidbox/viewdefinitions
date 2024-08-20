(ns vd-designer.pages.lists.settings.model
  (:require
   [re-frame.core :refer [reg-sub]]
   [vd-designer.pages.lists.settings.controller :as-alias c]))

(defn sandbox? [server]
  (true? (:sandbox server)))

(defn portal-boxes-raw [db]
  (->> db :cfg/fhir-servers :user/servers :portal-boxes))

(defn sandboxes [db]
  (filterv sandbox? (vals (portal-boxes-raw db))))

(reg-sub
 ::portal-boxes-raw
 (fn [db _]
   (portal-boxes-raw db)))

(defn custom-servers-raw [db]
  (->> db :cfg/fhir-servers :user/servers :custom-servers))

(reg-sub
 ::custom-servers-raw
 (fn [db _]
   (custom-servers-raw db)))

(defn portal-boxes [db]
  (or (->> db portal-boxes-raw vals
           (group-by #(-> % :project :name)))
      []))

(reg-sub
 ::portal-boxes
 (fn [db _]
   (portal-boxes db)))

(defn custom-servers [db]
  (or (->> db custom-servers-raw vals)
      []))

(reg-sub
 ::custom-servers
 (fn [db _]
   (custom-servers db)))

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
   (let [custom-servers (custom-servers db)
         portal-boxes (portal-boxes db)
         used-server-name (used-server-name db)]
     (println "p boxes " portal-boxes)
     (println "u ser name " used-server-name)
     (current-server portal-boxes custom-servers used-server-name))))

(reg-sub
 ::current-server
 :<- [::portal-boxes-raw]
 :<- [::custom-servers-raw]
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

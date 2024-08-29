(ns vd-designer.pages.lists.settings.model
  (:require
   [re-frame.core :refer [reg-sub]]
   [vd-designer.servers :as servers]
   [vd-designer.pages.lists.settings.controller :as-alias c]))

(defn sandbox? [server]
  (true? (:sandbox server)))

(defn portal-servers-map [db]
  (->> db :cfg/fhir-servers :portal-servers))

(defn public-servers [db]
  (->> db :cfg/fhir-servers :public-servers))

(reg-sub
 ::portal-servers
 (fn [db _]
   (portal-servers-map db)))

(defn custom-servers [db]
  (->> db :cfg/fhir-servers  :custom-servers))

(reg-sub
 ::custom-servers
 (fn [db _]
   (custom-servers db)))

(reg-sub
 ::request-sent-by
 (fn [db _]
   (::c/request-sent-by db)))

(defn chosen-server [db]
  (-> db :cfg/fhir-servers :chosen-server))

(reg-sub
 ::chosen-server
 (fn [db _]
   (chosen-server db)))

(reg-sub
 ::connect-error
 (fn [db _]
   (:cfg/connect-error db)))

(def chosen-server-config servers/active-server)

(reg-sub
 ::chosen-server-config
 (fn [db _]
   (chosen-server-config db)))

(reg-sub
 ::public-servers
 (fn [db _]
   (public-servers db)))

(defn in-sandbox? [db]
  (get (public-servers db)
       (chosen-server db)))

(reg-sub
 ::sandbox?
 :<- [::chosen-server-config]
 (fn [current-server _]
   (sandbox? current-server)))

(reg-sub
 ::current-server-url
 :<- [::chosen-server-config]
 (fn [current-server _]
   (:box-url current-server)))

(reg-sub
 ::update-server-form-opened
 :-> ::update-server-form-opened)

(reg-sub
 ::add-server-form-opened
 :-> ::add-server-form-opened)

(defn unknown-server-selected? [db]
  (not (chosen-server-config db)))

(defn first-public-server-name [db]
  (->> (public-servers db)
       first
       :server-name))

(reg-sub
 ::editable-server
 :-> ::editable-server)

(defn server->ant-form-format [server]
  (->> (update server :headers
               (fn [headers]
                 (mapv
                  (fn [[header-name header-value]]
                    {:name header-name
                     :value header-value})
                  headers)))
       (map (fn [[k v]] [(name k) v]))
       (into {})))

(reg-sub
 ::editable-server-ant
 :<- [::editable-server]
 (fn [editable-server _]
   (when editable-server
     (server->ant-form-format editable-server))))

(ns vd-designer.pages.lists.settings.model
  (:require
   [re-frame.core :refer [reg-sub]]
   [vd-designer.pages.lists.settings.controller :as-alias c]))

(defn user-servers-raw [db]
  (->> db :cfg/fhir-servers :user/servers))

(reg-sub
 ::user-servers-raw
 (fn [db _]
   (user-servers-raw db)))

(reg-sub
 ::user-servers
 (fn [db _]
   (or (->> db :cfg/fhir-servers :user/servers vals
            (group-by #(-> % :project :name)))
       [])))

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

(reg-sub
 ::current-server
 :<- [::user-servers-raw]
 :<- [::used-server-name]
 (fn [[user-servers used-server-name] _]
  (get user-servers used-server-name)))

(defn sandbox? [server]
 ;; TODO: may be a reason of bug one day. explicitly set sandbox = true at backend
 (not (:project server)))

(defn in-sandbox? [db]
  (get (user-servers-raw db)
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

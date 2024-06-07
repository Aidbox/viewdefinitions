(ns vd-designer.pages.lists.settings.model
  (:require
   [re-frame.core :refer [reg-sub]]
   [vd-designer.pages.lists.settings.controller :as-alias c]))

(reg-sub
 ::fhir-server-config
 (fn [db _]
   (:fhir-server db)))

(reg-sub
 ::user-servers
 (fn [db _]
   (or (->> db :cfg/fhir-servers :user/servers vals
            (group-by #(-> % :project :name)))
       [])))

(reg-sub
 ::original-server
 (fn [db _]
   (:original-server db)))

(reg-sub
 ::request-sent-by
 (fn [db _]
   (::c/request-sent-by db)))

(reg-sub
 ::used-server-name
 (fn [db _]
   (-> db :cfg/fhir-servers :used-server-name)))

(reg-sub
 ::connect-error
 (fn [db _]
   (:cfg/connect-error db)))

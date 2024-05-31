(ns vd-designer.pages.settings.model
  (:require
    [re-frame.core :refer [reg-sub]]
    [vd-designer.pages.settings.controller :as-alias c]))

(reg-sub
  ::fhir-server-config
  (fn [db _]
    (:fhir-server db)))

(reg-sub
  ::sandbox-servers
  (fn [db _]
    (or (-> db :cfg/fhir-servers :sandbox/servers vals)
        [])))

(reg-sub
  ::user-servers
  (fn [db _]
    (or (-> db :cfg/fhir-servers :user/servers vals)
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

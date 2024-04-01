(ns vd-designer.pages.settings.model
  (:require
    [re-frame.core :refer [reg-sub]]
    [vd-designer.pages.settings.controller :as-alias c]))

(reg-sub
  ::fhir-server-config
  (fn [db _]
    (:fhir-server db)))

(reg-sub
  ::existing-servers
  (fn [db _]
    (-> db :cfg/fhir-servers :servers vals)))

(reg-sub
  ::edit-server
  (fn [db _]
    (:edit-server db)))

(reg-sub
  ::request-sent
  (fn [db _]
    (::c/request-sent db)))

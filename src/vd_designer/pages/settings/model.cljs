(ns vd-designer.pages.settings.model
  (:require
    [re-frame.core :refer [reg-sub]]))

(reg-sub
  ::fhir-server-config
  (fn [db _]
    (:fhir-server db)))

(reg-sub
  ::edit-server
  (fn [db _]
    (:edit-server db)))


(ns vd-designer.pages.fhir-server-config.model
  (:require
    [re-frame.core :refer [reg-sub]]))

(reg-sub
  ::fhir-server-config
  (fn [db _]
    (:fhir-server db)))

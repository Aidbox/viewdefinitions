(ns vd-designer.pages.settings.model
  (:require
    [vd-designer.http.fhir-server :as fhir-server]
    [re-frame.core :refer [reg-sub]]))

(reg-sub
  ::fhir-server-config
  (fn [db _]
    (fhir-server/active-server db)))

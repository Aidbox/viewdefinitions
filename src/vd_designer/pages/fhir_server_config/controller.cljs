(ns vd-designer.pages.fhir-server-config.controller
  (:require
    [ajax.core :as ajax]
    [re-frame.core :refer [reg-event-fx reg-event-db]]
    [vd-designer.pages.vd-list.controller :as vd-list.controller]))

(def identifier ::main)

(reg-event-fx
  identifier
  (fn [{db :db} [_ phase]]
    {:db db}))

(reg-event-fx
  ::reset-fhir-server-config
  (fn [{db :db} [_ server-name base-url token]]
    {:db         (assoc db :fhir-server {:server-name server-name
                                         :base-url    base-url
                                         :token       token})
     :http-xhrio {:method           :get
                  ;; TODO: build uri via https://github.com/lambdaisland/uri
                  :uri              (str base-url "/fhir/ViewDefinition")
                  :timeout          8000
                  :with-credentials true
                  :headers          {:Authorization token}
                  :response-format  (ajax/json-response-format {:keywords? true})
                  ;; TODO: use own effect
                  :on-success       [::vd-list.controller/got-view-definitions]
                  ;; TODO: add case on failure
                  }}))

;; TODO: save to local storage if connected successfully
;; TODO: save to backend if connected successfully

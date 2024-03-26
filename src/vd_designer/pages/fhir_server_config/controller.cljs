(ns vd-designer.pages.fhir-server-config.controller
  (:require
    [ajax.core :as ajax]
    [lambdaisland.uri :as uri]
    [re-frame.core :refer [reg-event-db reg-event-fx]]
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
                  :uri              (-> (uri/uri base-url)
                                        (assoc :path "/fhir/ViewDefinition")
                                        uri/uri-str)
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

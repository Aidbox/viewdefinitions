(ns vd-designer.aidbox
  (:require [martian.core :as martian]
            [vd-designer.clients.portal :as portal]))

(defn hack-view-definitions-meta [view-definitions]
  (update-in view-definitions
             [:body :entry]
             (fn [entry]
               (mapv
                 (fn [view-definition]
                   (if (-> view-definition :resource :meta :createdAt)
                     (update-in view-definition [:resource :meta] dissoc :createdAt)
                     view-definition))
                 entry))))

(defn hack-view-definition-meta [view-definition]
  (if (-> view-definition :body :meta :createdAt)
    (update-in view-definition [:body :meta] dissoc :createdAt)
    view-definition))

(defn connect
  [{:keys [box-url fhir-server-headers]}]
  (hack-view-definitions-meta
    @(martian/response-for (portal/client box-url)
                           :connect
                           fhir-server-headers)))

(defn get-view-definition
  [{:keys [box-url request fhir-server-headers]}]
  (let [{:keys [vd-id]} (:query-params request)]
    (hack-view-definition-meta @(martian/response-for (portal/client box-url)
                                                      :get-view-definition
                                                      (merge {:vd-id vd-id}
                                                             fhir-server-headers)))))

(defn eval-view-definition
  [{:keys [box-url request fhir-server-headers]}]
  (let [{:keys [vd]} (:body-params request)]
    @(martian/response-for (portal/client box-url)
                           :rpc
                           (merge {:method 'sof/eval-view
                                   :params {:limit 100
                                            :view  vd}}
                                  fhir-server-headers))))

(defn save-view-definition
  [{:keys [box-url request fhir-server-headers]}]
  (let [{:keys [vd vd-id]} (:body-params request)]
    @(martian/response-for (portal/client box-url)
                           (if vd-id :update-view-definition :create-view-definition)
                           (merge {:body  vd
                                   :vd-id vd-id}
                                  fhir-server-headers))))

(defn delete-view-definition
  [{:keys [box-url request fhir-server-headers]}]
  (let [{:keys [vd-id]} (:body-params request)]
    @(martian/response-for (portal/client box-url)
                           :delete-view-definition
                           (merge {:vd-id vd-id}
                                  fhir-server-headers))))

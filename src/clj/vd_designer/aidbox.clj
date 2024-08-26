(ns vd-designer.aidbox
  (:require
   [clojure.string :as str]
   [martian.core :as martian]
   [ring.util.http-response :as http-response]
   [vd-designer.clients.aidbox :as aidbox-client]))

(defn hack-view-definitions-meta [view-definitions-response]
  (update-in view-definitions-response
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
  (let [response @(martian/response-for (aidbox-client/aidbox-client box-url)
                                        :connect
                                        fhir-server-headers)]
    (if (= 503 (:status response))
      {:status 400
       :body {:error "aidbox.app is down. Try again in few minutes."}}
      (cond-> response
        (:body response)
        (hack-view-definitions-meta)))))

(defn get-view-definition
  [{:keys [box-url request fhir-server-headers]}]
  (let [{:keys [vd-id]} (:query-params request)]
    (hack-view-definition-meta @(martian/response-for (aidbox-client/aidbox-client box-url)
                                                      :get-view-definition
                                                      (merge {:vd-id vd-id}
                                                             fhir-server-headers)))))

 (defn eval-view-definition
  [{:keys [box-url request fhir-server-headers]}]
  (let [{:keys [vd]} (:body-params request)
        ;; FIXME: move
        vd (cond-> vd (:resource vd)
             (update :resource str/lower-case))]
    @(martian/response-for
         (aidbox-client/aidbox-client box-url)
         :rpc
         (merge {:method 'sof/eval-view
                 :params {:limit 100
                          :view  vd}}
                fhir-server-headers))))

(defn save-view-definition
  [{:keys [box-url request fhir-server-headers]}]
  (let [{:keys [vd vd-id]} (:body-params request)]
    @(martian/response-for (aidbox-client/aidbox-client box-url)
                           (if vd-id :update-view-definition :create-view-definition)
                           (merge {:body  vd
                                   :vd-id vd-id}
                                  fhir-server-headers))))

(defn delete-view-definition
  [{:keys [box-url request fhir-server-headers]}]
  (let [{:keys [vd-id]} (:body-params request)]
    @(martian/response-for (aidbox-client/aidbox-client box-url)
                           :delete-view-definition
                           (merge {:vd-id vd-id}
                                  fhir-server-headers))))

(defn get-metadata
  [request]
  (let [box-url (-> request :request :query-params :box-url)
        resp @(martian/response-for
                (aidbox-client/aidbox-client box-url)
                :metadata
                {:box-url box-url})]
    (http-response/ok
      (:body resp))))

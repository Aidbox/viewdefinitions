(ns viewdef-designer.utils.http
  (:require [re-frame.core :as re-frame :refer [reg-event-fx subscribe reg-sub dispatch reg-event-db]]
            [day8.re-frame.http-fx]
            [ajax.core :as ajax]
    ; register pages
            [viewdef-designer.routes :as routes]))

(reg-event-fx
  ::eval-view-definition
  (fn [{:keys [db]} _]
      {:db         (assoc db :loading true)
       :http-xhrio {:method           :post
                    :uri             "https://viewdefs1.aidbox.app/rpc"
                    ;:uri              "https://viewdefs1.aidbox.app/fhir"
                    :timeout          8000
                    :with-credentials true
                    :headers          {:Authorization "Basic dmlldy1kZWZpbml0aW9uOnNlY3JldA=="}
                    :response-format  (ajax/json-response-format {:keywords? true})
                    :on-success       [::got-view-definitions]
                    ;:on-failure      [:bad-http-result]
                    :params           {:method 'sof/eval-view
                                       :params {:view
                                                {:name         "patient_view",
                                                 :select       [{:column [{:name "id", :path "id"}
                                                                          {:name "dob", :path "birthDate"}
                                                                          {:name "gender", :path "gender"}]}],
                                                 :status       "draft", :resource "Patient",
                                                 :description  "Patient flat view",
                                                 :id           "31d40e19-771c-477b-b19a-f54144ef19b5",
                                                 :resourceType "ViewDefinition"}}}
                    :format           (ajax/json-request-format)}}))

(reg-event-db
  ::got-view-definitions
  (fn [db [_ resp]]
      (->> resp :result :data
           (take 100)                                       ;; TODO: set SQL limit instead
           (assoc db :view-definition/data))))

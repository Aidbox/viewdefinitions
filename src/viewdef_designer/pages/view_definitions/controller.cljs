(ns viewdef-designer.pages.view-definitions.controller
  (:require
   [ajax.core :as ajax]
   [re-frame.core :refer [reg-event-fx reg-event-db]]))

(def identifier ::main)

(reg-event-fx
 identifier
 (fn [{db :db} [_ phase]]
   {:fx (cond-> []
          (= :init phase)
          (conj [:dispatch [::get-view-definitions]])
          #_#_(= :deinit phase)
          (conj [:dispatch [::deinit]]))}))

(reg-event-db
 ::got-view-definitions
 (fn [db [_ result]]
   (assoc db
          :view-definitions result
          :loading false)))

(reg-event-fx
 ::get-view-definitions
 (fn [{:keys [db]} _]
   {:db (assoc db :loading true)
    :http-xhrio {:method          :get
                 :uri             "https://viewdefs1.aidbox.app/fhir/ViewDefinition"
                 :timeout         8000
                 :with-credentials true
                 :headers  {:Authorization
                            "Basic dmlldy1kZWZpbml0aW9uOnNlY3JldA=="}
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [::got-view-definitions]
                 :on-failure      [:bad-http-result]}}))
(ns vd-designer.pages.vd-form.controller
  (:require [re-frame.core :refer [reg-event-fx reg-event-db]]
            [vd-designer.pages.vd-form.model :as m]
            [ajax.core :as ajax]))

(def identifier ::main)

(reg-event-fx
 identifier
 (fn [{db :db} [_ phase]]
   (let [vd-id (-> db :route-params :id)]
     (if (= :init phase)
       {:db db
        :fx (cond-> []
              (and (= :init phase) vd-id)
              (conj
               [:dispatch [::get-view-definition (-> db :route-params :id)]]))}
       {:db (dissoc db :current-vd)}))))

(reg-event-fx
 ::get-view-definition
 (fn [{:keys [db]} [_ vd-id]]
   {:db (assoc db :loading true)
    :http-xhrio {:method          :get
                 :uri             (str "https://viewdefs1.aidbox.app/fhir/ViewDefinition/" vd-id)
                 :timeout         8000
                 :with-credentials true
                 :headers  {:Authorization
                            "Basic dmlldy1kZWZpbml0aW9uOnNlY3JldA=="}
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [::choose-vd]
                 :on-failure      [:bad-http-result]}}))

(reg-event-fx
 ::choose-vd
 (fn [{:keys [db]} [_ vd-id]]
   {:fx [[:dispatch [::eval-view-definition-data]]]
    :db (assoc db :current-vd vd-id)}))

(reg-event-fx
  ::eval-view-definition-data
  (fn [{:keys [db]} _]
    (let [view-definition (:current-vd db)]
      {:db         (assoc db :loading true)
       :http-xhrio {:method           :post
                    :uri             "https://viewdefs1.aidbox.app/rpc"
                    :timeout          8000
                    :with-credentials true
                    :headers          {:Authorization "Basic dmlldy1kZWZpbml0aW9uOnNlY3JldA=="}
                    :response-format  (ajax/json-response-format {:keywords? true})
                    :on-success       [::on-eval-view-definitions-success]
                    ;:on-failure      [:bad-http-result]
                    :params           {:method 'sof/eval-view
                                       :params {:limit 100
                                                :view view-definition}}
                    :format           (ajax/json-request-format)}})))

(reg-event-db
 ::on-eval-view-definitions-success
 (fn [db [_ result]]
   (assoc db ::m/resource-data (:result result))))

(reg-event-db
 ::change-input-value
 (fn [db [_ path value]]
   (assoc-in db (into [:current-vd] path) value)))

(reg-event-db
 ::add-element-into-array
 (fn [db [_ path]]
   (update-in db (into [:current-vd] path) conj {})))

(reg-event-db
 ::add-element-into-map
 (fn [db [_ path k default-value]]
   (update-in db (into [:current-vd] path) assoc k (or default-value ""))))

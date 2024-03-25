(ns viewdef-designer.pages.view-definition.http
  (:require [re-frame.core :as re-frame :refer [reg-event-fx subscribe reg-sub dispatch reg-event-db]]
            [day8.re-frame.http-fx]
            [viewdef-designer.pages.view-definition.model :as model]
            [ajax.core :as ajax]))

(def vd-mock
  {:description "Observation flat view",
   :name "obs_view",
   :resource "Observation",
   :select [{:column [{:name "id", :path "id"}
                      {:name "pid", :path "subject.id"}]}],
   :status "draft"})

(reg-event-fx
  ::eval-view-definition
  (fn [{:keys [db]} _]
    (let [view-definition vd-mock]
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
   (assoc db ::model/data (:result result))))
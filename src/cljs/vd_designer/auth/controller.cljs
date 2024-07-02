(ns vd-designer.auth.controller
  (:require [ajax.core :as ajax]
            [re-frame.core :refer [inject-cofx reg-cofx reg-event-fx reg-fx]]
            [vd-designer.http.backend :refer [authorization-header]]
            [vd-designer.utils.event :as u]
            [vd-designer.utils.http :as http-utils]))

(reg-fx
 :set-authentication
 (fn [v]
   (.setItem (.-localStorage js/window)
             :authentication
             v)))

(reg-fx
 :delete-authentication
 (fn []
   (.removeItem (.-localStorage js/window) :authentication)))

(reg-event-fx
 ::store-authentication
 (fn [{:keys [db]}
      [_ {:keys [authentication error]}]]
   (cond
     error {:notification-error error}
     authentication {:set-authentication authentication
                     :db                 (assoc db :authorized? true)
                     :message-success    "Authenticated"})))

(reg-cofx
 :get-authentication-token
 (fn [coeffects]
   (assoc coeffects
          :authentication-token
          (js->clj (.getItem js/localStorage :authentication)))))

(reg-event-fx
 ::sign-out
 (fn [{:keys [db]} _]
   {:delete-authentication nil
    :db                    (assoc db :authorized? false)
    :navigate              [:home]}))

(reg-event-fx
 ::with-authentication
 [(inject-cofx :get-authentication-token)]
 (fn [{:keys [authentication-token]} [_ token->http-xhrio-opts]]
   {:http-xhrio
    (if (nil? authentication-token)
      (token->http-xhrio-opts nil)
      {:method           :get
       :timeout          8000
       :uri              "/api/auth/check"
       :with-credentials true
       :headers          (authorization-header authentication-token)
       :format           (ajax/json-request-format)
       :response-format  (ajax/raw-response-format)
       :on-success       [::http-utils/request (token->http-xhrio-opts authentication-token)]
       :on-failure       [::authentication-failed]})}))

(reg-event-fx
 ::authentication-failed
 (fn [_ [_ result]]
   {:notification-error (u/response->error result)
    :fx                 [[:dispatch [::sign-out nil]]]}))

(ns vd-designer.auth.controller
  (:require [ajax.core :as ajax]
            [re-frame.core :refer [inject-cofx reg-cofx reg-event-fx reg-fx]]
            [vd-designer.http.backend :refer [authorization-header]]
            [vd-designer.utils.event :as u]))

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
    :message-success       "Signed out"
    ;; FIXME: this'll cause cyclic dependency
    ;; :dispatch              [::settings-controller/fetch-user-servers]
    }))

(reg-event-fx
 :with-authentication
 [(inject-cofx :get-authentication-token)]
  (fn [{:keys [authentication-token]} [_ effect]]
    (if (nil? authentication-token)
      (let [[fx handler] (effect nil)]
        {fx handler})
      {:http-xhrio {:method           :get
                    :uri              "/api/auth/check"
                    :with-credentials true
                    :headers          (authorization-header authentication-token)
                    :format           (ajax/json-request-format)
                    :response-format  (ajax/json-response-format {:keywords? true})
                    :on-success       (effect authentication-token)
                    :on-failure       [::authentication-failed]}})))

(reg-event-fx
  ::authentication-failed
  (fn [_ [_ result]]
    {:notification-error (str "Authentication failed: " (u/response->error result))
     :fx                 [[:dispatch [::sign-out nil]]]}))

(ns vd-designer.auth.controller
  (:require
    [vd-designer.pages.lists.settings.controller :as settings-controller]
    [re-frame.core :refer [reg-event-fx reg-cofx reg-fx]]))

(reg-fx
 :set-authentication
 (fn [v]
   (.setItem (.-localStorage js/window)
              ;; TODO: keyword or string?
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
 (fn [{:keys [db]} [_ _]]
   {:delete-authentication nil
    :db                    (assoc db :authorized? false)
    :message-success       "Signed out"
    :dispatch [::settings-controller/fetch-user-servers]}))

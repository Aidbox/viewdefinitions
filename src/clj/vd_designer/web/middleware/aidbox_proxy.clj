(ns vd-designer.web.middleware.aidbox-proxy
  (:require [ring.util.http-response :as http-response]
            [vd-designer.repository.user-server :as user-server]
            [vd-designer.repository.sso-token :as sso-token]))

(defn- get-box-url [{:keys [request-method query-params body-params]}]
  (if (= request-method :get)
    (:box-url query-params)
    (:box-url body-params)))

(defn- get-public-fhir-server [public-fhir-servers box-url]
  (some->> public-fhir-servers
           (filter #(-> % :box-url (= box-url)))
           first))

(defn- get-fhir-server-headers [{:keys [cfg db box-url user]}]
  (if-let [public-server (get-public-fhir-server (:public-fhir-servers cfg) box-url)]
    (do
      (def abc (:headers public-server))
      (:headers public-server))
    ;; Verify that user has access to the server
    (when-let [user-server (user-server/get-by-account-id-and-box-url db (:id user) box-url)]
      (if (:user_servers/is_custom user-server)
        (:user_servers/headers user-server)
        {:Cookie (->> user-server
                      :user_servers/aidbox_auth_token
                      (format "aidbox-auth-token=%s;"))}))))

(defn aidbox-proxy-middleware*
  [handler {:keys [db request user] :as ctx}]
  (let [ctx        (assoc ctx :box-url (get-box-url request))
        headers    (get-fhir-server-headers ctx)]
    (def hh headers)
    (if-not headers
      (http-response/unauthorized {:error "Unknown server"})
      (let [{:keys [body status]} (handler (assoc ctx :fhir-server-headers headers))]
        (case status
          401 (do
                (sso-token/delete db (:id user))
                (http-response/unauthorized {:error "Session expired"}))
          200 (http-response/ok body)
          {:status status, :body body, :headers {}})))))

(defn aidbox-proxy-middleware []
  {:name ::aidbox-proxy
   :wrap (fn [handler]
           (fn [ctx]
             (aidbox-proxy-middleware* handler ctx)))})

(ns vd-designer.web.middleware.aidbox-proxy
  (:require [ring.util.http-predicates :as predicates]
            [ring.util.http-response :as http-response]
            [vd-designer.repository.user-server :as user-server]))

(defn public-fhir-server [public-fhir-servers box-url]
  (some->> public-fhir-servers
           (filter #(-> % :box-url (= box-url)))
           first))

(defn handle-proxied-response
  [box-response]
  (let [response-body (:body box-response)]
    (if (predicates/success? box-response)
      (http-response/ok response-body)
      (http-response/bad-request response-body))))

(defn aidbox-proxy-middleware []
  {:name ::aidbox-proxy
   :wrap (fn [handler]
           (fn [{:keys [cfg db request user] :as ctx}]
             (let [box-url (if (-> request :request-method (= :get))
                             (-> request :query-params :box-url)
                             (-> request :body-params :box-url))
                   exec-with-headers (fn [fhir-server-headers]
                                       (-> ctx
                                           (assoc :box-url box-url
                                                  :fhir-server-headers fhir-server-headers)
                                           handler
                                           handle-proxied-response))]
               (if-let [public-server (public-fhir-server (:public-fhir-servers cfg) box-url)]
                 (exec-with-headers (:headers public-server))

                 ;; Verify that user has access to the server
                 (if-let [user-server (user-server/get-by-account-id-and-box-url db (:id user) box-url)]
                   (exec-with-headers {:Cookie (->> user-server
                                                    :user_servers/aidbox_auth_token
                                                    (format "aidbox-auth-token=%s;"))})
                   (http-response/unauthorized {:error "Unknown server"}))))))})

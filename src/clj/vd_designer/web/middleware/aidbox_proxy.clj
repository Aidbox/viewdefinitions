(ns vd-designer.web.middleware.aidbox-proxy
  (:require [ring.util.http-response :as http-response]
            [vd-designer.aidbox.proxy.private :as proxy-private]
            [vd-designer.aidbox.proxy.public :as proxy-public]
            [vd-designer.repository.user-server :as user-server]))

(defn public-fhir-server [public-fhir-servers box-url]
  (some->> public-fhir-servers
           (filter #(-> % :box-url (= box-url)))
           first))

(defn aidbox-proxy-middleware []
  {:name ::aidbox-proxy
   :wrap (fn [handler]
           (fn [{:keys [cfg db request user] :as ctx}]
             (let [box-url (if (-> request :request-method (= :get))
                             (-> request :query-params :box-url)
                             (-> request :body-params :box-url))]
               (if-let [public-server (public-fhir-server (:public-fhir-servers cfg)
                                                          box-url)]
                 (-> ctx
                     (proxy-public/mk public-server)
                     handler)

                 ;; Verify that user has access to the server
                 (if-let [user-server (user-server/get-by-account-id-and-box-url db user box-url)]
                   (-> ctx
                       (proxy-private/mk user-server)
                       handler)
                   (http-response/unauthorized {:error "Unknown server"}))))))})

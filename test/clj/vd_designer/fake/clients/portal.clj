(ns vd-designer.fake.clients.portal
  (:require [clojure.string :as str]
            [martian.core :as martian]
            [ring.util.http-response :as http-response]
            [vd-designer.clients.portal :as portal]
            [vd-designer.config :refer [config]]
            [vd-designer.utils.collection :refer [conj-if-new]]))

(defn add-access-key [client access-key]
  (swap! (:db client) update-in [:access-keys] conj-if-new access-key))

(defn add-project [client access-key project]
  (swap! (:db client) update-in [:projects access-key] conj-if-new project))

(defn add-license [client {{project-id :id} :project
                           :as              license}]
  (swap! (:db client) update-in [:licenses project-id] conj-if-new license))

(defn ->valid-license [aidbox-auth-token {:keys [project box-url name] :as license}]
  (assert box-url)
  (assert name)
  (assert (:id project))
  (-> license
      (assoc :product "aidbox"
             :status "active"
             :expiration-days 30)
      (update :box-url (fn [box-url*]
                         (format "%s/_sudo?token=%s&redirect-uri=/ui/console"
                                 box-url* aidbox-auth-token)))))

(defn exchange [{:keys [client-id client-secret code]}]
  (let [{expected-client-id     :client-id
         expected-client-secret :client-secret} (:sso config)]
    (if (or (not= client-id expected-client-id)
            (not= client-secret expected-client-secret))
      (http-response/bad-request {:error             "Invalid client credentials"
                                  :error_description "<error description>"})
      (if (not= code "<code>")
        (http-response/bad-request {:error             "Invalid authorization code"
                                    :error_description "<error description>"})
        (http-response/ok {:userinfo      {:email "<email>"}
                           :access_token  "<access token>"
                           :refresh_token "<refresh token>"
                           :expires_in    3600})))))

(defn- authorized? [db-mock access-key]
  (let [all-access-keys (:access-keys @db-mock)]
    (some #{access-key} all-access-keys)))

(defmulti rpc :method)

(defmethod rpc 'portal.portal/init-project [{:keys [Authorization]} db-mock]
  (let [[schema access-token] (str/split Authorization #" ")
        projects (or (get-in @db-mock [:projects access-token])
                     [])]
    (if (or (not= schema "Bearer")
            (not (authorized? db-mock access-token)))
      (http-response/unauthorized)
      (http-response/ok {:result projects}))))

(defn project-belongs? [db-mock project-id access-token]
  (->> (get-in @db-mock [:projects access-token])
       (map :id)
       (some #{project-id})))

(defmethod rpc 'portal.portal/fetch-licenses
  [{:keys                [Authorization]
    {:keys [project-id]} :params}
   db-mock]
  (let [[schema access-token] (str/split Authorization #" ")
        licenses (or (get-in @db-mock [:licenses project-id])
                     [])]
    (if (or (not= schema "Bearer")
            (not (authorized? db-mock access-token))
            (not (project-belongs? db-mock project-id access-token)))
      (http-response/unauthorized)
      (http-response/ok {:result licenses}))))

(defn perform-request [db-mock]
  {:name  ::perform-request
   :leave (fn [{:keys [handler params]}]
            {:response
             (atom
              (case (:route-name handler)
                :sso-code-exchange (exchange params)
                :rpc (rpc params db-mock)))})})

(defn client []
  (let [db-mock (atom {})]
    (-> (martian/bootstrap
         "https://api.com" portal/routes
         {:interceptors (conj martian/default-interceptors (perform-request db-mock))})
        (assoc :db db-mock))))

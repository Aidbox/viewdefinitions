(ns vd-designer.fake.clients.portal
  (:require [clojure.string :as str]
            [martian.core :as martian]
            [ring.util.http-response :as http-response]
            [vd-designer.clients.portal :as portal]
            [vd-designer.config :refer [config]]))

(defn conj-if-new [coll x]
  (cond-> coll
          (nil? ((set coll) x)) (conj x)))

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

(defmulti rpc :method)

(defmethod rpc 'portal.portal/init-project [{:keys [authorization]} db-mock]
  (let [[schema access-token] (str/split authorization #" ")
        projects (get-in @db-mock [:projects access-token])]
    (cond
      (not= schema "Bearer")
      (http-response/unauthorized)

      projects
      (http-response/ok {:result projects})

      :else
      (http-response/unauthorized))))

(defmethod rpc 'portal.portal/fetch-licenses
  [{:keys                [authorization]
    {:keys [project-id]} :params}
   db-mock]
  (let [[schema _access-token] (str/split authorization #" ")
        licenses (or (get-in @db-mock [:licenses project-id])
                     [])]
    (cond
      (not= schema "Bearer")
      (http-response/unauthorized)

      :else
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

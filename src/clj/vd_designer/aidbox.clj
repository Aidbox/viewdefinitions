(ns vd-designer.aidbox
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [lambdaisland.uri :as uri]
            [ring.util.http-response :as http-response]
            [vd-designer.clients.portal :as portal]
            [vd-designer.repository.sso-token :as sso-token]))

(defn init-project [client access-token]
  (portal/rpc:init-project client access-token))

(defn fetch-licenses [client access-token project-id]
  (portal/rpc:fetch-licenses client access-token project-id))

(defn truncate-box-url [box-url]
  (some-> box-url
          (uri/uri)
          (assoc :path "")
          uri/uri-str
          (str/split #"\?")
          first))

;; TODO: rework portal to have a middleware that takes care of access/refresh tokens
(defn list-servers [{:keys [aidbox.portal/client user db]}]
  (let [access-token
        (:sso_tokens/access_token (sso-token/get-last-by-id db (:accounts/id user)))
        projects (-> @(init-project client access-token)
                     :body
                     :result)]
    ;; TODO: filter self-hosted, expired, product = "aidbox", status = "active"
    (->> projects
         (mapcat
           (fn [project]
             (-> @(fetch-licenses client access-token (:id project))
                 :body :result)))
         (mapv #(-> %
                    (select-keys [:name :box-url :jwt :product :status])
                    (update :box-url truncate-box-url)
                    (set/rename-keys {:name    :server-name
                                      :box-url :base-url})))
         (http-response/ok))))

(ns vd-designer.aidbox
  (:require [vd-designer.clients.portal :as portal]
            [vd-designer.repository.sso-token :as sso-token]))

(defn init-project [client access-token]
  (portal/rpc:init-project client access-token))

(defn fetch-licenses [client access-token project-id]
  (portal/rpc:fetch-licenses client access-token project-id))

;; TODO: rework portal to have a middleware that takes care of access/refresh tokens
(defn list-servers [{:keys [aidbox.portal/client user db] :as arg} ]
  (let  [access-token
         (:sso_tokens/access_token (sso-token/get-last-by-id db (:accounts/id user)))
         projects (-> @(init-project client access-token)
                      :body
                      :result)
         licenses
         (->> projects
              (mapv
                (fn [project]
                  (-> @(fetch-licenses client access-token (:id project))
                      :body :result)))
              flatten)]
    ;; (def p projects)
    ;; (def l licenses)
    (mapv :name licenses)))

(ns vd-designer.web.controllers.custom-servers
  (:require [ring.util.http-response :as http-response]
            [vd-designer.repository.user-server :as user-server-repository]))

;; looks like it is also update
(defn add-custom-server [{:keys [request db user] :as r}]
  (let [{:keys [box-url server-name headers]} (:body-params request)
        inserted-count (first (user-server-repository/create-custom db (:id user) server-name box-url headers))]
    (if (= 0 (:next.jdbc/update-count inserted-count))
      (http-response/bad-request
        "Server already exists")
      (http-response/ok
        {:box-url box-url
         :server-name server-name
         :headers headers}))))

(defn delete-custom-server
  [{:keys [request db user]}]
  (let [{:keys [box-url server-name]} (:body-params request)
        jdbc-ans (user-server-repository/delete-custom db (:id user) box-url server-name)]
    (if (= 0 (:next.jdbc/update-count jdbc-ans))
      (http-response/bad-request "Cannot delete the server")
      (http-response/ok
        {:box-url box-url
         :server-name server-name}))))

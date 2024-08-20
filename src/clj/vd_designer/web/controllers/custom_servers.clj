(ns vd-designer.web.controllers.custom-servers
  (:require [ring.util.http-response :as http-response]
            [jsonista.core :as json]
            [vd-designer.repository.user-server :as user-server-repository]
            [clojure.string :as str]))

;; looks like it is also update
(defn add-custom-server [{:keys [request db user cfg] :as r}]
  (let [{:keys [box-url server-name headers] :as b}
        (-> (:body-params request)
            (json/read-value json/keyword-keys-object-mapper)
            (select-keys [:box-url :server-name :headers]))
        inserted-count (first (user-server-repository/create-custom db (:id user) server-name box-url headers))]
    (def b b)

    (if (= 0 (:next.jdbc/update-count inserted-count))
      (http-response/bad-request
        "Server already exists")
      (http-response/ok
        {:box-url box-url
         :server-name server-name
         :headers headers}))))

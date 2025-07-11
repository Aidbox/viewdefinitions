(ns vd-designer.web.controllers.custom-servers
  (:require [ring.util.http-response :as http-response]
            [vd-designer.repository.user-server :as user-server-repository]))

(defn add-custom-server [{:keys [request db user]}]
  (let [{:keys [box-url server-name headers]} (:body-params request)
        inserted-count (when (and box-url server-name)
                         (first (user-server-repository/create-custom db (:id user) server-name box-url headers)))]
    (cond
      (not inserted-count)
      (http-response/bad-request
        {:error {:error "Must be provided: box-url, server-name"}})

      (zero? (:next.jdbc/update-count inserted-count))
      (http-response/bad-request {:error "Server already exists"})

      :else
      (http-response/ok
        {:box-url box-url
         :server-name server-name
         :headers headers}))))

(defn update-custom-server [{:keys [request db user]}]
  (let [{:keys [old new]} (:body-params request)

        {old-server-name :server-name
         old-box-url :box-url} old

        {new-server-name :server-name
         new-box-url :box-url
         new-headers :headers} new

        updated-count
        (when (and old-server-name
                   old-box-url
                   new-server-name
                   new-box-url)
          (first (user-server-repository/update-custom
                   db
                   (:id user)
                   old-server-name old-box-url
                   new-server-name new-box-url new-headers)))]
    (if (zero? (:next.jdbc/update-count updated-count))
      (http-response/bad-request
        {:error "Cannot update server"})
      (http-response/ok
        {:box-url new-box-url
         :server-name new-server-name
         :headers new-headers}))))

(defn delete-custom-server
  [{:keys [request db user]}]
  (let [{:keys [box-url server-name]} (:body-params request)
        jdbc-ans (when (and box-url server-name)
                   (user-server-repository/delete-custom db (:id user) box-url server-name))]
    (cond
      (or (not jdbc-ans)
          (and (:next.jdbc/update-count jdbc-ans)
               (zero? (:next.jdbc/update-count jdbc-ans))))
      (http-response/bad-request {:error "Cannot delete the server"})

      :else
      (http-response/ok
        {:box-url box-url
         :server-name server-name}))))

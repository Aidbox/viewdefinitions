(ns vd-designer.web.controllers.servers
  (:require
    [vd-designer.portal :as portal]
    [vd-designer.repository.user-server :as user-server]
    [ring.util.http-response :as http-response]))

(defn select-server-keys [servers]
  (map #(select-keys % [:box-url :server-name :project :type :sandbox :headers])
       servers))

(defn list-servers
  [{:keys [cfg user db] :as ctx}]
  (let [public-servers (:public-fhir-servers cfg)
        portal-boxes
        (-> (if user
              (concat (portal/list-portal-user-servers ctx) public-servers)
              public-servers)
            select-server-keys)
        custom-servers
        (when user
          (mapv
            (fn [server]
              {:server-name (:user_servers/server_name server)
               :box-url (:user_servers/box_url server)
               :headers (:user_servers/headers server)})
            (user-server/get-custom-servers db (:id user))))]
    (http-response/ok
     (cond-> {:portal-boxes portal-boxes}
       custom-servers
       (assoc :custom-servers custom-servers)))))

(ns vd-designer.servers)

(defn active-server [db]
  (let [{{:keys [type server-name project-id]} :chosen-server} (:cfg/fhir-servers db)
        servers (-> db :cfg/fhir-servers (get type))]
    (if (= type :portal-servers)
      (->> servers
           (filterv #(= project-id (:id %)))
           (first)
           :boxes
           (filterv
             #(= server-name (:server-name %)))
           first)
      (->> servers
           (filterv
             #(= server-name (:server-name %)))
           (first)))))

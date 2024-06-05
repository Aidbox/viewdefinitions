(ns vd-designer.utils.db-utils)

(defn sandbox?
  ([db]
   (let [active-server (get-in db [:cfg/fhir-servers :used-server-name])]
     (get (get-in db [:cfg/fhir-servers :sandbox/servers]) active-server)))
  ([db server-name]
   (get (get-in db [:cfg/fhir-servers :sandbox/servers]) server-name)))

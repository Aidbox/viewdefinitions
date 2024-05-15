(ns vd-designer.utils.base64
  (:import java.util.Base64))

(defn decode [to-decode]
  (String. (.decode (Base64/getDecoder) to-decode)))

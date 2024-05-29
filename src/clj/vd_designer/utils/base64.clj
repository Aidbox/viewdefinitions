(ns vd-designer.utils.base64
  (:import java.util.Base64))

(defn decode [^String s]
  (String. (.decode (Base64/getDecoder) s)))

(defn encode [^String s]
  (->> s
       .getBytes
       (.encodeToString (Base64/getEncoder))))

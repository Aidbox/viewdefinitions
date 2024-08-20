(ns user-front
  "Commonly used symbols for easy access in the ClojureScript REPL during
  development.")

(defn set-vd [vd]
  (swap! re-frame.db/app-db
         assoc
         :current-vd
         vd))

(comment
  #_(get @re-frame.db/app-db :current-vd)
  )


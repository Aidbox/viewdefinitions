(ns postcss
  (:require [babashka.process :as proc]))

(defn watch
  {:shadow.build/stage :configure}
  [build-state src dst]
  (println "Watching for changes in" src)
  (proc/process "postcss" src "--watch" "--config" "postcss.config.js" "-o" dst
                ;; uncomment this to enable postcss for tailwind
                #_{:extra-env {"TAILWIND_MODE" "watch"}})
  build-state)

(defn release
  {:shadow.build/stage :configure}
  [build-state src dst]
  (proc/process "postcss" src "--no-map" "--config" "postcss.config.js" "-o" dst
                {:extra-env {"NODE_MODE" "production"}})
  build-state)

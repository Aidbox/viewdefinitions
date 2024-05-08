(ns postcss (:require
             [babashka.process :as proc]))

(defn watch
  {:shadow.build/stage :configure}
  [build-state src dst]
  (proc/process "./node_modules/.bin/postcss" src "-o" dst "--verbose" "-w"
                ;; uncomment this to enable postcss for tailwind
                #_{:extra-env {"TAILWIND_MODE" "watch"}})
  build-state)

(defn release
  {:shadow.build/stage :configure}
  [build-state src dst]
  (proc/process "./node_modules/.bin/postcss" src "-o" dst "--verbose"
                {:extra-env {"NODE_MODE" "production"}})
  build-state)

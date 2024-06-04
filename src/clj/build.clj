(ns build
  (:require [clojure.tools.build.api :as b]))

(def lib  'vd-designer)
(def main 'vd-designer.server)
(def class-dir "out/classes")
(def version (b/git-process {:git-args ["describe" "--tags"]}))

(defn- uber-opts [opts]
  (merge opts
         {:main       main
          :uber-file  (format "out/%s.jar" lib)
          :basis      (b/create-basis {:project "deps.edn"
                                       :aliases [:server]})
          :class-dir  class-dir
          :src-dirs   ["src/clj"]
          :ns-compile [main]}))

(defn uber [opts]
  (println "Cleaning...")
  (b/delete {:path "target"})

  (let [opts (uber-opts opts)]
    (println "Copying files...")
    (b/copy-dir {:src-dirs   ["resources/server"
                              "resources/client"
                              "src/clj"]
                 :target-dir class-dir})
    (b/write-file {:path (str class-dir "/version") :string version})

    (println "Compiling files...")
    (b/compile-clj opts)

    (println "Creating uberjar...")
    (b/uber opts)))

(ns viewdef-designer.pages.main.components.resource-select
  (:require [clojure.string :as str]
            [re-frame.core :refer [dispatch reg-event-db reg-sub subscribe]]
            [reagent.core :as r]
            [suitkin.core :as ui]
            [suitkin.utils :as su])
  (:require-macros [stylo.core :refer [c]]))

(comment
  (require '[viewdef-designer.utils.select :refer [prepare-option]])

  (def resources
    (map prepare-option ["Patient" "Observation" "Practitioner"]))

  ;; tests
  (= [] (search-resource [] nil))
  (= resources (search-resource resources nil))
  (= (map prepare-option ["Patient" "Practitioner"]) (search-resource resources "P"))

  :rcf)

(defn search-resource [state input]
  (if (seq state)
    (->>
     (if (seq input)
       (filterv #(str/starts-with? (str/lower-case (:title %))
                                   (str/lower-case input)) state)
       state)
     (take 10))
    []))

(defn update-suggestions [all suggested input]
  (reset! suggested (search-resource all input)))

(defn resource-select [initial-resources]

  (let [filtered-resoures (r/atom initial-resources)]
    (fn [initial-resources]
      (js/console.log (str @(subscribe [::selected-resource])))
      [:div
       {:class (c :grid :grid-flow-col)}
       [:h1 "Resource"]
       [ui/dropdown
        {:id "resource-dropdown"
         :value @(subscribe [::selected-resource])
         :search {:id "resource-search"
                  :s/invalid? false
                  :placeholder "ResourceType"
                  :on-change (fn [event]
                               (update-suggestions initial-resources
                                                   filtered-resoures
                                                   (su/target-value event)))
                  :readOnly false}
         :menu   {:not-found "No resource found"
                  :on-select (fn [_event item]
                               (dispatch [::select-resource item]))
                  :items @filtered-resoures}}]])))

(reg-sub
 ::selected-resource
 (fn [db [_]]
   (get db :resource)))

(reg-event-db
 ::select-resource
 (fn [db [_ input]]
   (assoc db :resource input)))

(ns client.views.core
  (:require
   [re-frame.core :as re-frame :refer [dispatch subscribe]]
   [client.routes :as routes]
   [suitkin.core :as ui]
   [client.events :as e]
   [client.subs :as s]
   [suitkin.utils :as su]
   #_[suitkin.button :as button]
   )
  (:require-macros [stylo.core :refer [c]]))

(defn home-panel []
  (let [value @(subscribe [::s/value])]
    [:div
     [ui/input
      {:placeholder   "suitkin search"
       :class         (c :w-full)
       :autoFocus     true
       :class-wrapper (c {:width "100% !important"})
       #_#_:on-change     (fn [event]
                            (dispatch [::someevent]))
       :s/left        [:img {:src (su/public-src "/suitkin/img/icon/ic-search-16.svg")}]}]
     [ui/button {:id "ig-create-valueset-button"
                 #_" not working"
                 :class (c {:color "#DF351F"})
                 :s/icon   "/suitkin/img/icon/ic-plus-16.svg"
                 #_#_:s/loading? (:valueset-creation-in-progress? data)
                 #_#_:disabled (seq (:monaco-markers data))
                 :on-click (fn [e] (dispatch [::e/add-value]))}
      "suitkin button"]
     (when value
       [:div "button clicked"])]))

(defmethod routes/panels :home-panel [] [home-panel])

(defn main-panel []
  (let [active-panel (re-frame/subscribe [::s/active-panel])]
    [routes/panels @active-panel]))

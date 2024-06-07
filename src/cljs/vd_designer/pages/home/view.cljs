(ns vd-designer.pages.home.view
  (:require ["antd" :refer [Button Card Col Flex Row Space Steps Typography]]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.pages.home.controller :as c]
            [vd-designer.pages.home.model :as m]))

(def col-sizes
  {:xxl  14
   :xl   16
   :lg   18
   :md   24})

(def card-styles
  {:header {:border-bottom "none"}
   :body   {:padding-top 0}})

(defn hero []
  [:> Row {:style   {:background "#F4F8FB"
                     :padding    "60px 56px 42px"}}
   [:> Col col-sizes
    [:span {:style {:color     "var(--ant-color-primary)"
                    :font-size "18px"}}
     "<_ sql-on-fhir"]
    [:> Typography.Title {:level 1 :style {:padding-top "25px"}} "ViewDefinition Builder"]

    [:> Typography.Paragraph {:style {:max-width "540px"
                                      :font-size "18px"}}
     "Effortlessly convert FHIR data stored in JSON representation into a tabular,
      flat format for convenient data analysis."]
    [:> Button {:type "primary" :size "large"}
     [:a {:href "/vds"} "Go to Builder"]]]])

(defn intro []
  [:> Row
   [:> Col col-sizes
    [:> Typography.Title {:level 2} "Intro"]

    [:> Typography.Paragraph
     "This free online builder allows you to create and debug ViewDefinition
      resources using an intelligent visual designer trained in "
     [:> Typography.Link {:href "https://hl7.org/fhir/" :target "_blank"}
      "the HL7 FHIR specification"]
     " and "
     [:> Typography.Link {:href "https://build.fhir.org/ig/FHIR/sql-on-fhir-v2/implementer_guidance.html" :target "_blank"}
      "the SQL-on-FHIR Implementation Guide"]
     "."]]])

(defn features []
  [:> Row
   [:> Col col-sizes
    [:> Typography.Title {:level 2} "Features"]

    [:> Space {:direction "vertical" :size "middle"}
     [:> Row {:gutter 16}
      [:> Col {:span 8}
       [:> Card {:title "Visual Builder" :styles card-styles}
        "Create, debug, and download ViewDefinitions on the fly."]]
      [:> Col {:span 8}
       [:> Card {:title "Auto-complete" :styles card-styles}
        "Speeds up ViewDefinition creation with FHIRpath suggestions."]]
      [:> Col {:span 8}
       [:> Card {:title "Sandbox" :styles card-styles}
        "Instantly see the results of data flattening during the creation of ViewDefinitions."]]]

     [:> Row {:gutter 16}
      [:> Col {:span 8}
       [:> Card {:title "Aidbox Integration" :styles card-styles}
        "Quickly connect the builder to your own Aidbox instance and work with real data."]]
      [:> Col {:span 8}
       [:> Card {:title    "Let’s start"
                 :bordered false
                 :styles   card-styles
                 :style    {:box-shadow "none"}}
        [:> Button {:type "primary" :ghost true :size "large"}
         [:> Typography.Link {:href "/vds"} "Go to Builder"]]]]]]]])

(defn how-it-works []
  [:> Row
   [:> Col col-sizes
    [:> Typography.Title {:level 2} "How it works"]

    [:> Space {:direction "vertical" :size "middle"}
     [:div
      [:> Typography.Title {:level 4} "Work with Sandbox"]
      [:> Steps {:direction   :vertical
                 :size        :small
                 :progressDot true
                 :items       [{:title       "Step 1"
                                :description (r/as-element
                                              [:<>
                                               "Go to "
                                               [:> Typography.Link {:href "/vds"} "the builder"]
                                               " connected to the sandbox with synthetic data."])}
                               {:title       "Step 2"
                                :description "Choose an example from the list or create/import a new ViewDefinition."}
                               {:title       "Step 3"
                                :description "Modify the ViewDefinition in the visual designer and see real-time results in the Result section."}
                               {:title       "Step 4"
                                :description "Switch to the “Code” tab and copy or download the resulting ViewDefinition."}
                               {:title       "Step 5"
                                :description "Upload the resulting ViewDefinition to your FHIR server that supports SQL-on-FHIR."}]
                 :current     @(subscribe [::m/onboarding-sandbox])
                 :onChange    #(dispatch [::c/move-onboarding-step-sandbox %])}]]

     [:div
      [:> Typography.Title {:level 4} "Work with Your Own Aidbox Instance"]
      [:> Steps {:direction   :vertical
                 :size        :small
                 :progressDot true
                 :items       [{:title       "Step 1"
                                :description (r/as-element
                                              [:<>
                                               "Go to "
                                               [:> Typography.Link {:href "/settings"} "the Server List"]
                                               " and authorize on the Aidbox License Server."])}
                               {:title       "Step 2"
                                :description "Choose an Aidbox instance or create a new one to connect to the builder."}
                               {:title       "Step 3"
                                :description "Select a ViewDefinition already stored on the server or create/import a new ViewDefinition."}
                               {:title       "Step 4"
                                :description "Modify the ViewDefinition in the visual designer and see real-time results in the Result section."}
                               {:title       "Step 5"
                                :description "Switch to the “Code” tab and copy or download the resulting ViewDefinition."}
                               {:title       "Step 6"
                                :description "Save the resulting ViewDefinition to your connected Aidbox instance."}]
                 :current     @(subscribe [::m/onboarding-aidbox])
                 :onChange    #(dispatch [::c/move-onboarding-step-aidbox %])}]]


     [:> Card {:title  "Learn more about Aidbox FHIR Platform"
               :styles card-styles
               :style {:padding    "16px"
                       :width      "768px"
                       :background "#F4F8FB"}
               :cover ""}
      [:> Flex {:justify "space-between"}
       [:div {:style {:width "420px"}}
        [:> Typography.Paragraph
         "Build future-ready solutions with the Aidbox FHIR Server:"
         [:br]
         "FHIR-native PostgreSQL, comprehensive API & SDK and granular Access Control."]
        [:> Typography.Link {:href "https://www.health-samurai.io/aidbox" :target "_blank"} "Go to the website"]]

       [:img {:src "/img/polygons.svg"
              :style {:margin-top "-36px"}}]]]]]])

(defn links []
  [:> Row
   [:> Col col-sizes
    [:> Typography.Title {:level 2} "Links & Resources"]

    [:> Typography.Paragraph
     "Learn more about HL7 FHIR, SQL-on-FHIR, and FHIRpath. Join the SQL-on-FHIR
      Working Group to contribute to the development and adoption of the specification."]
    [:ul
     [:li [:> Typography.Link
           {:href   "https://build.fhir.org/ig/FHIR/sql-on-fhir-v2/implementer_guidance.html"
            :target "_blank"}
           "SQL-on-FHIR Implementation Guide"]]
     [:li [:> Typography.Link
           {:href   "https://github.com/FHIR/sql-on-fhir-v2"
            :target "_blank"}
           "SQL on FHIR® (v2.0) GitHub Project"]]
     [:li [:> Typography.Link
           {:href   "https://fhir.github.io/sql-on-fhir-v2/#pg"
            :target "_blank"}
           "SQL-on-FHIR Interactive Playground"]]
     [:li [:> Typography.Link
           {:href   "https://www.youtube.com/playlist?list=PLEOOqZS1Ntwa7HnP3PgTLT7zPDJydsdx1"
            :target "_blank"}
           "SQL-on-FHIR Work Group Meetings"]]]]])

(defn home-view []
  [:<>
   (hero)
   [:> Flex {:style    {:padding "16px 56px"}
             :gap      16
             :vertical true
             :justify  "start"
             :align    "start"}
    (intro)
    (features)
    (how-it-works)
    (links)]])

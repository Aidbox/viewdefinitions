(ns vd-designer.pages.home.view
  (:require ["@ant-design/icons" :as icons]
            ["antd" :refer [Button Col Flex Row Space Steps Typography]]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as r]
            [vd-designer.pages.home.components :refer [banner-card
                                                       feature-action-card
                                                       feature-card]]
            [vd-designer.pages.home.controller :as c]
            [vd-designer.pages.home.layout :as layout]
            [vd-designer.pages.home.model :as m]
            ["@sooro-io/react-gtm-module" :as TagManager]))

(defn hero []
  [:> Row {:style {:background "#F4F8FB"
                   :padding    "60px 56px 42px"}}
   [:> Col layout/col-sizes
    [:span {:style {:color       "var(--ant-color-primary)"
                    :font-family "'Roboto Mono', monospace"}}
     ">_ sql-on-fhir"]
    [:> Typography.Title {:level 1} "ViewDefinition Builder"]
    [:> Typography.Paragraph {:style {:max-width      "540px"
                                      :font-size      "18px"
                                      :padding-bottom "16px"}}
     "Effortlessly convert FHIR data stored in JSON representation into a tabular,
      flat format for convenient data analysis."]
    [:a {:href "/vds"}
     [:> Button {:type "primary" :size "large"} "Go to Builder"]]]])

(defn intro []
  [:> Row
   [:> Col layout/col-sizes
    [:> Typography.Title {:level 2} "Intro"]
    [:> Typography.Paragraph
     "This free online builder allows you to create and debug ViewDefinition
      resources using an intelligent visual designer trained in "
     [:> Typography.Link {:href "https://hl7.org/fhir/" :target "_blank"}
      "the HL7 FHIR specification"]
     " and "
     [:> Typography.Link {:href "https://build.fhir.org/ig/FHIR/sql-on-fhir-v2/index.html" :target "_blank"}
      "the SQL-on-FHIR Implementation Guide"]
     "."]]])

(defn features []
  [:> Row
   [:> Col layout/col-sizes
    [:> Typography.Title {:level 2} "Features"]

    [:> Space {:direction "vertical" :size "middle"}
     [:> Row {:gutter 16}
      [:> Col {:span 8}
       (feature-card "Visual Builder"
                     "Create, debug, and download ViewDefinitions on the fly.")]
      [:> Col {:span 8}
       (feature-card "Auto-complete"
                     "Speeds up ViewDefinition creation with FHIRpath suggestions.")]
      [:> Col {:span 8}
       (feature-card "Sandbox"
                     "Instantly see the results of data flattening during the creation of ViewDefinitions.")]]

     [:> Row {:gutter 16}
      [:> Col {:span 8}
       (feature-card "Aidbox Integration"
                     "Quickly connect the builder to your own Aidbox instance and work with real data.")]
      [:> Col {:span 8}
       (feature-action-card "Let’s start"
                            [:a {:href "/vds"}
                             [:> Button {:type "primary" :ghost true :size "large"}
                              "Go to Builder"]])]]]]])

(defn how-it-works []
  [:> Row
   [:> Col {:spon 24}
    [:> Typography.Title {:level 2} "How it works"]

    [:> Space {:direction "vertical" :size "middle"}
     [:div
      [:> Typography.Title {:level 3} "Work with Sandbox"]
      [:> Steps {:direction   :vertical
                 :size        :small
                 :progressDot true
                 :class       "home-onboarding-steps"
                 :items       [{:description (r/as-element
                                              [:<>
                                               [:b "Step 1: "]
                                               "Go to "
                                               [:> Typography.Link {:href "/vds"} "the builder"]
                                               " connected to the sandbox with synthetic data."])}
                               {:description (r/as-element
                                              [:<>
                                               [:b "Step 2: "]
                                               "Choose an example from the list or create/import a new ViewDefinition."])}
                               {:description (r/as-element
                                              [:<>
                                               [:b "Step 3: "]
                                               "Modify the ViewDefinition in the visual designer and see real-time results in the Result section."])}
                               {:description (r/as-element
                                              [:<>
                                               [:b "Step 4: "]
                                               "Switch to the “Code” tab and copy or download the resulting ViewDefinition."])}
                               {:description (r/as-element
                                              [:<>
                                               [:b "Step 5: "]
                                               "Upload the resulting ViewDefinition to your FHIR server that supports SQL-on-FHIR."])}]
                 :current     @(subscribe [::m/onboarding-sandbox])
                 :onChange    #(dispatch [::c/move-onboarding-step-sandbox %])}]]

     [:div
      [:> Typography.Title {:level 3} "Work with Your Own Aidbox Instance"]
      [:> Steps {:direction   :vertical
                 :size        :small
                 :progressDot true
                 :class       "home-onboarding-steps"
                 :items       [{:description (r/as-element
                                              [:<>
                                               [:b "Step 1: "]
                                               "Go to "
                                               [:> Typography.Link {:href "/settings"} "the Server List"]
                                               " and authorize on the Aidbox License Server."])}
                               {:description (r/as-element
                                              [:<>
                                               [:b "Step 2: "]
                                               "Choose an Aidbox instance or create a new one to connect to the builder."])}
                               {:description (r/as-element
                                              [:<>
                                               [:b "Step 3: "]
                                               "Select a ViewDefinition already stored on the server or create/import a new ViewDefinition."])}
                               {:description (r/as-element
                                              [:<>
                                               [:b "Step 4: "]
                                               "Modify the ViewDefinition in the visual designer and see real-time results in the Result section."])}
                               {:description (r/as-element
                                              [:<>
                                               [:b "Step 5: "]
                                               "Switch to the “Code” tab and copy or download the resulting ViewDefinition."])}
                               {:description (r/as-element
                                              [:<>
                                               [:b "Step 6: "]
                                               "Save the resulting ViewDefinition to your connected Aidbox instance."])}]
                 :current     @(subscribe [::m/onboarding-aidbox])
                 :onChange    #(dispatch [::c/move-onboarding-step-aidbox %])}]]

     (banner-card
      "Aidbox FHIR Platform"
      [:<>
       [:> Typography.Paragraph
        "Build interoperable, secure, and fast healthcare applications with
         FHIR-native Postgres database, Comprehensive API with Granular Access
         Control, and SDK"]

       [:a {:id "vd_aidbox_banner" :href "https://www.health-samurai.io/aidbox" :target "_blank"
            :onClick #(TagManager/dataLayer
                       (clj->js {:dataLayer {:event "vd_aidbox_banner"}}))}
        [:> Flex {:align :center :gap "4px"}
         [:span {:style {:padding-bottom "2px"}} "Learn more "]
         [:> icons/RightOutlined]]]])]]])


(defn links []
  [:> Row
   [:> Col layout/col-sizes
    [:> Typography.Title {:level 2} "Links & Resources"]
    [:> Typography.Paragraph
     "Learn more about HL7 FHIR, SQL-on-FHIR, and FHIRpath. Join the SQL-on-FHIR
      Working Group to contribute to the development and adoption of the specification."]

    [:ul
     [:li [:> Typography.Link
           {:href   "https://build.fhir.org/ig/FHIR/sql-on-fhir-v2/index.html"
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

(ns vd-designer.components.input)

(defn expandable-input [placeholder]
  [:div {:style {:height "29px"}}

   [:input {:style       {:type           :text

                          :height         "16px"
                          :width          "170px"
                          :padding-left   "6px"
                          :padding-bottom "4px"
                          :padding-top    "4px"

                          :border         "0"
                          :border-bottom  "1px solid #7972D3"

                          :font-size      "10px"
                          :font-style     "italic"}
            :placeholder placeholder}]
   ;; TODO: add button to expand into text area
   ])

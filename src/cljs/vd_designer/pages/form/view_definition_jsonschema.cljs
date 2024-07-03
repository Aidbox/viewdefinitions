(ns vd-designer.pages.form.view-definition-jsonschema)

(def schema
  {"$id" "base"
   "type" "object"
   "additionalProperties" false
   "required" ["resourceType" "status" "resource" "select"]
   "properties"
   {"id" {"type" "string"}
    "resourceType" {"type" "string"}
    "extension" {"type" "array"
                 "items" {"type" "object"}}
    "url" {"type" "string"}
    "identifier" {"$id" "#identifier"
                  "type" "object"
                  "properties"
                  {"use" {"enum" ["usual"
                                  "official"
                                  "temp"
                                  "secondary"
                                  "old"]}
                   "type" {"$id" "#codeableconcept"
                           "type" "object"
                           "properties"
                           {"coding" {"type" "array"
                                      "items" {"$id" "#coding"
                                               "type" "object"
                                               "properties"
                                               {"system" {"type" "string"}
                                                "version" {"type" "string"}
                                                "code" {"type" "string"}
                                                "display" {"type" "string"}
                                                "userSelected" {"type" "boolean"}}}}
                            "text" {"type" "string"}}}
                   "system" {"type" "string"}
                   "value" {"type" "string"}
                   "period" {"$id" "#period"
                             "type" "object"
                             "additionalProperties" {"extension" {"type" "object"}}
                             "properties" {"id" {"type" "string"}
                                           "start" {"type" "string" }
                                           "end" {"type" "string" }}}
                   "assigner" {"$id" "#reference"
                               "type" "object"
                               "properties"
                               {"reference" {"type" "string"}
                                "type" {"type" "string"}
                                "identifier" {"$ref" "#identifier"}
                                "display" {"type" "string"}}}}}
    "name" {"type" "string"}
    "title" {"type" "string"}
    "meta" {"type" "object"
            "properties"
            {"versionId" {"type" "string"}
             "lastUpdated" {"type" "string"}
             "source" {"type" "string"}
             "profile" {"type" "string"}
             "security" {"type" "array"
                         "items" {"$ref" "#coding"}}
             "tag" {"type" "array"
                    "items" {"$ref" "#coding"}}}}
    "status" {"enum" ["draft"
                      "active"
                      "retired"
                      "unknown"]}
    "experimental" {"type" "boolean"}
    "publisher" {"type" "string"}
    "contact" {"type" "array"
               "items"
               {"type" "object"
                "properties"
                {"name" {"type" "string"}
                 "telecom" {"type" "array"
                            "items"
                            {"type" "object"
                             "properties"
                             {"system" {"type" "string"}
                              "value" {"type" "string"}
                              "use" {"type" "string"}
                              "rank" {"type" "integer"}
                              "period" {"$ref" "#period"}}}}}}}
    "description" {"type" "string"}
    "useContext" {"type" "array"
                  "items"
                  {"oneOf"
                   [{"type" "object",
                     "additionalProperties" false
                     "properties" {"code" {"$ref" "#coding"}
                                   "valueCodeableConcept" {"$ref" "#codeableconcept"}},
                     "required" ["code" "valueCodeableConcept"]},
                    {"type" "object",
                     "additionalProperties" false
                     "properties" {"code" {"$ref" "#coding"}
                                   "valueQuantity"
                                   {"type" "object"
                                    "properties"
                                    {"value" {"type" "integer"}
                                     "comparator" {"type" "string"}
                                     "unit" {"type" "string"}
                                     "system" {"type" "string"}
                                     "code" {"type" "string"}}}},
                     "required" ["code" "valueQuantity"]},
                    {"type" "object",
                     "additionalProperties" false
                     "properties" {"code" {"$ref" "#coding"}
                                   "valueRange"
                                   {"type" "object"
                                    "properties"
                                    {"low" {"type" "integer"}
                                     "high" {"type" "integer"}}}},
                     "required" ["code" "valueCodeableConcept"]},
                    {"type" "object",
                     "additionalProperties" false
                     "properties" {"code" {"$ref" "#coding"}
                                   "valueReference"
                                   {"$ref" "#reference"}},
                     "required" ["code" "valueReference"]}]}}
    "copyright" {"type" "string"}
    "resource" {"type" "string"}
    "fhirVersion" {"type" "array"
                   "items" {"type" "string"}}
    "constant" {"type" "array"
                "additionalProperties" false
                "items" 
                {"oneOf"
                 [{"type" "object"
                   "required" ["name" "valueBase64Binary"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueBase64Binary" {"type" "string"}}}
                  {"type" "object"
                   "required" ["name" "valueBoolean"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueBoolean" {"type" "boolean"}}}
                  {"type" "object"
                   "required" ["name" "valueCanonical"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueCanonical" {"type" "string"}}}
                  {"type" "object"
                   "required" ["name" "valueCode"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueCode" {"type" "string"}}}
                  {"type" "object"
                   "required" ["name" "valueDate"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueDate" {"type" "string"}}}
                  {"type" "object"
                   "required" ["name" "valueDateTime"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueDateTime" {"type" "string"}}}
                  {"type" "object"
                   "required" ["name" "valueDecimal"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueDecimal" {"type" "integer"}}}
                  {"type" "object"
                   "required" ["name" "valueId"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueId" {"type" "string"}}}
                  {"type" "object"
                   "required" ["name" "valueInstant"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueInstant" {"type" "string"}}}
                  {"type" "object"
                   "required" ["name" "valueInteger"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueInteger" {"type" "integer"}}}
                  {"type" "object"
                   "required" ["name" "valueInteger64"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueInteger64" {"type" "integer"}}}
                  {"type" "object"
                   "required" ["name" "valueOid"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueOid" {"type" "string"}}}
                  {"type" "object"
                   "required" ["name" "valueString"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueString" {"type" "string"}}}
                  {"type" "object"
                   "required" ["name" "valuePositiveInt"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valuePositiveInt" {"type" "integer"}}}
                  {"type" "object"
                   "required" ["name" "valueTime"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueTime" {"type" "string"}}}
                  {"type" "object"
                   "required" ["name" "valueUnsignedInt"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueUnsignedInt" {"type" "integer"}}}
                  {"type" "object"
                   "required" ["name" "valueUri"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueUri" {"type" "string"}}}
                  {"type" "object"
                   "required" ["name" "valueUrl"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueUrl" {"type" "string"}}}
                  {"type" "object"
                   "required" ["name" "valueUuid"]
                   "additionalProperties" false
                   "properties" 
                   {"name" {"type" "string"}
                    "valueUuid" {"type" "string"}}}]}}
    "select" {"$id" "#select"
              "type" "array"
              "items"
              {"oneOf"
               [{"type" "object",
                 "additionalProperties" false
                 "properties" {"column"
                               {"type" "array"
                                "items"
                                {"type" "object"
                                 "additionalProperties" false
                                 "properties"
                                 {"name" {"type" "string"}
                                  "path" {"type" "string"}
                                  "description" {"type" "string"}
                                  "collection" {"type" "boolean"}
                                  "type" {"type" "string"}
                                  "tag" {"type" "array"
                                         "items" {"properties"
                                                  {"name" {"type" "string"}
                                                   "value" {"type" "string"}}
                                                  "required" ["name" "value"]}}}
                                 "required" ["name" "path"]}}},
                 "required" ["column"]},
                {"type" "object",
                 "additionalProperties" false,
                 "properties" {"forEach" {"type" "string"}
                               "select" {"$ref" "#select"}},
                 "required" ["select", "forEach"]},
                {"type" "object",
                 "additionalProperties" false,
                 "properties" {"forEachOrNull" {"type" "string"}
                               "select" {"$ref" "#select"}},
                 "required" ["select", "forEachOrNull"]},
                {"type" "object",
                 "additionalProperties" false
                 "properties" {"unionAll" {"$ref" "#select"}},
                 "required" ["unionAll"]}]}}
    "where" {"type" "array"
             "items"
             {"type" "object"
              "required" ["path"]
              "properties" 
              {"path" {"type" "string"}
               "description" {"type" "string"}}}}}})
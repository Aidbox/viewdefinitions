-- Add /fhir suffix to existing portal servers (is_custom = false or NULL)
UPDATE user_servers
SET box_url = box_url || '/fhir'
WHERE (is_custom = false OR is_custom IS NULL)
  AND box_url NOT LIKE '%/fhir';

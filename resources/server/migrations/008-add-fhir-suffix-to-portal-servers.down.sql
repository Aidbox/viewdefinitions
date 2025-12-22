-- Remove /fhir suffix from portal servers (rollback)
UPDATE user_servers
SET box_url = LEFT(box_url, LENGTH(box_url) - 5)
WHERE (is_custom = false OR is_custom IS NULL)
  AND box_url LIKE '%/fhir';

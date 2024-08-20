alter table "public"."user_servers"
add column "headers" jsonb,
add column "is_custom" boolean
;

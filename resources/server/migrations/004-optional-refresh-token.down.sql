alter table "public"."sso_tokens"
alter column "refresh_token"
set not null;

alter table "public"."sso_tokens"
alter column "expires_in"
set not null;

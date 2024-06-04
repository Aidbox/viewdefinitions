alter table "public"."sso_tokens"
alter column "refresh_token"
drop not null;

alter table "public"."sso_tokens"
alter column "expires_in"
drop not null;

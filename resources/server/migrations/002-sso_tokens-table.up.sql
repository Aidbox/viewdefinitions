create table if not exists sso_tokens (
    id serial primary key,
    account_id serial references accounts not null,
    access_token text not null,
    refresh_token text not null,
    expires_in integer not null
);

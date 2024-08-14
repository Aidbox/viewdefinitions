-- user_servers = aidbox portal server
-- user_servers_custom = any aidbox. just url + token
-- probably will be used to test local aidbox with ngrok

-- They are the same, but I think it is a good idea
-- to separate them.
create table if not exists user_servers_custom (
    id serial primary key,
    account_id integer not null references accounts on delete cascade,
    server_name varchar(256) not null,
    box_url varchar(256) not null,
    aidbox_auth_token text not null,
);

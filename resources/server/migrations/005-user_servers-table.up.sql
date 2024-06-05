create table if not exists user_servers (
    id serial primary key,
    account_id integer not null references accounts on delete cascade,
--     TODO: do we need it?
    server_name varchar(256) not null,
    box_url varchar(256) not null,
--     product varchar(256) not null,
--     status varchar(256) not null,
    aidbox_auth_token varchar(256) not null
--     TODO: add unique constraint on account_id + box_url
);

create table if not exists user_servers (
    account_id integer not null references accounts on delete cascade,
--     TODO: do we need it?
    server_name varchar(256) not null,
    box_url varchar(256) not null,
    aidbox_auth_token text not null,
    primary key (account_id, box_url)
);

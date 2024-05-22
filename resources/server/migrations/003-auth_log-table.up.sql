create table if not exists auth_log (
    id serial primary key,
    email varchar(256) not null,
    issued_at timestamp default current_timestamp
);

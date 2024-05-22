create table if not exists accounts (
-- read about best practices about table primary keys
    id serial primary key,
    uuid uuid unique not null,
    email varchar(256) unique not null
);

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE appointment (
     id SERIAL PRIMARY KEY,
    patient_id integer NOT NULL,
    appointment_time date NOT NULL,
    reason varchar(256) NOT NULL,
    language_preference varchar(256) NOT NULL,
    feeling_pain boolean NOT NULL DEFAULT false,
    has_family_history_headache boolean NOT NULL DEFAULT false,
    has_migraine boolean NOT NULL DEFAULT false,
    is_approved boolean NOT NULL DEFAULT false,

    FOREIGN KEY (patient_id) REFERENCES patient_profile (id)
);

CREATE TABLE insurance (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    insurance_provider VARCHAR(256) NOT NULL,
    policy_number INTEGER NOT NULL,
    group_number INTEGER NOT NULL,
    subscriber_date_of_birth DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE emergency (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(256) NOT NULL,
    relationship VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL,
    address VARCHAR(256) NOT NULL,
    phone_number INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE patient_profile (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    img VARCHAR(256) NOT NULL,
    address VARCHAR(256) NOT NULL,
    has_covid BOOLEAN NOT NULL DEFAULT false,
    has_left_country_recently BOOLEAN NOT NULL DEFAULT false,
    date_of_birth DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

alter table appointment
add column is_approved varchar(45) default 'pending';
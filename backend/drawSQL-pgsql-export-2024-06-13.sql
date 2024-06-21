CREATE TABLE "Users"(
    "id" BIGINT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(1024) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "age_range" VARCHAR(255) NOT NULL,
    "gender" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Users" ADD PRIMARY KEY("id");
CREATE TABLE "tasks"(
    "id" BIGINT NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "image" bytea NOT NULL,
    "user_id" BIGINT NOT NULL
);
ALTER TABLE
    "tasks" ADD PRIMARY KEY("id");
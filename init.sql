CREATE TABLE users
(
    id          BIGSERIAL PRIMARY KEY,
    email       VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    first_name  VARCHAR(255) NOT NULL,
    last_name   VARCHAR(255) NOT NULL,
    sex         VARCHAR(6)   NOT NULL,
    user_number VARCHAR(6)   NOT NULL
);

CREATE TABLE user_about
(
    id           BIGSERIAL PRIMARY KEY,
    about        VARCHAR(255),
    avatar       VARCHAR(255),
    public_email VARCHAR(255),
    discord      VARCHAR(255),
    facebook     VARCHAR(255),
    twitter      VARCHAR(255),
    user_id      BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE roles
(
    id   BIGSERIAL PRIMARY KEY,
    role VARCHAR(255) NOT NULL
);

INSERT INTO roles (role)
VALUES ('ROLE_USER');
INSERT INTO roles (role)
VALUES ('ROLE_MODERATOR');
INSERT INTO roles (role)
VALUES ('ROLE_ADMIN');

CREATE TABLE user_roles
(
    id      BIGSERIAL PRIMARY KEY,
    role_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO users (email, password, first_name, last_name, sex, user_number)
VALUES ('admin@admin.com', '$2y$10$qyatItgrDWs8q0QI11C/qOJ09YK601xJkMZjpX3l7DF54yrAseQnu', 'Admin', 'Admin', 'MALE',
        111111);
INSERT INTO user_roles (role_id, user_id)
VALUES (1, 1);
INSERT INTO user_roles (role_id, user_id)
VALUES (3, 1);

CREATE TABLE friendship
(
    id        BIGSERIAL PRIMARY KEY,
    user_id   BIGINT NOT NULL,
    friend_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (friend_id) REFERENCES users (id)
);

CREATE TABLE viewed_movies
(
    id               BIGSERIAL PRIMARY KEY,
    movie_number     VARCHAR(5)   NOT NULL,
    api_link         VARCHAR(255) NOT NULL,
    rating           SMALLINT,
    is_viewed        BOOLEAN      NOT NULL,
    is_creator_movie BOOLEAN      NOT NULL
);

CREATE TABLE movie_offers
(
    id           BIGSERIAL PRIMARY KEY,
    offer_number VARCHAR(7) NOT NULL,
    creator_id   BIGINT     NOT NULL,
    applicant_id BIGINT,
    is_active    BOOLEAN    NOT NULL,
    is_opened    BOOLEAN    NOT NULL,
    start_time   TIMESTAMP,
    end_time     TIMESTAMP,
    FOREIGN KEY (creator_id) REFERENCES users (id),
    FOREIGN KEY (applicant_id) REFERENCES users (id)
);

CREATE TABLE movie_to_offer
(
    id       BIGSERIAL PRIMARY KEY,
    offer_id BIGINT NOT NULL,
    movie_id BIGINT NOT NULL,
    FOREIGN KEY (offer_id) REFERENCES movie_offers (id),
    FOREIGN KEY (movie_id) REFERENCES viewed_movies (id)
);
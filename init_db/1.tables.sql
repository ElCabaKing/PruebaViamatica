CREATE TABLE persona (
    id_persona        SERIAL PRIMARY KEY,
    nombres           VARCHAR(80) NOT NULL,
    apellidos         VARCHAR(80) NOT NULL,
    identificacion    VARCHAR(10) NOT NULL,
    fecha_nacimiento  DATE,
    deleted_at        TIMESTAMP NULL
);


CREATE TABLE rol (
    id_rol    SERIAL PRIMARY KEY,
    rol_name  VARCHAR(50) NOT NULL,
    deleted_at TIMESTAMP NULL
);


CREATE TABLE rol_opciones (
    id_opcion      SERIAL PRIMARY KEY,
    nombre_opcion  VARCHAR(50) NOT NULL,
    deleted_at     TIMESTAMP NULL
);


CREATE TABLE usuarios (
    id_usuario      SERIAL PRIMARY KEY,
    username        VARCHAR(50) NOT NULL,
    password        TEXT NOT NULL,
    mail            VARCHAR(120) NOT NULL,
    session_active  BOOLEAN NOT NULL DEFAULT FALSE,
    status          CHAR(2) NOT NULL DEFAULT 'AC',
    persona_id      INTEGER NOT NULL,
    login_tries     INTEGER NOT NULL DEFAULT 0,
    last_login      TIMESTAMP NULL,
    deleted_at      TIMESTAMP NULL,

    CONSTRAINT fk_usuario_persona
        FOREIGN KEY (persona_id)
        REFERENCES persona(id_persona)
        ON DELETE CASCADE
);


CREATE TABLE sessions (
    id_session     SERIAL PRIMARY KEY,
    fecha_ingreso  DATE NOT NULL,
    fecha_cierre   DATE,
    usuario_id     INTEGER NOT NULL,
    deleted_at     TIMESTAMP NULL,

    CONSTRAINT fk_session_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
);


CREATE TABLE rol_usuarios (
    rol_id      INTEGER NOT NULL,
    usuario_id  INTEGER NOT NULL,
    deleted_at  TIMESTAMP NULL,

    PRIMARY KEY (rol_id, usuario_id),

    FOREIGN KEY (rol_id) REFERENCES rol(id_rol) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);


CREATE TABLE rol_rolopciones (
    rol_id     INTEGER NOT NULL,
    opcion_id  INTEGER NOT NULL,
    deleted_at TIMESTAMP NULL,

    PRIMARY KEY (rol_id, opcion_id),

    FOREIGN KEY (rol_id) REFERENCES rol(id_rol) ON DELETE CASCADE,
    FOREIGN KEY (opcion_id) REFERENCES rol_opciones(id_opcion) ON DELETE CASCADE
);
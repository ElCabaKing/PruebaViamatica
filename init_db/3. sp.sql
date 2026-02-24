CREATE OR REPLACE FUNCTION sp_persona_create(
     p_nombres VARCHAR,
    p_apellidos VARCHAR,
    p_identificacion VARCHAR,
    p_fecha_nacimiento DATE
)
RETURNS INTEGER AS $$
DECLARE
    v_id INTEGER;
BEGIN
    INSERT INTO persona(nombres, apellidos, identificacion, fecha_nacimiento)
    VALUES (p_nombres, p_apellidos, p_identificacion, p_fecha_nacimiento)
    RETURNING id_persona INTO v_id;

    RETURN v_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_persona_get(p_id INTEGER)
RETURNS persona AS $$
DECLARE v persona;
BEGIN
    SELECT * INTO v
    FROM persona
    WHERE id_persona = p_id
      AND deleted_at IS NULL;

    RETURN v;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_persona_update(
    p_id INTEGER,
    p_nombres VARCHAR,
    p_apellidos VARCHAR,
    p_identificacion VARCHAR,
    p_fecha_nacimiento DATE
)
RETURNS persona AS $$
DECLARE v persona;
BEGIN
    UPDATE persona
    SET nombres = p_nombres,
        apellidos = p_apellidos,
        identificacion = p_identificacion,
        fecha_nacimiento = p_fecha_nacimiento
    WHERE id_persona = p_id
      AND deleted_at IS NULL
    RETURNING * INTO v;

    RETURN v;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_persona_delete(p_id INTEGER)
RETURNS persona AS $$
DECLARE v persona;
BEGIN
    UPDATE persona
    SET deleted_at = NOW()
    WHERE id_persona = p_id
      AND deleted_at IS NULL
    RETURNING * INTO v;

    RETURN v;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_persona_restore(p_id INTEGER)
RETURNS persona AS $$
DECLARE v persona;
BEGIN
    UPDATE persona
    SET deleted_at = NULL
    WHERE id_persona = p_id
    RETURNING * INTO v;

    RETURN v;
END;
$$ LANGUAGE plpgsql;

-- ==========================================================
-- 3️⃣ ROL
-- ==========================================================

CREATE OR REPLACE FUNCTION sp_rol_create(p_nombre VARCHAR)
RETURNS rol AS $$
DECLARE v rol;
BEGIN
    INSERT INTO rol(rol_name)
    VALUES (p_nombre)
    RETURNING * INTO v;
    RETURN v;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_rol_delete(p_id INTEGER)
RETURNS rol AS $$
DECLARE v rol;
BEGIN
    UPDATE rol
    SET deleted_at = NOW()
    WHERE id_rol = p_id
      AND deleted_at IS NULL
    RETURNING * INTO v;

    RETURN v;
END;
$$ LANGUAGE plpgsql;

-- ==========================================================
-- 4️⃣ USUARIO
-- ==========================================================

CREATE OR REPLACE FUNCTION sp_usuario_create(
    p_username VARCHAR,
    p_password TEXT,
    p_mail VARCHAR,
    p_persona_id INTEGER
)
RETURNS usuarios AS $$
DECLARE v usuarios;
BEGIN
    INSERT INTO usuarios(username, password, mail, persona_id)
    VALUES (p_username, p_password, p_mail, p_persona_id)
    RETURNING * INTO v;

    RETURN v;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_usuario_get(p_id INTEGER)
RETURNS usuarios AS $$
DECLARE v usuarios;
BEGIN
    SELECT *
    INTO v
    FROM usuarios
    WHERE id_usuario = p_id
      AND deleted_at IS NULL;

    RETURN v;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_usuario_update(
    p_id INTEGER,
    p_username VARCHAR,
    p_password TEXT,
    p_mail VARCHAR,
    p_status CHAR(2)
)
RETURNS usuarios AS $$
DECLARE v usuarios;
BEGIN
    UPDATE usuarios
    SET username = p_username,
        password = p_password,
        mail = p_mail,
        status = p_status
    WHERE id_usuario = p_id
      AND deleted_at IS NULL
    RETURNING * INTO v;

    RETURN v;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_usuario_delete(p_id INTEGER)
RETURNS usuarios AS $$
DECLARE v usuarios;
BEGIN
    UPDATE usuarios
    SET deleted_at = NOW(),
        status = 'IN',
        session_active = FALSE
    WHERE id_usuario = p_id
      AND deleted_at IS NULL
    RETURNING * INTO v;

    RETURN v;
END;
$$ LANGUAGE plpgsql;

-- ==========================================================
-- 5️⃣ SESSION
-- ==========================================================

CREATE OR REPLACE FUNCTION sp_session_create(
    p_fecha DATE,
    p_usuario_id INTEGER
)
RETURNS sessions AS $$
DECLARE v sessions;
BEGIN
    INSERT INTO sessions(fecha_ingreso, usuario_id)
    VALUES (p_fecha, p_usuario_id)
    RETURNING * INTO v;

    RETURN v;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_session_close(
    p_id INTEGER,
    p_fecha_cierre DATE
)
RETURNS sessions AS $$
DECLARE v sessions;
BEGIN
    UPDATE sessions
    SET fecha_cierre = p_fecha_cierre
    WHERE id_session = p_id
      AND deleted_at IS NULL
    RETURNING * INTO v;

    RETURN v;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_session_delete(p_id INTEGER)
RETURNS sessions AS $$
DECLARE v sessions;
BEGIN
    UPDATE sessions
    SET deleted_at = NOW()
    WHERE id_session = p_id
      AND deleted_at IS NULL
    RETURNING * INTO v;

    RETURN v;
END;
$$ LANGUAGE plpgsql;
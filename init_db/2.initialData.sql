
INSERT INTO persona (nombres, apellidos, identificacion, fecha_nacimiento) VALUES
('Juan', 'Pérez', '0912345678', '1995-03-15'),
('María', 'Gómez', '0923456789', '1998-07-22'),
('Carlos', 'Ramírez', '0934567890', '1992-11-10'),
('Ana', 'Torres', '0945678901', '2000-01-05'),
('Luis', 'Mendoza', '0956789012', '1994-09-18');


INSERT INTO rol (rol_name) VALUES
('ADMIN'),
('MODERATOR'),
('USER');

INSERT INTO rol_opciones (nombre_opcion) VALUES
('CREATE_USER'),
('DELETE_USER'),
('UPDATE_USER'),
('VIEW_REPORTS'),
('EDIT_PROFILE'),
('ACCESS_DASHBOARD');

INSERT INTO usuarios (username, password, mail, session_active, status, persona_id) VALUES
('juanp', '$2b$10$hashsimulado1', 'juan@example.com', true, 'AC', 1),
('mariag', '$2b$10$hashsimulado2', 'maria@example.com', false, 'AC', 2),
('carlosr', '$2b$10$hashsimulado3', 'carlos@example.com', false, 'AC', 3),
('anat', '$2b$10$hashsimulado4', 'ana@example.com', true, 'AC', 4),
('luism', '$2b$10$hashsimulado5', 'luis@example.com', false, 'IN', 5);


INSERT INTO sessions (fecha_ingreso, fecha_cierre, usuario_id) VALUES
('2026-02-01', '2026-02-01', 1),
('2026-02-05', NULL, 1),
('2026-02-10', '2026-02-10', 2),
('2026-02-15', NULL, 4);

-- =========================
-- ASIGNACIÓN ROLES A USUARIOS
-- =========================
INSERT INTO rol_usuarios (rol_id, usuario_id) VALUES
(1, 1), -- Juan es ADMIN
(3, 2), -- Maria es USER
(2, 3), -- Carlos es MODERATOR
(3, 4), -- Ana es USER
(3, 5); -- Luis es USER

-- =========================
-- ASIGNACIÓN OPCIONES A ROLES
-- =========================

-- ADMIN tiene todas
INSERT INTO rol_rolopciones (rol_id, opcion_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6);

-- MODERATOR tiene algunas
INSERT INTO rol_rolopciones (rol_id, opcion_id) VALUES
(2, 3),
(2, 4),
(2, 6);

-- USER tiene básicas
INSERT INTO rol_rolopciones (rol_id, opcion_id) VALUES
(3, 5),
(3, 6);
-- ============================================================
-- Gestión Inteligente CESFAM — CESFAM Profesor Eugenio Cienfuegos
-- Esquema de base de datos (PostgreSQL)
--
-- Decisiones de diseño:
--   - Registros a nivel de atención individual (no agregados).
--   - Sin diferenciación por box/unidad (alcance acotado).
--   - Cobertura: últimos 6 meses de datos simulados.
--   - Una sola tabla de hechos ("atenciones") cubre los 5 indicadores:
--       tasa de inasistencia, cantidad de atenciones,
--       tiempo promedio de espera, horas agendadas/utilizadas,
--       demanda por período.
-- ============================================================

CREATE TABLE atenciones (
    id                      SERIAL PRIMARY KEY,
    fecha                   DATE NOT NULL,
    hora_agendada           TIME NOT NULL,
    tipo_atencion           VARCHAR(50) NOT NULL,
        -- Valores esperados: 'Medicina General', 'Control Cronico',
        -- 'Control de Salud', 'Enfermeria', 'Odontologia'
    asistio                 BOOLEAN NOT NULL,
    tiempo_espera_minutos   INTEGER,
        -- NULL si asistio = FALSE. Si asistio = TRUE, valor entre 0 y ~90.
    creado_en               TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_tiempo_espera_coherente CHECK (
        (asistio = TRUE  AND tiempo_espera_minutos IS NOT NULL) OR
        (asistio = FALSE AND tiempo_espera_minutos IS NULL)
    )
);

-- Acelera los filtros por rango de fechas (desde/hasta) usados en toda la API
CREATE INDEX idx_atenciones_fecha ON atenciones (fecha);

CREATE TABLE usuarios (
    id              SERIAL PRIMARY KEY,
    nombre          VARCHAR(100) NOT NULL,
    email           VARCHAR(150) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    rol             VARCHAR(20) NOT NULL DEFAULT 'consulta',
    creado_en       TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_rol_valido CHECK (rol IN ('consulta', 'admin'))
);

-- ============================================================
-- Equivalente SQLite (si prefieren no instalar PostgreSQL local):
--
-- CREATE TABLE atenciones (
--     id                    INTEGER PRIMARY KEY AUTOINCREMENT,
--     fecha                 TEXT NOT NULL,          -- 'YYYY-MM-DD'
--     hora_agendada         TEXT NOT NULL,          -- 'HH:MM'
--     tipo_atencion         TEXT NOT NULL,
--     asistio               INTEGER NOT NULL,       -- 0 o 1
--     tiempo_espera_minutos INTEGER,
--     creado_en             TEXT DEFAULT (datetime('now'))
-- );
--
-- CREATE TABLE usuarios (
--     id              INTEGER PRIMARY KEY AUTOINCREMENT,
--     nombre          TEXT NOT NULL,
--     email           TEXT UNIQUE NOT NULL,
--     password_hash   TEXT NOT NULL,
--     rol             TEXT NOT NULL DEFAULT 'consulta',
--     creado_en       TEXT DEFAULT (datetime('now'))
-- );
-- ============================================================

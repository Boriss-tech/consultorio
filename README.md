# Dashboard CESFAM — Frontend

Prototipo de interfaz para "Gestión Inteligente CESFAM" (CESFAM Profesor
Eugenio Cienfuegos). React + Vite + Tailwind CSS v4 + Recharts, con login
y dos niveles de acceso.

## Cómo correrlo

```bash
cp .env.example .env
npm install
npm run dev
```

Abre `http://localhost:5173`. Por ahora el Dashboard usa datos de prueba
(`src/api/mockData.js`) — no necesita el backend corriendo.

## Cuentas de prueba (login de prototipo, sin backend aún)

Las credenciales de las cuentas demo NO están hardcodeadas en el código:
se leen desde tu archivo `.env` local (que no se sube al repositorio, ver
`.gitignore`). Los valores de ejemplo están en `.env.example`:

| Variable | Valor de ejemplo | Rol | Acceso |
|---|---|---|---|
| `VITE_DEMO_ADMIN_USER` / `VITE_DEMO_ADMIN_PASS` | `admin` / `admin` | Administrador | Dashboard + Administración (RF10/RF11) |
| `VITE_DEMO_CONSULTA_USER` / `VITE_DEMO_CONSULTA_PASS` | `usuario` / `clave123` | Consulta | Solo Dashboard |

La lógica está en `src/auth/AuthContext.jsx`. Cuando exista el backend
(Sprint 1/3 de la hoja de ruta), este archivo se reemplaza por una llamada
real a `POST /api/auth/login`.

## Estructura

```
docs/
  arquitectura-cesfam.drawio  # diagrama de arquitectura (abrir en draw.io / diagrams.net)
  schema.sql                  # modelo de datos (PostgreSQL + variante SQLite comentada)
src/
  auth/
    AuthContext.jsx  # sesión + login/logout (hoy: hardcodeado, mañana: API real)
  api/
    client.js        # capa de acceso a datos (hoy: mock, mañana: axios real)
    mockData.js       # datos de prueba con la forma exacta del contrato de API
  components/
    Layout.jsx         # header, navegación por rol, cerrar sesión
    KpiCard.jsx
    FiltroPeriodo.jsx
    GraficoTendencia.jsx     # gráfico de una sola serie (área)
    GraficoComparativo.jsx   # gráfico de dos series (agendadas vs. utilizadas)
    TablaDetalle.jsx
  pages/
    Login.jsx
    Dashboard.jsx
    Administracion.jsx  # RF10 (usuarios) + RF11 (carga de datos), vista de interfaz
```

## Diseño y accesibilidad

La dirección visual y las reglas de UX de este proyecto se apoyaron en la
skill `ui-ux-pro-max` (github.com/nextlevelbuilder/ui-ux-pro-max-skill),
consultada para: paleta de color para producto tipo "Healthcare App",
tipografía recomendada (Figtree/Noto Sans), y checklist de accesibilidad
para formularios en React (labels asociados, resumen de error enfocable,
manejo de foco, envío con feedback de carga). El color de marca (teal) se
mantuvo como el ya establecido en el informe y los diagramas del proyecto,
para dar continuidad visual — la skill informó la *estructura* de tokens
y las reglas de accesibilidad, no reemplazó la identidad ya definida.

Checklist aplicado:
- Contraste de texto ≥ 4.5:1 en modo claro.
- Estados de foco visibles (`focus-visible`) en todos los elementos interactivos.
- `cursor-pointer` y transiciones de hover (150–300ms) en botones y controles.
- `prefers-reduced-motion` respetado globalmente.
- Formulario de login: labels asociados, envío con `onSubmit` + `preventDefault`,
  resumen de error con `role="alert"` y foco automático tras un intento fallido.
- Sin emojis como íconos.

## Conectar con el backend real (Sprint 3 de la hoja de ruta)

En `src/api/client.js`, cada función tiene comentada la llamada real con
axios justo encima del mock. En `src/auth/AuthContext.jsx`, la función
`login` se reemplaza por una llamada a `POST /api/auth/login` que devuelva
el rol real del usuario. Ningún componente debería cambiar.

# PruebaViamatica

Este repositorio contiene un proyecto de ejemplo con un *backend* en Node/Express y *frontend* en Next.js. Está desarrollado en TypeScript y pensado para ejecutarse localmente o dentro de contenedores Docker en modo desarrollo.

---

## Tecnologías y versiones principales

- **Node.js**: v20 (se recomienda usar 20.x para compatibilidad con dependencias)
- **TypeScript**: ^5.x en ambos paquetes
- **Backend**
  - Express 5.2
  - bcrypt 6.x
  - jsonwebtoken 9.x
  - pg (PostgreSQL) 8.x
  - tsx para ejecución en entorno de desarrollo
- **Frontend**
  - Next.js 16.1
  - React 19.2
  - Tailwind CSS 4.x
  - axios 1.x
- **Base de datos**: PostgreSQL (cualquier versión moderna 14+ debería funcionar)

---

## Estructura

- `/backend`: código del servidor
- `/frontend`: aplicación Next.js
- `/init_db`: scripts SQL para crear tablas y datos iniciales
- `docker-compose.yml`: orquestación de servicios (backend, frontend, base de datos)

---

## Levantamiento en desarrollo

### Requisitos previos

1. Tener instalado Node.js 20.
2. Tener una instancia de PostgreSQL accesible (local o contenedor).
3. Crear un archivo `.env` en `/backend` con variables como:

   ```env
   PGHOST=localhost
   PGPORT=5432
   PGUSER=tu_usuario
   PGPASSWORD=tu_pass
   PGDATABASE=pruebaviamatica
   JWT_SECRET=algosecreto
   ```

### Con Docker Compose

```bash
# desde la raíz del repositorio
docker-compose up --build
```

Esto arrancará tres servicios: la base de datos (postgres), el backend y el frontend.

- El backend quedará escuchando en `http://localhost:3001` (por defecto).
- El frontend se puede abrir en `http://localhost:3000`.

### Sin Docker

1. Iniciar la base de datos manualmente y ejecutar los scripts `init_db/1.tables.sql` etc.
2. En otra terminal arranca el backend:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. En otra terminal inicia el frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## Uso

- Regístrate como usuario/persona usando el formulario de la aplicación.
- Inicia sesión en `/home`.
- El sistema ofrece módulos de administración, dashboard, etc. basados en el menú que provee el servidor.

---

## DockerFiles de desarrollo

- `backend/Dockerfile` y `frontend/Dockerfile` son imágenes ligeras que instalan dependencias y lanzan `npm run dev`.
- Puedes personalizarlos para montar volúmenes y habilitar hot‑reload.

---

¡Listo para desarrollar! Si tienes dudas revisa los scripts en `init_db` y consulta el código fuente.

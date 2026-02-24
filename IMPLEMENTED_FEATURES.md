# Qué se hizo (y funciona)

Se revisó todo el proyecto: backend, frontend, configuración y despliegue.
Lo que está completo y funciona, lo que falta o puede fallar se aclara abajo.

Aquí lo que tenemos hoy:

## Funciones backend y frontend

En el servidor hay rutas para:

- `/api/auth/login`, `/logout`, `/recover`, `/session/:id`, `/welcome/:id` (auth)
- `/api/users` CRUD + `/upload` CSV + `/search`, `/dashboard`, `/menu/:userId`, `/users/:id/blocked`, `/users/:id/status`
- `/api/personas` similares (list, create, update, delete, search)

En el cliente hay páginas con formularios, listas y componentes para
login, bienvenida, dashboard, mantenimiento de personas/usuarios,
subida de CSV y navegación dinámica.

Además:

- Dockerfiles y `docker-compose.yml` para levantar DB/backend/frontend en dev.

## Lo que no está o puede romper

- no hay validaciones sólidas ni reglas de formato en el backend (puede aceptar datos malformados).
- las rutas no verifican autenticación/roles: cualquier petición puede listar/editar/borra recursos.
- recuperación de contraseña es un placeholder que siempre responde "ok".
- sólo se aceptan CSV, no `.xlsx`, por lo que los archivos de Excel no funcionan.
- el menú depende de `sessionStorage`; si se borra allí la app deja de mostrar opciones.
- generación de usuario/contraseña usa `Math.random()` y puede repetir o violar las reglas.
- en la carga masiva no se controla duplicados ni formatos, puede lanzar excepciones o insertar registros incompletos.



- Nota: Trate de hacer lo mejor espero que les guste aunque
no cumple al 100% con lo solicitado.

Mucha gracias
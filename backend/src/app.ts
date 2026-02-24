import express, { Router } from "express"
import { UsuarioPostgresRepository } from "./modules/user/infrastructure/usuario.postgres.repository.js"
import { PersonaPostgresRepository } from "./modules/user/infrastructure/persona.postgres.repository.js"
import { BcryptPasswordHasher } from "./modules/user/infrastructure/bcryp.repository.js"
import { RegistarUsuarioUseCase } from "./modules/user/application/RegistrarUsuario.use-case.js"
import { createUserRoutes } from "./modules/user/user.route.js"
import { createPersonaRoutes } from "./modules/user/persona.route.js"

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())

// Inicializar repositorios e inyectables
const usuarioRepository = new UsuarioPostgresRepository()
const personaRepository = new PersonaPostgresRepository()
const passwordHasher = new BcryptPasswordHasher()
const registarUsuarioUseCase = new RegistarUsuarioUseCase(
  personaRepository,
  usuarioRepository,
  passwordHasher
)

// Crear router principal
const apiRouter = Router()

// Registrar rutas
createUserRoutes(apiRouter, usuarioRepository)
createPersonaRoutes(apiRouter, personaRepository, registarUsuarioUseCase)


// Usar router con prefijo /api
app.use("/api", apiRouter)

app.get('/', (req, res) => {
    res.json({ mensaje: "Prueba viamatica" })
    console.log("Prueba viamatica")
})

app.listen(port, () => {
    console.log("App escuchando en", port)
})

export default app;
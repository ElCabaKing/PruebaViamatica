import express, { Router } from "express"
import cors from "cors"

import { UsuarioPostgresRepository } from "./modules/user/infrastructure/usuario.postgres.repository.js"
import { PersonaPostgresRepository } from "./modules/user/infrastructure/persona.postgres.repository.js"
import { BcryptPasswordHasher } from "./modules/user/infrastructure/bcryp.repository.js"
import { RegistarUsuarioUseCase } from "./modules/user/application/RegistrarUsuario.use-case.js"
import { ValidarUsuario } from "./modules/user/application/ValidarUsuario.use-case.js"
import { AuthPostgresRepository } from "./modules/user/infrastructure/auth.postgres.repository.js"
import { createUserRoutes } from "./modules/user/user.route.js"
import { createPersonaRoutes } from "./modules/user/persona.route.js"
import { createAuthRoutes } from "./modules/user/auth.route.js"
import { AuthController } from "./modules/user/auth.controller.js"

const app = express()
const port = process.env.PORT || 3000
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true 
}));

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
const authRepository = new AuthPostgresRepository()
const validarUsuarioUseCase = new ValidarUsuario(usuarioRepository, passwordHasher, authRepository)

// Crear router principal
const apiRouter = Router()

// Registrar rutas
createUserRoutes(apiRouter, usuarioRepository)
createPersonaRoutes(apiRouter, personaRepository, registarUsuarioUseCase)

const authController = new AuthController(validarUsuarioUseCase, authRepository, usuarioRepository)
createAuthRoutes(apiRouter, authController)


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
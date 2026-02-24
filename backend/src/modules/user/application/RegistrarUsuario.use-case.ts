import type { PersonaRepository } from "../domain/Persona/persona.repository.js";
import type { UserRepository } from "../domain/Usuario/user.repository.js";
import type { PasswordHasher } from "../domain/passwordHasher.repository.js";
import { generateBaseEmail } from "../domain/Usuario/email.generator.js";
import { generateUsername } from "../domain/Usuario/username.generator.js";
import { Persona } from "../domain/Persona/Persona.js";
import { Usuario } from "../domain/Usuario/Usuario.js";
export class RegistarUsuarioUseCase{
    constructor(
        private readonly personaRepository: PersonaRepository,
        private readonly usuarioRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher
    ){}

    async execute(persona:Persona){
       await this.personaRepository.registrarNuevaPersona(persona)

        const userEmail = generateBaseEmail(persona.nombre, persona.apellidos)
        const username = generateUsername(persona.nombre)
        const passwordHs = await this.passwordHasher.hashPassword(username)
        const usuario = Usuario.create(
            persona.id, 
            username, 
            passwordHs, //Username es el password (cambiar)
            userEmail,
            persona.id, 
            "activo"
        )

        await this.usuarioRepository.registrarNuevoUsuario(usuario)
        return 
    }
}
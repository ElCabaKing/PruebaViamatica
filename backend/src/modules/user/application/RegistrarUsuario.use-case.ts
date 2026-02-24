import type { PersonaRepository } from "../domain/Persona/persona.repository.js";
import type { UserRepository } from "../domain/Usuario/user.repository.js";
import type { PasswordHasher } from "../domain/passwordHasher.repository.js";
import { generateBaseEmail } from "../domain/Usuario/email.generator.js";
import { generateUsername } from "../domain/Usuario/username.generator.js";
import { generatePassword } from "../domain/Usuario/password.generator.js";
import { Persona } from "../domain/Persona/Persona.js";
import { Usuario } from "../domain/Usuario/Usuario.js";
export class RegistarUsuarioUseCase{
    constructor(
        private readonly personaRepository: PersonaRepository,
        private readonly usuarioRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher
    ){}

    async execute(persona:Persona){
       const personaId = await this.personaRepository.registrarNuevaPersona(persona)
        const userEmail = generateBaseEmail(persona.nombre, persona.apellidos)
        const username = generateUsername(persona.nombre)
        const password = generatePassword()
        console.log("Este es el password",password)
        const passwordHs = await this.passwordHasher.hashPassword(password)
        
        const usuario = Usuario.create(
            0,
            username, 
            passwordHs, 
            userEmail,
            personaId, 
            "activo"
        )

        await this.usuarioRepository.registrarNuevoUsuario(usuario)
        return 
    }
}

import type { PersonaRepository } from "../domain/user.repository.js";
import { Persona } from "../domain/Persona/Persona.js";
export class RegistrarNuevaPersona{
    constructor(
        private readonly usuarioRepository: PersonaRepository,
    ){}

    execute(persona:Persona){
        this.usuarioRepository.registrarNuevaPersona(persona)
    }
}
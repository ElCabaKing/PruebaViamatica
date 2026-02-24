import { Persona } from "./Persona/Persona.js";
import { Usuario } from "../domain/Usuario.js"

export interface UserDatasource {
    registrarNuevaPersona(persona: Persona): Promise<void>;
    registrarNuevoUsuario(usuario: Usuario): Promise<void>;
}
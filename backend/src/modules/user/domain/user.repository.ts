import { Persona } from "./Persona/Persona.js";

export interface PersonaRepository {
    registrarNuevaPersona(persona: Persona): Promise<void>;
    editarPersona(id: number): Promise<void>;
    eliminarPersona(id: number): Promise<void>;
    listarPersonas(): Promise<Persona[]>;
    buscarPersona(id: number): Promise<Persona>;

}
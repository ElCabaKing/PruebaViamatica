import {Persona} from "./Persona.js";

export interface PersonaDatasource {
    registrarNuevaPersona(persona: Persona): Promise<void>;
    editarPersona(persona: Persona): Promise<void>;
    eliminarPersona(id: number): Promise<void>;
    listarPersonas(): Promise<Persona[]>;
    buscarPersona(id: number): Promise<Persona>;
}
import {Persona} from "./Persona.js";

export interface PersonaDatasource {
    registrarNuevaPersona(persona: Persona): Promise<number>;
    editarPersona(persona: Persona): Promise<void>;
    eliminarPersona(id: number): Promise<void>;
    listarPersonas(): Promise<Persona[]>;
    buscarPersona(id: number): Promise<Persona>;
}
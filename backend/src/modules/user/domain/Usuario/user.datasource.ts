
import { Usuario } from "./Usuario.js"

export interface UserDatasource {
    registrarNuevoUsuario(usuario: Usuario): Promise<void>;
    editarUsuario(usuario: Usuario): Promise<void>;
    eliminarUsuario(id: number): Promise<void>;
    listarUsuarios(): Promise<Usuario[]>;
    buscarUsuario(criteria: string, value: string|number): Promise<Usuario>;
}